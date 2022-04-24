import express, { Application, Request, Response } from "express";
import Router from "./module/interfaces/http/order.route";
class App {
  expressApp: Application;

  constructor() {
    this.expressApp = express();
    this.middlewares();
    this.mountRoutes();
  }

  middlewares() {
    this.expressApp.use(express.json());
  }

  mountRoutes() {
    this.expressApp.use("/order", Router);

    this.expressApp.get("/", (req: Request, res: Response) => {
      res.send("Hello World!");
    });
  }
}

export default new App().expressApp;
