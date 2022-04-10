const amqp = require("amqplib");
const args = process.argv.slice(2);

(async () => {
  const connection = await amqp.connect("amqp://localhost");
  const channel = await connection.createChannel();

  const nameExchange = "exchange-direct";
  await channel.assertExchange(nameExchange, "direct", { durable: true });
  channel.prefetch(1);

  const assertQueue = await channel.assertQueue("", { exclusive: true });

  const routingKey = args.length > 0 ? args[0] : "error";
  await channel.bindQueue(assertQueue.queue, nameExchange, routingKey);

  channel.consume(
    assertQueue.queue,
    (msg) => {
      console.log(" [x] %s: '%s'", routingKey, msg.content.toString());
      setTimeout(() => {
        channel.ack(msg);
        console.log("confirmación de procesamiento");
      }, 5000);
    },
    { noAck: false }
  );
})();
