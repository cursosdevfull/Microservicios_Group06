import PaymentApplication from "../module/application/payment.application";
export default class TaskBootstrap {
  constructor(private paymentApplication: PaymentApplication) {}

  async listenMessage() {
    await this.paymentApplication.receiveMessage();
  }
}
