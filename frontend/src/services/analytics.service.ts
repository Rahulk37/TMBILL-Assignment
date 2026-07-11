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

export const archiveOrders = async () => {
  const response = await api.post(
    "/archive-old-orders"
  );

  return response.data;
};