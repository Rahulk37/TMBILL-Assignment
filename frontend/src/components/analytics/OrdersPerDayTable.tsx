"use client";

import { useOrdersPerDay } from "@/hooks/useAnalytics";

export default function OrdersPerDayTable() {
  const { data, isLoading, error } = useOrdersPerDay();

  if (isLoading) {
    return (
      <div className="flex h-60 items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-xl border border-red-200 bg-red-50 p-6 text-center text-red-600">
        Failed to load analytics.
      </div>
    );
  }

  return (
   <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="border-b p-6">
        <h2 className="text-xl font-semibold text-slate-800">Orders Per Day</h2>

        <p className="mt-1 text-sm text-slate-500">Daily order statistics</p>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                Date
              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                Total Orders
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            {data?.data.length ? (
              data.data.map(
                (
                  item: {
                    date: string;
                    totalOrders: number;
                  },
                  index: number,
                ) => (
                  <tr key={index} className="transition hover:bg-gray-50">
                    <td className="px-6 py-4 text-gray-700">{item.date}</td>

                    <td className="px-6 py-4">
                      <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
                        {item.totalOrders}
                      </span>
                    </td>
                  </tr>
                ),
              )
            ) : (
              <tr>
                <td colSpan={2} className="py-10 text-center text-gray-500">
                  No analytics data available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
