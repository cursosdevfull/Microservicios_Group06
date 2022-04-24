import BrokerBootstrap from "../../bootstrap/broker.bootstrap";
import RepositoryBroker from "../domain/repositories/order-broker.repository";

export default class BrokerInfrastructure implements RepositoryBroker {
  async send(message: any): Promise<void> {
    const channel = BrokerBootstrap.getChannel();
    const queueName = "ORDER_CREATE_EVENT";
    await channel.assertQueue(queueName, { durable: true });
    await channel.sendToQueue(queueName, Buffer.from(JSON.stringify(message)));
  }

  receive(): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
