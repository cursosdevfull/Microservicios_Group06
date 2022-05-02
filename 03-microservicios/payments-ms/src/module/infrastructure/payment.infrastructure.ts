import { PaymentEntity, STATUS } from "../domain/entities/payment.entity";
import Repository from "../domain/repositories/payment.repository";
import Model from "./models/payment.model";

export default class PaymentInfrastructure implements Repository {
  async insert(payment: PaymentEntity): Promise<PaymentEntity> {
    await Model.create(payment);
    return payment;
  }

  async update(transaction: string, status: STATUS): Promise<string> {
    await Model.findOneAndUpdate({ transaction }, { status });

    return status;
  }
}
