import api from "@/services/api";
import { deleteOrderStatus } from "@/services/order.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";


export function useDeleteOrder() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteOrderStatus,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["orders"],
      });
    },
  });
}