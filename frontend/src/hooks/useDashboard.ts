import { useQueries } from "@tanstack/react-query";
import {
  getOrdersPerDay,
  getRevenuePerStore,
  getTopItems,
} from "@/services/analytics.service";

export function useDashboard() {
  const results = useQueries({
    queries: [
      {
        queryKey: ["orders-per-day"],
        queryFn: getOrdersPerDay,
      },
      {
        queryKey: ["revenue-store"],
        queryFn: getRevenuePerStore,
      },
      {
        queryKey: ["top-items"],
        queryFn: getTopItems,
      },
    ],
  });

  return {
    ordersPerDay: results[0],
    revenue: results[1],
    topItems: results[2],
  };
}