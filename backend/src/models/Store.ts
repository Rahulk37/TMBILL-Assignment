const mongoose = require("mongoose");

const StoreSchema = new mongoose.Schema(
  {
    store_id: {
      type: String,
      unique: true,
      required: true,
      index: true,
    },

    name: {
      type: String,
      required: true,
      trim: true,
    },

    address: {
      type: String,
      default: "",
    },

    deleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

module.exports = mongoose.model("Store", StoreSchema);

export {};
