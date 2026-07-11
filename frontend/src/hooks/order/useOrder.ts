import {
  createOrder,
  deleteOrder,
  getOrderById,
  getOrders,
  updateOrderStatus,
} from "@/services/order.service";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

// Create
export const useCreateOrder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createOrder,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["orders"],
      });
    },
  });
};

// Get All
export const useOrders = ({
  store_id,
  page,
  limit,
}: {
  store_id: string;
  page: number;
  limit: number;
}) => {
  return useQuery({
    queryKey: ["orders", store_id, page, limit],
    queryFn: () =>
      getOrders({
        store_id,
        page,
        limit,
      }),
  });
};

// Get Single Order
export const useOrder = ({
  store_id,
  order_id,
}: {
  store_id: string;
  order_id: string;
}) => {
  return useQuery({
    queryKey: ["order", store_id, order_id],
    queryFn: () =>
      getOrderById({
        store_id,
        order_id,
      }),
    enabled: !!store_id && !!order_id,
  });
};

// Update Entire Order
export const useUpdateOrder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateOrderStatus,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["orders"],
      });

      queryClient.invalidateQueries({
        queryKey: ["order"],
      });
    },
  });
};

// Update Only Status
export const useUpdateOrderStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateOrderStatus,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["orders"],
      });

      queryClient.invalidateQueries({
        queryKey: ["order"],
      });
    },
  });
};

// Delete
export const useDeleteOrder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteOrder,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["orders"],
      });
    },
  });
};
