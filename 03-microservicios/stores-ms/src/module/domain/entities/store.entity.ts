export type STATUS = "PENDING" | "COMPLETED" | "CANCELLED";

export class StoreBuilder {
  userId: string;
  productId: string;
  name: string;
  itemCount: number;
  transaction: string;
  status: STATUS;

  addUserId(userId: string): StoreBuilder {
    this.userId = userId;
    return this;
  }

  addProductId(productId: string): StoreBuilder {
    this.productId = productId;
    return this;
  }

  addName(name: string): StoreBuilder {
    this.name = name;
    return this;
  }

  addItemCount(itemCount: number): StoreBuilder {
    this.itemCount = itemCount;
    return this;
  }

  addTransaction(transaction: string): StoreBuilder {
    this.transaction = transaction;
    return this;
  }

  addStatus(status: STATUS): StoreBuilder {
    this.status = status;
    return this;
  }

  build(): StoreEntity {
    return new StoreEntity(this);
  }
}

export class StoreEntity {
  userId: string;
  productId: string;
  name: string;
  itemCount: number;
  transaction: string;
  status: STATUS;

  constructor(builder: StoreBuilder) {
    Object.assign(this, builder);
  }
}
