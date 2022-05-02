export type STATUS = "PENDING" | "COMPLETED" | "CANCELLED";

export class OrderBuilder {
  userId: string;
  productId: string;
  name: string;
  itemCount: number;
  transaction: string;
  status: STATUS;

  addUserId(userId: string): OrderBuilder {
    this.userId = userId;
    return this;
  }

  addProductId(productId: string): OrderBuilder {
    this.productId = productId;
    return this;
  }

  addName(name: string): OrderBuilder {
    this.name = name;
    return this;
  }

  addItemCount(itemCount: number): OrderBuilder {
    this.itemCount = itemCount;
    return this;
  }

  addTransaction(transaction: string): OrderBuilder {
    this.transaction = transaction;
    return this;
  }

  addStatus(status: STATUS): OrderBuilder {
    this.status = status;
    return this;
  }

  build(): OrderEntity {
    return new OrderEntity(this);
  }
}

export class OrderEntity {
  userId: string;
  productId: string;
  name: string;
  itemCount: number;
  transaction: string;
  status: STATUS;

  constructor(builder: OrderBuilder) {
    Object.assign(this, builder);
  }
}
