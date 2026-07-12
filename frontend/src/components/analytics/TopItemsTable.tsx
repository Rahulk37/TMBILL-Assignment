"use client";

import { useTopItems } from "@/hooks/useAnalytics";
import { Trophy, Package, TrendingUp } from "lucide-react";

const RANK_COLORS = [
  "bg-amber-500 text-white",
  "bg-slate-400 text-white",
  "bg-orange-600 text-white",
  "bg-blue-500 text-white",
  "bg-purple-500 text-white",
];

export default function TopItemsTable() {
  const { data, isLoading, error } = useTopItems();

  if (isLoading) {
    return (
      <div className="rounded-2xl bg-white shadow-sm border border-slate-100 p-8">
        <div className="flex h-60 items-center justify-center">
          <div className="flex flex-col items-center gap-3">
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-purple-500 border-t-transparent"></div>
            <p className="text-sm text-slate-500">Loading top items...</p>
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
            <p className="font-semibold">Failed to load top-selling items</p>
            <p className="text-sm mt-1">Please try again later</p>
          </div>
        </div>
      </div>
    );
  }

  const tableData = data?.data || [];
console.log("tableData1",tableData)
  return (
    <div className="rounded-2xl bg-white shadow-sm border border-slate-100 overflow-hidden">
      <div className="border-b border-slate-100 px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-slate-800 flex items-center gap-2">
              <Trophy className="w-5 h-5 text-amber-500" />
              Top Selling Items
            </h2>
            <p className="text-sm text-slate-500">Best-performing products based on total quantity sold</p>
          </div>
          <span className="text-xs font-medium text-slate-400 bg-slate-50 px-3 py-1 rounded-full">
            Top {tableData.length}
          </span>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-slate-50/80">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                Rank
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                Item ID
              </th>
               <th className="px-6 py-4 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                Item Name
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                Quantity Sold
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {tableData.length > 0 ? (
              tableData.map(
                (
                  item: { itemId: string; totalQuantity: number ,itemName:string},
                  index: number
                ) => (
                  <tr key={index} className="hover:bg-slate-50/50 transition-colors group">
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center justify-center w-8 h-8 rounded-full text-sm font-bold ${RANK_COLORS[index % RANK_COLORS.length]}`}>
                        {index + 1}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 text-slate-700 text-sm font-medium">
                        <Package className="w-4 h-4 text-slate-400" />
                        {item.itemId}
                      </span>
                    </td>
                     <td className="px-6 py-4">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 text-slate-700 text-sm font-medium">
                        <Package className="w-4 h-4 text-slate-400" />
                        {item.itemName}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-indigo-100 px-3 py-1 text-sm font-semibold text-indigo-700">
                        <TrendingUp className="w-3.5 h-3.5" />
                        {item.totalQuantity}
                      </span>
                    </td>
                  </tr>
                )
              )
            ) : (
              <tr>
                <td colSpan={3} className="py-10 text-center text-slate-500">
                  <div className="flex flex-col items-center gap-2">
                    <Trophy className="w-8 h-8 text-slate-300" />
                    <p>No top-selling items available</p>
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