import { AuthEntity } from "../domain/entities/auth.entity";
import Repository from "../domain/repositories/auth.repository";
import Model from "./models/auth.model";

export default class AuthInfrastructure implements Repository {
  async getOne(where: object): Promise<AuthEntity> {
    return await Model.findOne(where);
  }

  async insert(auth: AuthEntity): Promise<void> {
    await Model.create(auth);
  }

  async update(refreshToken: string, newRefreshToken: string) {
    await Model.updateOne({ refreshToken }, { refreshToken: newRefreshToken });
  }
}
