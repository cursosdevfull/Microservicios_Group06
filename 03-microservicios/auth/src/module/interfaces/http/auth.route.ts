import express, { Request, Response } from "express";
import AuthApplication from "../../application/auth.application";
import ValidatorHelper from "../../helpers/validator.helper";
import AuthInfrastructure from "../../infrastructure/auth.infrastructure";
import AuthController from "./auth.controller";

const infrastructure = new AuthInfrastructure();
const application = new AuthApplication(infrastructure);
const controller = new AuthController(application);

class RouterOrder {
  router: express.Router;

  constructor() {
    this.router = express.Router();
    this.mountRoutes();
  }

  mountRoutes() {
    this.router.post("/register", controller.register);

    this.router.post("/login", controller.login);

    this.router.post("/get-new-access-token", controller.getNewAccessToken);

    this.router.post("/validate-access-token", controller.validateAccessToken);
  }
}

export default new RouterOrder().router;
