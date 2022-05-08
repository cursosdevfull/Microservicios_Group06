import { Channel } from "amqplib";
import BrokerBootstrap from "../../bootstrap/broker.bootstrap";
import { OrderEntity } from "../domain/entities/order.entity";
import RepositoryBroker from "../domain/repositories/order-broker.repository";
import OrderInfrastructure from "./order.infrastructure";

export default class BrokerInfrastructure implements RepositoryBroker {
  constructor(private orderInfrastructure: OrderInfrastructure) {}

  async send(message: any): Promise<void> {
    const channel = BrokerBootstrap.getChannel();
    const queueName = "ORDER_CREATE_EVENT";
    await channel.assertQueue(queueName, { durable: true });
    await channel.sendToQueue(queueName, Buffer.from(JSON.stringify(message)));
  }

  async receive(): Promise<void> {
    const channel = BrokerBootstrap.getChannel();
    const orderConfirmed = this.receiveMessageCustom(
      channel,
      this.consumerOrderConfirmed.bind(this),
      "ORDER_CONFIRMED_EXCHANGE",
      "fanout",
      ""
    );
    const failedError = this.receiveMessageCustom(
      channel,
      this.consumerFailedError.bind(this),
      "FAILED_ERROR_EXCHANGE",
      "topic",
      "*.order_cancelled.error"
    );

    await Promise.all([orderConfirmed, failedError]);
  }

  async receiveMessageCustom(
    channel: Channel,
    cb: (message: any) => void,
    exchangeName: string,
    kindExchange: string,
    routingKey: string
  ) {
    await channel.assertExchange(exchangeName, kindExchange, { durable: true });

    const assertQueue = await channel.assertQueue("", { exclusive: true });
    channel.bindQueue(assertQueue.queue, exchangeName, routingKey);

    channel.consume(assertQueue.queue, (message: any) => cb(message), {
      noAck: false,
    });
  }

  async consumerOrderConfirmed(message: any) {
    const content: Partial<OrderEntity> = JSON.parse(
      message.content.toString()
    );
    content.status = "COMPLETED";

    await this.orderInfrastructure.update(content.transaction, content.status);

    this.confirmMessageBroker(message);
  }

  async consumerFailedError(message: any) {
    console.log(message.content.toString());
    const content: Partial<OrderEntity> = JSON.parse(
      message.content.toString()
    );
    content.status = "CANCELLED";

    await this.orderInfrastructure.update(content.transaction, content.status);

    this.confirmMessageBroker(message);
  }

  confirmMessageBroker(message: any) {
    const channel = BrokerBootstrap.getChannel();
    channel.ack(message);
  }
}
