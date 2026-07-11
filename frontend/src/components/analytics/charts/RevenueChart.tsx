"use client";

import { useRevenuePerStore } from "@/hooks/useAnalytics";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

export default function RevenueChart() {
  const { data, isLoading } = useRevenuePerStore();

  if (isLoading) {
    return (
      <div className="h-80 animate-pulse rounded-2xl bg-white" />
    );
  }

  return (
    <div className="rounded-2xl border bg-white p-6 shadow-sm">
      <h2 className="mb-6 text-xl font-semibold">
        Revenue Per Store
      </h2>

      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data?.data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="storeId" />
            <YAxis />
            <Tooltip />

            <Bar
              dataKey="totalRevenue"
              fill="#16a34a"
              radius={[8, 8, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}