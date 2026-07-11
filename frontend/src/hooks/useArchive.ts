import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import { archiveOrders } from "@/services/analytics.service";

export const useArchive = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: archiveOrders,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["orders"],
      });

      queryClient.invalidateQueries({
        queryKey: ["orders-per-day"],
      });

      queryClient.invalidateQueries({
        queryKey: ["revenue-per-store"],
      });

      queryClient.invalidateQueries({
        queryKey: ["top-items"],
      });
    },
  });
};