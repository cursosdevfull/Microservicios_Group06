import express, { Request, Response } from "express";
import OrderApplication from "../../application/order.application";
import ValidatorHelper from "../../helpers/validator.helper";
import BrokerInfrastructure from "../../infrastructure/broker.infrastructure";
import OrderInfrastructure from "../../infrastructure/order.infrastructure";
import OrderController from "./order.controller";
import { ORDER_INSERT } from "./order.schema";

const infrastructure = new OrderInfrastructure();
const infrastructureBroker = new BrokerInfrastructure();
const application = new OrderApplication(infrastructure, infrastructureBroker);
const controller = new OrderController(application);

class RouterOrder {
  router: express.Router;

  constructor() {
    this.router = express.Router();
    this.mountRoutes();
  }

  mountRoutes() {
    this.router.post("/", ValidatorHelper.validate(ORDER_INSERT), controller.insert.bind(controller));
  }
}

export default new RouterOrder().router;
