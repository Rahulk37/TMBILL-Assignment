"use client";

import { useTopItems } from "@/hooks/useAnalytics";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Tooltip,
  Cell,
  Legend,
} from "recharts";
import { PieChart as PieChartIcon } from "lucide-react";

const COLORS = [
  "#2563eb",
  "#16a34a",
  "#9333ea",
  "#ea580c",
  "#dc2626",
  "#0891b2",
  "#7c3aed",
];

export default function TopItemsChart() {
  const { data, isLoading } = useTopItems();

  if (isLoading) {
    return (
      <div className="h-80 animate-pulse rounded-2xl bg-white shadow-sm border border-slate-100" />
    );
  }

  const chartData = data?.data || [];

  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm border border-slate-100">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold text-slate-800 flex items-center gap-2">
            <PieChartIcon className="w-5 h-5 text-purple-600" />
            Top Selling Items
          </h2>
          <p className="text-sm text-slate-500">Distribution of top selling items</p>
        </div>
        <span className="text-xs font-medium text-slate-400 bg-slate-50 px-3 py-1 rounded-full">
          Top {chartData.length} items
        </span>
      </div>

      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              dataKey="totalQuantity"
              nameKey="itemId"
              cx="50%"
              cy="50%"
              outerRadius={100}
              label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
              labelLine={{ stroke: '#94a3b8', strokeWidth: 1 }}
            >
              {chartData.map((_: any, index: number) => (
                <Cell
                  key={index}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip 
              contentStyle={{
                backgroundColor: 'white',
                borderRadius: '8px',
                border: '1px solid #e2e8f0',
                boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)',
              }}
            />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}