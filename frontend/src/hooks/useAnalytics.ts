import { useQuery } from "@tanstack/react-query";

import {
  getOrdersPerDay,
  getRevenuePerStore,
  getTopItems,
} from "@/services/analytics.service";

export const useOrdersPerDay = () =>
  useQuery({
    queryKey: ["orders-per-day"],
    queryFn: getOrdersPerDay,
  });

export const useRevenuePerStore = () =>
  useQuery({
    queryKey: ["revenue-per-store"],
    queryFn: getRevenuePerStore,
  });

export const useTopItems = () =>
  useQuery({
    queryKey: ["top-items"],
    queryFn: getTopItems,
  });