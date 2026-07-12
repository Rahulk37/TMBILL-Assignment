"use client";

import { useOrdersPerDay } from "@/hooks/useAnalytics";
import { Calendar, Package } from "lucide-react";

export default function OrdersPerDayTable() {
  const { data, isLoading, error } = useOrdersPerDay();

  if (isLoading) {
    return (
      <div className="rounded-2xl bg-white shadow-sm border border-slate-100 p-8">
        <div className="flex h-60 items-center justify-center">
          <div className="flex flex-col items-center gap-3">
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"></div>
            <p className="text-sm text-slate-500">Loading data...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-2xl bg-white shadow-sm border border-red-200 p-8">
        <div className="flex items-center justify-center text-red-600">
          <div className="text-center">
            <p className="font-semibold">Failed to load analytics</p>
            <p className="text-sm mt-1">Please try again later</p>
          </div>
        </div>
      </div>
    );
  }

  const tableData = data?.data || [];

  return (
    <div className="rounded-2xl bg-white shadow-sm border border-slate-100 overflow-hidden">
      <div className="border-b border-slate-100 px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-slate-800 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-blue-600" />
              Orders Per Day
            </h2>
            <p className="text-sm text-slate-500">Daily order statistics</p>
          </div>
          <span className="text-xs font-medium text-slate-400 bg-slate-50 px-3 py-1 rounded-full">
            {tableData.length} days
          </span>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-slate-50/80">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                Date
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                Total Orders
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {tableData.length > 0 ? (
              tableData.map(
                (
                  item: { date: string; totalOrders: number },
                  index: number,
                ) => (
                  <tr key={index} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4 text-sm text-slate-700">
                      {new Date(item.date).toLocaleDateString('en-US', {
                        weekday: 'short',
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                      })}
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-100 px-3 py-1 text-sm font-semibold text-blue-700">
                        <Package className="w-3.5 h-3.5" />
                        {item.totalOrders}
                      </span>
                    </td>
                  </tr>
                ),
              )
            ) : (
              <tr>
                <td colSpan={2} className="py-10 text-center text-slate-500">
                  <div className="flex flex-col items-center gap-2">
                    <Calendar className="w-8 h-8 text-slate-300" />
                    <p>No analytics data available</p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}