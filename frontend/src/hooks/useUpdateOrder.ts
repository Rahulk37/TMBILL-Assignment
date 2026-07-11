import { useMutation, useQueryClient } from "@tanstack/react-query";

import { updateOrderStatus } from "@/services/order.service";

export const useUpdateOrder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateOrderStatus,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["orders"],
      });
    },
  });
};