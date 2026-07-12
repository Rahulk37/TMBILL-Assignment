"use client";

import Pagination from "@/components/common/Pagination";
import { Order } from "@/types/order";

import useOrderStore from "@/store/order.store";
import useSocket from "@/hooks/useSocket";
import StoreFilter from "./StoreFilter";
import Link from "next/link";
import { useOrders } from "@/hooks/order/useOrder";

export default function OrdersTable() {
  useSocket();

  const { selectedStore, page, limit } = useOrderStore();

  const { data, isLoading } = useOrders({
    store_id: "",
    page: 1,
    limit,
  });

  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"></div>
      </div>
    );
  }



  return (
    <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
      {/* Header */}

      <div className="flex flex-col gap-6 border-b p-6 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Orders</h2>

          <p className="mt-1 text-sm text-slate-500">
            View and manage all store orders.
          </p>
        </div>
        <Link
          href="/create-order"
          className="rounded-xl bg-blue-600 px-5 py-3 font-medium text-white hover:bg-blue-700"
        >
          + Create Order
        </Link>
      </div>

      {/* Filters */}

      <div className="border-b p-6">
        <StoreFilter />
      </div>

      {/* Table */}

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600">
                Store
              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600">
                Total Amount
              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600">
                Status
              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600">
                Created At
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100">
            {data?.data.length ? (
              data.data.map((order: Order) => (
                <tr key={order._id} className="hover:bg-slate-50 transition">
                  <td className="px-6 py-5 font-medium text-slate-800">
                    {order.store_id}
                  </td>

                  <td className="px-6 py-5 font-semibold text-slate-800">
                    ₹{order.total_amount}
                  </td>

                  <td className="px-6 py-5">
                    <span
                      className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold
                    ${
                      order.status === "PLACED"
                        ? "bg-blue-100 text-blue-700"
                        : order.status === "PREPARING"
                          ? "bg-orange-100 text-orange-700"
                          : "bg-green-100 text-green-700"
                    }`}
                    >
                      {order.status}
                    </span>
                  </td>

                  <td className="px-6 py-5 text-slate-500">
                    {new Date(order.created_at).toLocaleString()}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="py-16 text-center text-slate-400">
                  No Orders Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}

      <div className="flex items-center justify-end border-t bg-slate-50 px-6 py-4">
        <Pagination totalPages={data?.pagination.totalPages ?? 0} />
      </div>
    </div>
  );
}
