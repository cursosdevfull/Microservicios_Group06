import BrokerBootstrap from "./bootstrap/broker.bootstrap";
import DatabaseBootstrap from "./bootstrap/database.bootstrap";
import ServerBootstrap from "./bootstrap/server.bootstrap";

const server = new ServerBootstrap();
const database = new DatabaseBootstrap();
const broker = new BrokerBootstrap();

async function start() {
  try {
    await server.initialize();
    await database.initialize();
    await broker.initialize();
  } catch (err) {
    console.error(err);
  }
}

start();
