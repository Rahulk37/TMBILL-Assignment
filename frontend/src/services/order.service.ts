import api from "./api";

import {
  CreateOrderPayload,
  OrdersResponse,
  OrderStatus 
} from "@/types/order";


export const updateOrderStatus = async ({
  id,
  status,
}: {
  id: string;
  status: OrderStatus;
}) => {
  const response = await api.patch(
    `/orders/${id}/status`,
    {
      status,
    }
  );

  return response.data;
};
export const createOrder = async (
  data: CreateOrderPayload
) => {
  const response = await api.post(
    "/orders",
    data
  );

  return response.data;
};

export const getOrders = async ({
  store_id,
  page,
  limit,
}: {
  store_id: string;
  page: number;
  limit: number;
}): Promise<OrdersResponse> => {
  const response = await api.get(
    "/orders",
    {
      params: {
        store_id,
        page,
        limit,
      },
    }
  );

  return response.data;
};