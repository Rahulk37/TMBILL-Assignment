const Order = require("../models/Order");
const Store = require("../models/Store");
const { getIO } = require("../config/socket");

interface GetOrdersParams {
  store_id?: string;
  page?: number;
  limit?: number;
}

const generateOrderId = async (store_id: string) => {
  let orderId = "";
  let exists = true;

  while (exists) {
    orderId = Math.floor(100000 + Math.random() * 900000).toString();

    exists = await Order.exists({
      store_id,
      order_id: orderId,
      deleted: false,
    });
  }

  return orderId;
};

const createOrder = async (orderData: any) => {

  const store = await Store.findOne({
    store_id: orderData.store_id,
    deleted: false,
  });

  if (!store) {
    throw new Error("Store not found");
  }

  if (orderData.order_id) {
    const existingOrder = await Order.findOne({
      store_id: orderData.store_id,
      order_id: orderData.order_id,
      deleted: false,
    });

    if (existingOrder) {
      throw new Error("Order ID already exists for this store");
    }
  } else {

    orderData.order_id = await generateOrderId(orderData.store_id);
  }

  orderData.total_items = orderData.items.length;

  const order = await Order.create(orderData);

 console.log("Emitting order-created", order.store_id);

getIO().to(order.store_id).emit("order-created", order);

  return order;
};

const getOrders = async ({
  store_id,
  page = 1,
  limit = 10,
}: GetOrdersParams) => {
  const filter: any = {
    deleted: false,
  };

  if (store_id) {
    filter.store_id = store_id;
  }

  const skip = (page - 1) * limit;

  const [orders, totalRecords] = await Promise.all([
    Order.aggregate([
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

          store_name: "$store.name",
          store_address: "$store.address",
        },
      },
      {
        $sort: {
          created_at: -1,
        },
      },
      {
        $skip: skip,
      },
      {
        $limit: limit,
      },
    ]),

    Order.countDocuments(filter),
  ]);

  return {
    orders,
    pagination: {
      totalRecords,
      totalPages: Math.ceil(totalRecords / limit),
      currentPage: page,
      limit,
    },
  };
};

const getOrderById = async (store_id: string, order_id: string) => {
  return await Order.findOne({
    store_id,
    order_id,
    deleted: false,
  });
};

const updateOrderStatus = async (
  store_id: string,
  order_id: string,
  status: "PLACED" | "PREPARING" | "COMPLETED",
) => {
  const order = await Order.findOneAndUpdate(
    {
      store_id,
      order_id,
      deleted: false,
    },
    {
      status,
    },
    {
      new: true,
      runValidators: true,
    },
  );

  if (order) {
    getIO().to(store_id).emit("order-status-updated", order);
  }

  return order;
};

const deleteOrder = async (store_id: string, order_id: string) => {
  const order = await Order.findOneAndUpdate(
    {
      store_id,
      order_id,
      deleted: false,
    },
    {
      deleted: true,
    },
    {
      new: true,
    },
  );

  if (order) {
    getIO().to(store_id).emit("order-deleted", order);
  }

  return order;
};

module.exports = {
  createOrder,
  getOrders,
  getOrderById,
  updateOrderStatus,
  deleteOrder,
};

export {};
