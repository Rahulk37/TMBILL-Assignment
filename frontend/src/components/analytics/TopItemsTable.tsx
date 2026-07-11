"use client";

import { useTopItems } from "@/hooks/useAnalytics";

export default function TopItemsTable() {
  const { data, isLoading, error } = useTopItems();

  if (isLoading) {
    return (
      <div className="flex h-60 items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-purple-500 border-t-transparent"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-xl border border-red-200 bg-red-50 p-6 text-center text-red-600">
        Failed to load top-selling items.
      </div>
    );
  }

  return (
   <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
      {/* Header */}
      <div className="border-b px-6 py-4">
        <h2 className="text-2xl font-bold text-gray-800">
          Top 5 Selling Items
        </h2>

        <p className="mt-1 text-sm text-gray-500">
          Best-performing products based on total quantity sold.
        </p>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-slate-100">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                Rank
              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                Item ID
              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                Quantity Sold
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            {data?.data.length ? (
              data.data.map(
                (
                  item: {
                    itemId: string;
                    totalQuantity: number;
                  },
                  index: number
                ) => (
                  <tr
                    key={index}
                    className="transition hover:bg-gray-50"
                  >
                    <td className="px-6 py-4">
                     <span className="flex h-9 w-9 items-center justify-center rounded-full bg-amber-100 text-amber-700 font-bold">
                        #{index + 1}
                      </span>
                    </td>

                    <td className="px-6 py-4 font-medium text-gray-800">
                      {item.itemId}
                    </td>

                    <td className="px-6 py-4">
                     <span className="rounded-full bg-indigo-100 px-3 py-1 text-xs font-semibold text-indigo-700">
                        {item.totalQuantity}
                      </span>
                    </td>
                  </tr>
                )
              )
            ) : (
              <tr>
                <td
                  colSpan={3}
                  className="py-10 text-center text-gray-500"
                >
                  No top-selling items available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}