const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
  {

    store_id: {
      type: String,
      required: true,
      index: true,
    },


    order_id: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },

    customer_name: {
      type: String,
      required: true,
      trim: true,
    },

    total_items: {
      type: Number,
      required: true,
      default: 0,
    },

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

    total_amount: {
      type: Number,
      required: true,
      min: 0,
    },

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
