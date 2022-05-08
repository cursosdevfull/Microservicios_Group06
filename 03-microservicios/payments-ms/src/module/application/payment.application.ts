import { PaymentEntity, STATUS } from "../domain/entities/payment.entity";
import RepositoryBroker from "../domain/repositories/payment-broker.repository";
import Repository from "../domain/repositories/payment.repository";

export default class PaymentApplication {
  private repositoryPayment: Repository;
  private repositoryBroker: RepositoryBroker;

  constructor(repository: Repository, repositoryBroker: RepositoryBroker) {
    this.repositoryPayment = repository;
    this.repositoryBroker = repositoryBroker;
  }

  /*  async create(payment: PaymentEntity): Promise<PaymentEntity> {
    const result = await this.repositoryPayment.insert(payment);
    this.repositoryBroker.send({
      type: "BILLED_ORDER_EVENT",
      data: result,
    });

    return result;
  } */

  async update(transaction: string, status: STATUS): Promise<string> {
    return this.repositoryPayment.update(transaction, status);
  }

  async receiveMessage(): Promise<void> {
    await this.repositoryBroker.receive();
  }
}
