export type OrderStatus =
  | "PLACED"
  | "PREPARING"
  | "COMPLETED";

export interface OrderItem {
  item_id: string;
  qty: number;
}

export interface Order {
  store_id: string;
  order_id: string;
  customer_name: string;
  total_items: number;
  total_amount: number;
  status: OrderStatus;
  items: {
    item_id: string;
    qty: number;
  }[];
}

export interface CreateOrderPayload {
  store_id: string;
  order_id?: string;
  customer_name: string;
  total_amount: number;
  items: {
    item_id: string;
    qty: number;
  }[];
}

export interface UpdateOrderPayload {
  customer_name?: string;
  total_amount?: number;
  status?: OrderStatus;
  items?: {
    item_id: string;
    qty: number;
  }[];
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