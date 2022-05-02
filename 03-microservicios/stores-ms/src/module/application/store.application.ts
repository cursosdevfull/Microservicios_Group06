import { StoreEntity, STATUS } from "../domain/entities/store.entity";
import RepositoryBroker from "../domain/repositories/store-broker.repository";
import Repository from "../domain/repositories/store.repository";

export default class StoreApplication {
  private repositoryStore: Repository;
  private repositoryBroker: RepositoryBroker;

  constructor(repository: Repository, repositoryBroker: RepositoryBroker) {
    this.repositoryStore = repository;
    this.repositoryBroker = repositoryBroker;
  }

  async create(store: StoreEntity): Promise<StoreEntity> {
    const result = await this.repositoryStore.insert(store);
    this.repositoryBroker.send({
      type: "BILLED_ORDER_EVENT",
      data: result,
    });

    return result;
  }

  async update(transaction: string, status: STATUS): Promise<string> {
    return this.repositoryStore.update(transaction, status);
  }

  async receiveMessage(): Promise<void> {
    await this.repositoryBroker.receive();
  }
}
