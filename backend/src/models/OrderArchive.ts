const mongoose = require("mongoose");

const OrderArchiveSchema = new mongoose.Schema(
  {
    store_id: String,
    order_id: String,
    customer_name: String,
    total_items: Number,

    items: [
      {
        item_id: String,
        item_name: String,
        qty: Number,
      },
    ],

    total_amount: Number,
    status: String,

    created_at: Date,
    updated_at: Date,

    archived_at: {
      type: Date,
      default: Date.now,
    },
  },
  {
    versionKey: false,
  }
);

module.exports = mongoose.model("OrderArchive", OrderArchiveSchema);

export {};