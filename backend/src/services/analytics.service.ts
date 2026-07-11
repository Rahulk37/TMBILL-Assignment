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
      $project: {
        _id: 0,
        date: "$_id",
        totalOrders: 1,
      },
    },
    {
      $sort: {
        date: 1,
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
      $project: {
        _id: 0,
        storeId: "$_id",
        totalRevenue: 1,
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
      $project: {
        _id: 0,
        itemId: "$_id",
        totalQuantity: 1,
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

export {};