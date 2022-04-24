export type STATUS = "PENDING" | "COMPLETED" | "CANCELLED";

export class OrderBuilder {
  name: string;
  itemCount: number;
  transaction: string;
  status: STATUS;

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
  name: string;
  itemCount: number;
  transaction: string;
  status: STATUS;

  constructor(builder: OrderBuilder) {
    Object.assign(this, builder);
  }
}
