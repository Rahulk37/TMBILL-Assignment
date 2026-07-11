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
  // Check store exists
  const store = await Store.findOne({
    store_id: orderData.store_id,
    deleted: false,
  });

  if (!store) {
    throw new Error("Store not found");
  }

  // If order_id is provided, verify uniqueness
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
    // Generate unique order_id for this store
    orderData.order_id = await generateOrderId(orderData.store_id);
  }

  // Calculate total unique items
  orderData.total_items = orderData.items.length;

  const order = await Order.create(orderData);

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
    Order.find(filter).sort({ created_at: -1 }).skip(skip).limit(limit),

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
