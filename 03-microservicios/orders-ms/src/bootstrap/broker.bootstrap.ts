import amqp from "amqplib";
import { Bootstrap } from "./bootstrap";

let channel: amqp.Channel;

export default class BrokerBootstrap implements Bootstrap {
  async initialize(): Promise<boolean | Error> {
    return new Promise(async (resolve, reject) => {
      const host = process.env.RABBIT_HOST || "localhost:5672";

      try {
        const connection = await amqp.connect(`amqp://${host}`);
        channel = await connection.createChannel();
        console.log("Connected to RabbitMQ");
        resolve(true);
      } catch (error) {
        reject(error);
      }
    });
  }

  static getChannel() {
    return channel;
  }
}
