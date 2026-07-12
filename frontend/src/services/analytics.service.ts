import { OrdersResponse } from "@/types/order";
import api from "./api";

export const getOrdersPerDay = async () => {
  const response = await api.get(
    "/analytics/orders-per-day"
  );

  return response.data;
};

export const getRevenuePerStore = async () => {
  const response = await api.get(
    "/analytics/revenue-per-store"
  );

  return response.data;
};

export const getTopItems = async () => {
  const response = await api.get(
    "/analytics/top-items"
  );

  return response.data;
};


export const archiveOrders = async (days: number) => {
  return api.post("/analytics/archive-old-orders", {
    days,
  });
};


export const useArchiveOrdersApi = async ({
  store_id,
  page,
  limit,
}: {
  store_id: string;
  page: number;
  limit: number;
}): Promise<OrdersResponse> => {
  const response = await api.get("/analytics", {
    params: {
      store_id,
      page,
      limit,
    },
  });
  return response.data;
};
