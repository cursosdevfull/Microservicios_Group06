import { AuthEntity, STATUS } from "../domain/entities/auth.entity";
import Repository from "../domain/repositories/auth.repository";

export default class AuthApplication {
  private repositoryAuth: Repository;

  constructor(repository: Repository, repositoryBroker: RepositoryBroker) {
    this.repositoryAuth = repository;
    this.repositoryBroker = repositoryBroker;
  }

  async create(auth: AuthEntity): Promise<AuthEntity> {
    const result = await this.repositoryAuth.insert(auth);
    this.repositoryBroker.send({
      type: "AUTH_CREATED_EVENT",
      data: result,
    });

    return result;
  }

  async update(transaction: string, status: STATUS): Promise<string> {
    return this.repositoryAuth.update(transaction, status);
  }

  async receiveMessage(): Promise<void> {
    await this.repositoryBroker.receive();
  }
}
