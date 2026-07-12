const Order = require("../models/Order");

const getOrdersPerDay = async () => {
  return await Order.aggregate([
    {
      $match: {
        deleted: false,
      },
    },
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
      $match: {
        deleted: false,
      },
    },
    {
      $group: {
        _id: "$store_id",
        totalRevenue: {
          $sum: "$total_amount",
        },
      },
    },
    {
      $lookup: {
        from: "stores",
        localField: "_id",
        foreignField: "store_id",
        as: "store",
      },
    },
    {
      $unwind: {
        path: "$store",
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $project: {
        _id: 0,
        storeId: "$_id",
        storeName: "$store.name",
        storeAddress: "$store.address",
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
      $match: {
        deleted: false,
      },
    },
    {
      $unwind: "$items",
    },
    {
      $group: {
        _id: "$items.item_id",
        itemName: {
          $first: "$items.item_name",
        },
        totalQuantity: {
          $sum: "$items.qty",
        },
      },
    },
    {
      $project: {
        _id: 0,
        itemId: "$_id",
        itemName: 1,
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