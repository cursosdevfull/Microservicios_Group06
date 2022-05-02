export type STATUS = "PENDING" | "COMPLETED" | "CANCELLED";

export class PaymentBuilder {
  userId: string;
  productId: string;
  name: string;
  itemCount: number;
  transaction: string;
  status: STATUS;

  addUserId(userId: string): PaymentBuilder {
    this.userId = userId;
    return this;
  }

  addProductId(productId: string): PaymentBuilder {
    this.productId = productId;
    return this;
  }

  addName(name: string): PaymentBuilder {
    this.name = name;
    return this;
  }

  addItemCount(itemCount: number): PaymentBuilder {
    this.itemCount = itemCount;
    return this;
  }

  addTransaction(transaction: string): PaymentBuilder {
    this.transaction = transaction;
    return this;
  }

  addStatus(status: STATUS): PaymentBuilder {
    this.status = status;
    return this;
  }

  build(): PaymentEntity {
    return new PaymentEntity(this);
  }
}

export class PaymentEntity {
  userId: string;
  productId: string;
  name: string;
  itemCount: number;
  transaction: string;
  status: STATUS;

  constructor(builder: PaymentBuilder) {
    Object.assign(this, builder);
  }
}
