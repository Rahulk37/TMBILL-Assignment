import api from "./api";

import {
  CreateOrderPayload,
  UpdateOrderPayload,
  Order,
  OrdersResponse,
  OrderStatus,
} from "@/types/order";

// Create Order
export const createOrder = async (
  data: CreateOrderPayload
) => {
  const response = await api.post("/orders", data);
  return response.data;
};

// Get Orders
export const getOrders = async ({
  store_id,
  page,
  limit,
}: {
  store_id: string;
  page: number;
  limit: number;
}): Promise<OrdersResponse> => {
  const response = await api.get("/orders", {
    params: {
      store_id,
      page,
      limit,
    },
  });
console.log("getOrders",response)
  return response.data;
};

// Get Single Order
export const getOrderById = async ({
  store_id,
  order_id,
}: {
  store_id: string;
  order_id: string;
}): Promise<{
  success: boolean;
  data: Order;
}> => {
  const response = await api.get(
    `/orders/${store_id}/${order_id}`
  );

  return response.data;
};

// Update Complete Order
export const updateOrder = async ({
  store_id,
  order_id,
  data,
}: {
  store_id: string;
  order_id: string;
  data: UpdateOrderPayload;
}) => {
  const response = await api.patch(
    `/orders/${store_id}/${order_id}`,
    data
  );

  return response.data;
};

// Update Status
export const updateOrderStatus = async ({
  store_id,
  order_id,
  status,
}: {
  store_id: string;
  order_id: string;
  status: OrderStatus;
}) => {
  const response = await api.patch(
    `/orders/${store_id}/${order_id}/status`,
    {
      status,
    }
  );

  return response.data;
};

// Delete Order
export const deleteOrder = async ({
  store_id,
  order_id,
}: {
  store_id: string;
  order_id: string;
}) => {
  const response = await api.patch(
    `/orders/${store_id}/${order_id}/delete`
  );

  return response.data;
};