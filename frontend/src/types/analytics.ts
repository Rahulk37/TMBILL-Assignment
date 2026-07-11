export interface OrdersPerDay {
  date: string;
  totalOrders: number;
}

export interface RevenuePerStore {
  storeId: string;
  totalRevenue: number;
}

export interface TopSellingItem {
  itemId: string;
  totalQuantity: number;
}