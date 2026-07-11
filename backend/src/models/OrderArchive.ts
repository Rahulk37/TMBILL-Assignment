const mongoose = require("mongoose");

const OrderArchiveSchema = new mongoose.Schema(
  {
    store_id: {
      type: String,
      required: true,
      index: true,
    },

    items: [
      {
        item_id: {
          type: String,
          required: true,
        },

        qty: {
          type: Number,
          required: true,
        },
      },
    ],

    total_amount: {
      type: Number,
      required: true,
    },

    status: {
      type: String,
      enum: [
        "PLACED",
        "PREPARING",
        "COMPLETED",
      ],
    },

    created_at: {
      type: Date,
      required: true,
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "OrderArchive",
  OrderArchiveSchema
);