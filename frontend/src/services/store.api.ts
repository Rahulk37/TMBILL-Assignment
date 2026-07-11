import { CreateStorePayload, StoresResponse, UpdateStorePayload } from "@/types/store";
import api from "./api";


// Create Store
export const createStore = async (
  data: CreateStorePayload
) => {
  console.log("CreateStorePayload",data)
  const response = await api.post("/stores", data);

  return response.data;
};

// Get All Stores
export const getStores = async ({
  page,
  limit,
}: {
  page: number;
  limit: number;
}): Promise<StoresResponse> => {
  const response = await api.get("/stores", {
    params: {
      page,
      limit,
    },
  });

  return response.data;
};

// Get Single Store
export const getStoreById = async (
  store_id: string
) => {
  const response = await api.get(
    `/stores/${store_id}`
  );

  return response.data;
};

// Update Store
export const updateStore = async ({
  store_id,
  data,
}: {
  store_id: string;
  data: UpdateStorePayload;
}) => {
  const response = await api.patch(
    `/stores/${store_id}`,
    data
  );

  return response.data;
};

// Delete Store
export const deleteStore = async (
  store_id: string
) => {
  const response = await api.patch(
    `/stores/${store_id}/delete`
  );

  return response.data;
};