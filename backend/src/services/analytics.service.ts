const Order = require("../models/Order");

const getOrdersPerDay = async () => {
  return await Order.aggregate([
    {
      $group: {
        _id: {
          $dateToString: {
            format: "%Y-%m-%d",
            date: "$created_at",
          },
        },
        totalOrders: {
          $sum: 1,
        },
      },
    },
    {
      $sort: {
        _id: 1,
      },
    },
  ]);
};

const getRevenuePerStore = async () => {
  return await Order.aggregate([
    {
      $group: {
        _id: "$store_id",
        totalRevenue: {
          $sum: "$total_amount",
        },
      },
    },
    {
      $sort: {
        totalRevenue: -1,
      },
    },
  ]);
};

const getTopSellingItems = async () => {
  return await Order.aggregate([
    {
      $unwind: "$items",
    },
    {
      $group: {
        _id: "$items.item_id",
        totalQuantity: {
          $sum: "$items.qty",
        },
      },
    },
    {
      $sort: {
        totalQuantity: -1,
      },
    },
    {
      $limit: 5,
    },
  ]);
};

module.exports = {
  getOrdersPerDay,
  getRevenuePerStore,
  getTopSellingItems,
};