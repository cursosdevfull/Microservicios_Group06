export class EnvironmentsHelper {
  static get pathMSOrder(): string {
    return process.env.PATH_MS_ORDER || "http://localhost:19000";
  }
}
