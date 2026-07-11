export type OrderStatus =
  | "PLACED"
  | "PREPARING"
  | "COMPLETED";

export interface OrderItem {
  item_id: string;
  qty: number;
}

export interface CreateOrderPayload {
  store_id: string;
  total_amount: number;
  items: OrderItem[];
}

export interface Order {
  _id: string;
  store_id: string;
  items: OrderItem[];
  total_amount: number;
  status: OrderStatus;
  created_at: string;
}

export interface Pagination {
  totalRecords: number;
  totalPages: number;
  currentPage: number;
  limit: number;
}

export interface OrdersResponse {
  success: boolean;
  message: string;
  data: Order[];
  pagination: Pagination;
}