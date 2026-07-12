export interface Store {
  _id: string;
  store_id: string;
  name: string;
  address: string;
  deleted: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateStorePayload {
  name: string;
  address?: string;
}

export interface UpdateStorePayload {
  name?: string;
  address?: string;
}

export interface Pagination {
  totalRecords: number;
  totalPages: number;
  currentPage: number;
  limit: number;
}

export interface StoresResponse {
  success: boolean;
  message: string;
  data: {
    stores: Store[];
    pagination: Pagination;
  };
}