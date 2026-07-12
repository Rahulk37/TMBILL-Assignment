const Order = require("../models/Order");
const OrderArchive = require("../models/OrderArchive");


interface GetOrdersParams {
  store_id?: string;
  page?: number;
  limit?: number;
}

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
const archiveOldOrders = async (days: number) => {
  const cutoffDate = new Date();

  cutoffDate.setDate(cutoffDate.getDate() - days);

  const oldOrders = await Order.find({
    deleted: false,
    created_at: {
      $lt: cutoffDate,
    },
  });

  if (oldOrders.length === 0) {
    return {
      archivedCount: 0,
      message: "No old orders found.",
    };
  }

  await OrderArchive.insertMany(
    oldOrders.map((order: any) => ({
      ...order.toObject(),
      archived_at: new Date(),
    })),
  );

  await Order.deleteMany({
    _id: {
      $in: oldOrders.map((order: any) => order._id),
    },
  });

  return {
    archivedCount: oldOrders.length,
    message: `${oldOrders.length} orders archived successfully.`,
  };
};

const getArchivedOrdersApi = async ({
  store_id,
  page = 1,
  limit = 10,
}: GetOrdersParams) => {
  const filter: any = {};

  if (store_id) {
    filter.store_id = store_id;
  }

  const skip = (page - 1) * limit;

  const [archivedOrders, totalRecords] = await Promise.all([
    OrderArchive.aggregate([
      {
        $match: filter,
      },
      {
        $lookup: {
          from: "stores",
          localField: "store_id",
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
          order_id: 1,
          store_id: 1,
          customer_name: 1,
          total_items: 1,
          total_amount: 1,
          status: 1,
          items: 1,
          created_at: 1,
          updated_at: 1,
          archived_at: 1,
          store_name: "$store.name",
          store_address: "$store.address",
        },
      },
      {
        $sort: {
          archived_at: -1,
        },
      },
      {
        $skip: skip,
      },
      {
        $limit: limit,
      },
    ]),

    OrderArchive.countDocuments(filter),
  ]);

  return {
    archivedOrders,
    pagination: {
      totalRecords,
      totalPages: Math.ceil(totalRecords / limit),
      currentPage: page,
      limit,
    },
  };
};
module.exports = {
  getOrdersPerDay,
  getRevenuePerStore,
  getTopSellingItems,
  archiveOldOrders,
  getArchivedOrdersApi,
};

export {};
