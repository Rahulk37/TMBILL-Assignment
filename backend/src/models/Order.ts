const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
  {
    // Store ID (e.g. 123456)
    store_id: {
      type: String,
      required: true,
      index: true,
    },

    // Random Order ID (e.g. 100001)
    order_id: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },

    // Customer Name
    customer_name: {
      type: String,
      required: true,
      trim: true,
    },

    // Total unique menu items
    total_items: {
      type: Number,
      required: true,
      default: 0,
    },

    // Ordered Items
    items: [
      {
        item_id: {
          type: String,
          required: true,
        },
        item_name: {
          type: String,
          required: true,
        },
        qty: {
          type: Number,
          required: true,
          min: 1,
        },
      },
    ],

    // Total Bill Amount
    total_amount: {
      type: Number,
      required: true,
      min: 0,
    },

    // Order Status
    status: {
      type: String,
      enum: ["PLACED", "PREPARING", "COMPLETED"],
      default: "PLACED",
    },

    deleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
    versionKey: false,
  },
);

module.exports = mongoose.model("Order", OrderSchema);

export {};
