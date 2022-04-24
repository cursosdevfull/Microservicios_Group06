import mongoose from "mongoose";

class OrderModel {
  private orderSchema: mongoose.Schema;

  constructor() {
    this.orderSchema = new mongoose.Schema({
      name: {
        type: String,
        required: true,
        trim: true,
      },

      itemCount: {
        type: Number,
        required: true,
      },

      transaction: {
        type: String,
        required: true,
      },

      status: {
        type: String,
        required: true,
      },
    });
  }

  get model(): mongoose.Model<mongoose.Document> {
    return mongoose.model("Order", this.orderSchema);
  }
}

export default new OrderModel().model;
