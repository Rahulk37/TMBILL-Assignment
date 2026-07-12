const Store = require("../models/Store");

const seedStores = async () => {
  const count = await Store.countDocuments();

  if (count > 0) {
    console.log("Stores already exist. Skipping seed.");
    return;
  }

  await Store.insertMany([
    {
      store_id: "247543",
      name: "Store 1",
      address: "Pune",
    },
    {
      store_id: "982911",
      name: "Store 2",
      address: "Mumbai",
    },
  ]);

  console.log("Default stores created.");
};

module.exports = {
  seedStores,
};