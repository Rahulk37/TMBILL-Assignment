import { archiveOrders, useArchiveOrdersApi } from "@/services/analytics.service";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useArchive = () => {
  return useMutation({
    mutationFn: ({ days }: { days: number }) => archiveOrders(days),
  });
};

export const useArchiveOrders = ({
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
      useArchiveOrdersApi({
        store_id,
        page,
        limit,
      }),
  });
};