const amqp = require("amqplib");
const args = process.argv.slice(2);

(async () => {
  const connection = await amqp.connect("amqp://localhost");
  const channel = await connection.createChannel();

  const nameExchange = "exchange-direct";
  await channel.assertExchange(nameExchange, "direct", { durable: true });

  const message = args.length > 0 ? args[0] : "message direct";
  const routingKey = args.length > 1 ? args[1] : "key-direct";

  channel.publish(nameExchange, routingKey, Buffer.from(message), {
    persistent: true,
  });

  setTimeout(() => {
    connection.close();
    process.exit(0);
  }, 100);
})();
