const Order = require("../models/Order");
const OrderArchive = require("../models/OrderArchive");

const archiveOldOrders = async () => {
  const thirtyDaysAgo = new Date();

  thirtyDaysAgo.setDate(
    thirtyDaysAgo.getDate() - 30
  );

  const oldOrders = await Order.find({
    created_at: {
      $lt: thirtyDaysAgo,
    },
  });

  if (!oldOrders.length) {
    return {
      archivedCount: 0,
    };
  }

  await OrderArchive.insertMany(oldOrders);

  const orderIds = oldOrders.map((order: any) => order._id);
  await Order.deleteMany({
    _id: {
      $in: orderIds,
    },
  });

  return {
    archivedCount: oldOrders.length,
  };
};

module.exports = {
  archiveOldOrders,
};