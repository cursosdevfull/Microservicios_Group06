import { AuthEntity } from "../domain/entities/auth.entity";
import Repository, { Tokens } from "../domain/repositories/auth.repository";
import * as bcrypt from "bcryptjs";
import { AuthService } from "./auth.service";

const authService = new AuthService();

export default class AuthApplication {
  private repositoryAuth: Repository;

  constructor(repository: Repository) {
    this.repositoryAuth = repository;
  }

  async register(auth: AuthEntity): Promise<void> {
    auth.password = await bcrypt.hash(auth.password, 10);
    auth.refreshToken = authService.generateRefreshToken();
    return await this.repositoryAuth.insert(auth);
  }

  async login(email: string, password: string): Promise<Tokens> {
    const user = await this.repositoryAuth.getOne({ email });
    if (!user) {
      throw new Error("User not found");
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error("Password incorrect");
    }
    return {
      accessToken: authService.generateAccessToken(user.name, user._id),
      refreshToken: user.refreshToken,
    };
  }

  async getNewAccessToken(refreshToken: string): Promise<Tokens> {
    const user = await this.repositoryAuth.getOne({ refreshToken });
    if (!user) {
      throw new Error("User not found");
    }

    const newRefreshToken = authService.generateRefreshToken();
    await this.repositoryAuth.update(refreshToken, newRefreshToken);
    return {
      accessToken: authService.generateAccessToken(user.name, user._id),
      refreshToken: newRefreshToken,
    };
  }

  async validateAccessToken(accessToken: string): Promise<boolean> {
    try {
      const decoded = await authService.validateAccessToken(accessToken);
      return true;
    } catch (err) {
      return false;
    }
  }
}
