import express, { Application, Request, Response } from "express";
import Router from "./module/interfaces/http/auth.route";
class App {
  expressApp: Application;

  constructor() {
    this.expressApp = express();
    this.middlewares();
    this.mountRoutes();
  }

  middlewares() {
    this.expressApp.use(express.json());
    this.expressApp.use(express.urlencoded({ extended: false }));
  }

  mountRoutes() {
    this.expressApp.use("/auth", Router);

    this.expressApp.get("/", (req: Request, res: Response) => {
      res.send("Hello World!");
    });
  }
}

export default new App().expressApp;
