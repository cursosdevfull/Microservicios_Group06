export class EnvironmentsHelper {
  static get pathMSOrder(): string {
    return process.env.PATH_MS_ORDER || "http://localhost:19000";
  }

  static get pathMSAuth(): string {
    return process.env.PATH_MS_AUTH || "http://localhost:21000";
  }
}
