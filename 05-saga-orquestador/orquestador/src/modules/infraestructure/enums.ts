export enum TYPE_MESSAGE {
  ORDER_CREATED = "ORDER_CREATED",
  ORDER_BILLED = "ORDER_BILLED",
  ORDER_PREPARED = "ORDER_PREPARED",
  ORDER_DELIVERIED = "ORDER_DELIVERIED",
  PAYMENT_ERROR = "PAYMENT_ERROR",
  STORE_ERROR = "STORE_ERROR",
  DELIVERY_ERROR = "DELIVERY_ERROR",
  ERROR = "ERROR",
}

export enum QUEUE_NAME {
  ORCHESTATOR_EVENT = "ORCHESTATOR_EVENT",
  ORDER_CREATE_EVENT = "ORDER_CREATE_EVENT",
  BILLED_ORDER_EVENT = "BILLED_ORDER_EVENT",
  ORDER_PREPARE_EVENT = "ORDER_PREPARE_EVENT",
  ORDER_DELIVERIED_EVENT = "ORDER_DELIVERIED_EVENT",
}

export enum ROUTING_KEY_ERROR {
  PAYMENT = "payment.order_cancelled.error",
  STORE = "store.order_cancelled.error",
  DELIVERY = "delivery.order_cancelled.error",
}

export enum EXCHANGE_NAME {
  FAILED_ERROR_EXCHANGE = "FAILED_ERROR_EXCHANGE",
}

export enum TYPE_EXCHANGE {
  TOPIC = "topic",
}
