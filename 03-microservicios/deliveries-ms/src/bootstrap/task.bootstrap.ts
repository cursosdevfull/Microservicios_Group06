import DeliveryApplication from "../module/application/delivery.application";
export default class TaskBootstrap {
  constructor(private deliveryApplication: DeliveryApplication) {}

  async listenMessage() {
    await this.deliveryApplication.receiveMessage();
  }
}
