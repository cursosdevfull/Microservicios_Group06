import StoreApplication from "../module/application/store.application";
export default class TaskBootstrap {
  constructor(private storeApplication: StoreApplication) {}

  async listenMessage() {
    await this.storeApplication.receiveMessage();
  }
}
