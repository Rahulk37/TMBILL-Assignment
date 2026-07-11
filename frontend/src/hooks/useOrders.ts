import {
  useQuery,
  keepPreviousData,
} from "@tanstack/react-query";

import { getOrders } from "@/services/order.service";

export const useOrders = (
  store_id: string,
  page: number,
  limit: number
) => {
  return useQuery({
    queryKey: [
      "orders",
      store_id,
      page,
      limit,
    ],

    queryFn: () =>
      getOrders({
        store_id,
        page,
        limit,
      }),

    placeholderData: keepPreviousData,
  });
};