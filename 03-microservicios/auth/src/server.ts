import DatabaseBootstrap from "./bootstrap/database.bootstrap";
import ServerBootstrap from "./bootstrap/server.bootstrap";
import AuthApplication from "./module/application/auth.application";
import AuthInfrastructure from "./module/infrastructure/auth.infrastructure";

const server = new ServerBootstrap();
const database = new DatabaseBootstrap();
const authInfrastructure = new AuthInfrastructure();
const authApplication = new AuthApplication(authInfrastructure);

async function start() {
  try {
    await server.initialize();
    await database.initialize();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

start();
