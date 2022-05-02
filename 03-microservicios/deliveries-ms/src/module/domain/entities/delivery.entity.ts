export type STATUS = "PENDING" | "COMPLETED" | "CANCELLED";

export class DeliveryBuilder {
  userId: string;
  productId: string;
  name: string;
  itemCount: number;
  transaction: string;
  status: STATUS;

  addUserId(userId: string): DeliveryBuilder {
    this.userId = userId;
    return this;
  }

  addProductId(productId: string): DeliveryBuilder {
    this.productId = productId;
    return this;
  }

  addName(name: string): DeliveryBuilder {
    this.name = name;
    return this;
  }

  addItemCount(itemCount: number): DeliveryBuilder {
    this.itemCount = itemCount;
    return this;
  }

  addTransaction(transaction: string): DeliveryBuilder {
    this.transaction = transaction;
    return this;
  }

  addStatus(status: STATUS): DeliveryBuilder {
    this.status = status;
    return this;
  }

  build(): DeliveryEntity {
    return new DeliveryEntity(this);
  }
}

export class DeliveryEntity {
  userId: string;
  productId: string;
  name: string;
  itemCount: number;
  transaction: string;
  status: STATUS;

  constructor(builder: DeliveryBuilder) {
    Object.assign(this, builder);
  }
}
