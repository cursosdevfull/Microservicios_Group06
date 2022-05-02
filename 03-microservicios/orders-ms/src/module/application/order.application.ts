import { OrderEntity, STATUS } from "../domain/entities/order.entity";
import RepositoryBroker from "../domain/repositories/order-broker.repository";
import Repository from "../domain/repositories/order.repository";

export default class OrderApplication {
  private repositoryOrder: Repository;
  private repositoryBroker: RepositoryBroker;

  constructor(repository: Repository, repositoryBroker: RepositoryBroker) {
    this.repositoryOrder = repository;
    this.repositoryBroker = repositoryBroker;
  }

  async create(order: OrderEntity): Promise<OrderEntity> {
    const result = await this.repositoryOrder.insert(order);
    this.repositoryBroker.send({
      type: "ORDER_CREATED_EVENT",
      data: result,
    });

    return result;
  }

  async update(transaction: string, status: STATUS): Promise<string> {
    return this.repositoryOrder.update(transaction, status);
  }

  async receiveMessage(): Promise<void> {
    await this.repositoryBroker.receive();
  }
}
