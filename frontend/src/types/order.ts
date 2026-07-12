export type OrderStatus = "PLACED" | "PREPARING" | "COMPLETED";

export interface OrderItem {
  item_id: string;
  item_name: string;
  qty: number;
}

export interface Order {
  _id: string;
  order_id: string;
  store_id: string;
  store_name: string;
  store_address: string;

  customer_name: string;

  items: OrderItem[];
  total_items: number;
  total_amount: number;

  status: OrderStatus;

  created_at: string;
  updated_at: string;
}

export interface CreateOrderPayload {
  store_id: string;
  customer_name: string;
  total_amount: number;

  items: {
    item_id: string;
    qty: number;
  }[];

  status?: string;
}

export interface UpdateOrderPayload {
  customer_name?: string;
  total_amount?: number;
  status?: OrderStatus;
  items?: OrderItem[];
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
  data: {
    orders: Order[];
    pagination: Pagination;
  };
}

export interface ArchiveOrdersResponse {
  success: boolean;
  message: string;
  data: {
    archivedOrders: Order[];
    pagination: Pagination;
  };
}