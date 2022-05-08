import { AuthEntity, STATUS } from "../entities/auth.entity";

export interface Tokens {
  accessToken: string;
  refreshToken: string;
}

export default interface Repository {
  register(auth: AuthEntity): Promise<void>;
  login(email: string, password: string): Promise<Tokens>;
  getNewAccessToken(refreshToken: string): Promise<Tokens>;
}
