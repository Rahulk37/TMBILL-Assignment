import {
  createStore,
  getStores,
  getStoreById,
  updateStore,
  deleteStore,
} from "@/services/store.api";

import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

// Create
export const useCreateStore = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createStore,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["stores"],
      });
    },
  });
};

// Get All
export const useStores = (
  page: number,
  limit: number
) => {
  return useQuery({
    queryKey: ["stores", page, limit],
    queryFn: () =>
      getStores({
        page,
        limit,
      }),
  });
};

// Get By Id
export const useStore = (store_id: string) => {
  return useQuery({
    queryKey: ["store", store_id],
    queryFn: () => getStoreById(store_id),
    enabled: !!store_id,
  });
};

// Update
export const useUpdateStore = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateStore,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["stores"],
      });
    },
  });
};

// Delete
export const useDeleteStore = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteStore,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["stores"],
      });
    },
  });
};