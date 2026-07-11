const Order = require("../models/Order");
const { getIO } = require("../config/socket");
interface GetOrdersParams {
  store_id?: string;
  page?: number;
  limit?: number;
}



const createOrder = async (orderData:any) => {
  const order = await Order.create(orderData);

  const io = getIO();

  io.to(order.store_id).emit("order-created", order);

  return order;
};
const getOrders = async ({
  store_id,
  page = 1,
  limit = 10,
}: GetOrdersParams) => {
  const filter: any = {};

  if (store_id) {
    filter.store_id = store_id;
  }

  const skip = (page - 1) * limit;

  const [orders, totalRecords] = await Promise.all([
    Order.find(filter)
      .sort({ created_at: -1 })
      .skip(skip)
      .limit(limit),

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

const updateOrderStatus = async (
  id: string,
  status: "PLACED" | "PREPARING" | "COMPLETED"
) => {
  const order = await Order.findByIdAndUpdate(
    id,
    { status },
    {
      new: true,
      runValidators: true,
    }
  );

  if (order) {
    const io = getIO();

    io.to(order.store_id).emit(
      "order-status-updated",
      order
    );
  }

  return order;
};

module.exports = {
  createOrder,
  getOrders,
  updateOrderStatus,
};export {};