export type STATUS = "PENDING" | "COMPLETED" | "CANCELLED";

export class AuthBuilder {
  email: string;
  password: string;
  name: string;
  refreshToken: string;

  addEmail(email: string): AuthBuilder {
    this.email = email;
    return this;
  }

  addPassword(password: string): AuthBuilder {
    this.password = password;
    return this;
  }

  addName(name: string): AuthBuilder {
    this.name = name;
    return this;
  }

  addRefreshToken(refreshToken: string): AuthBuilder {
    this.refreshToken = refreshToken;
    return this;
  }

  build(): AuthEntity {
    return new AuthEntity(this);
  }
}

export class AuthEntity {
  email: string;
  password: string;
  name: string;
  refreshToken: string;

  constructor(builder: AuthBuilder) {
    Object.assign(this, builder);
  }
}
