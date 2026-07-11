"use client";

import { useTopItems } from "@/hooks/useAnalytics";

import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Tooltip,
  Cell,
} from "recharts";

const COLORS = [
  "#2563eb",
  "#16a34a",
  "#9333ea",
  "#ea580c",
  "#dc2626",
];

export default function TopItemsChart() {
  const { data, isLoading } = useTopItems();

  if (isLoading) {
    return (
      <div className="h-80 animate-pulse rounded-2xl bg-white" />
    );
  }

  return (
    <div className="rounded-2xl border bg-white p-6 shadow-sm">
      <h2 className="mb-6 text-xl font-semibold">
        Top Selling Items
      </h2>

      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data?.data}
              dataKey="totalQuantity"
              nameKey="itemId"
              outerRadius={100}
              label
            >
              {data?.data.map(
                (_: unknown, index: number) => (
                  <Cell
                    key={index}
                    fill={
                      COLORS[
                        index % COLORS.length
                      ]
                    }
                  />
                )
              )}
            </Pie>

            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}