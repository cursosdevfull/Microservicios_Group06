const amqp = require("amqplib");

(async () => {
  const connection = await amqp.connect("amqp://localhost");
  const channel = await connection.createChannel();

  const nameExchange = "pubsub";
  await channel.assertExchange(nameExchange, "fanout", { durable: true });

  const assertQueue = await channel.assertQueue("", { exclusive: true });
  await channel.bindQueue(assertQueue.queue, nameExchange, "");

  channel.consume(
    assertQueue.queue,
    (msg) => {
      console.log(" [x] Received %s", msg.content.toString());
    },
    {
      noAck: true,
    }
  );
})();
