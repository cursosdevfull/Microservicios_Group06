import OrderApplication from '../module/application/order.application';
export default class TaskBootstrap {
    constructor(private orderApplication: OrderApplication) {}

    async listenMessage() {
        await this.orderApplication.receiveMessage();
    }
}