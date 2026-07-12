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
  Legend,
} from "recharts";
import { BarChart3 } from "lucide-react";

export default function RevenueChart() {
  const { data, isLoading } = useRevenuePerStore();

  console.log("RevenueChart", data);

  if (isLoading) {
    return (
      <div className="h-80 animate-pulse rounded-2xl bg-white shadow-sm border border-slate-100" />
    );
  }

  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm border border-slate-100">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold text-slate-800 flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-emerald-600" />
            Revenue Per Store
          </h2>
          <p className="text-sm text-slate-500">Revenue breakdown by store</p>
        </div>

        <span className="text-xs font-medium text-slate-400 bg-slate-50 px-3 py-1 rounded-full">
          {data?.data?.length || 0} stores
        </span>
      </div>

      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data?.data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />

            {/* Store Name on X Axis */}
            <XAxis
              dataKey="storeName"
              stroke="#94a3b8"
              fontSize={12}
              tickLine={false}
            />

            <YAxis
              stroke="#94a3b8"
              fontSize={12}
              tickLine={false}
              tickFormatter={(value) => `₹${value}`}
            />

            <Tooltip
              contentStyle={{
                backgroundColor: "white",
                borderRadius: "8px",
                border: "1px solid #e2e8f0",
                boxShadow: "0 4px 6px -1px rgba(0,0,0,0.1)",
              }}
              formatter={(value) => [
                `₹${Number(value ?? 0).toLocaleString()}`,
                "Revenue",
              ]}
            labelFormatter={(_, payload) => {
  if (payload?.length) {
    const store = payload[0].payload;
    return `${store.storeName} • ${store.storeAddress}`;
  }

  return "";
}}
            />

            <Legend />

            <Bar
              dataKey="totalRevenue"
              fill="#16a34a"
              radius={[8, 8, 0, 0]}
              name="Revenue"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
