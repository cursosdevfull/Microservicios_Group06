import { DeliveryEntity, STATUS } from "../domain/entities/delivery.entity";
import RepositoryBroker from "../domain/repositories/delivery-broker.repository";
import Repository from "../domain/repositories/delivery.repository";

export default class DeliveryApplication {
  private repositoryDelivery: Repository;
  private repositoryBroker: RepositoryBroker;

  constructor(repository: Repository, repositoryBroker: RepositoryBroker) {
    this.repositoryDelivery = repository;
    this.repositoryBroker = repositoryBroker;
  }

  async create(delivery: DeliveryEntity): Promise<DeliveryEntity> {
    const result = await this.repositoryDelivery.insert(delivery);
    this.repositoryBroker.send({
      type: "BILLED_ORDER_EVENT",
      data: result,
    });

    return result;
  }

  async update(transaction: string, status: STATUS): Promise<string> {
    return this.repositoryDelivery.update(transaction, status);
  }

  async receiveMessage(): Promise<void> {
    await this.repositoryBroker.receive();
  }
}
