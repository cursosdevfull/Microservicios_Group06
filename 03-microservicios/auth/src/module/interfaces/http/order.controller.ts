import OrderApplication from "../../application/auth.application";
import { OrderBuilder, OrderEntity } from "../../domain/entities/auth.entity";
import { Request, Response } from "express";

export default class OrderController {
  constructor(private orderApplication: OrderApplication) {}

  async insert(req: Request, res: Response) {
    const { userId, productId, name, itemCount, transaction } = req.body;

    const entity: OrderEntity = new OrderBuilder()
      .addUserId(userId)
      .addProductId(productId)
      .addName(name)
      .addItemCount(itemCount)
      .addTransaction(transaction)
      .addStatus("PENDING")
      .build();

    const orderInserted = await this.orderApplication.create(entity);

    res.json(orderInserted);
  }
}
