const amqp = require("amqplib");
const args = process.argv.slice(2);

(async () => {
  const connection = await amqp.connect("amqp://localhost");
  const channel = await connection.createChannel();

  const nameExchange = "exchange_topic";
  await channel.assertExchange(nameExchange, "topic", { durable: true });

  const assertQueue = await channel.assertQueue("", { exclusive: true });
  const routingKeys = args.length > 0 ? args : ["anonymous.info"];

  routingKeys.forEach((routingKey) => {
    channel.bindQueue(assertQueue.queue, nameExchange, routingKey);
  });

  channel.consume(
    assertQueue.queue,
    (msg) => {
      if (msg !== null) {
        console.log(
          ` [x] Received ${msg.fields.routingKey}: ${msg.content.toString()}`
        );
      }
    },
    { noAck: true }
  );
})();
