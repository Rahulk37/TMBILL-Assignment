"use client";

import { useState } from "react";

import { useOrders } from "@/hooks/useOrders";
import { useUpdateOrder } from "@/hooks/useUpdateOrder";

import useOrderStore from "@/store/order.store";

import StatusDropdown from "./StatusDropdown";
import { OrderStatus } from "@/types/order";
import { useDeleteOrder } from "@/hooks/useDeleteOrder";

export default function UpdateOrderTable() {
  const { selectedStore, page, limit } = useOrderStore();

  const { data, isLoading, error } = useOrders(selectedStore, page, limit);
  console.log("UpdateOrderTable", data);
  const { mutate, isPending } = useUpdateOrder();

  const [statusMap, setStatusMap] = useState<Record<string, OrderStatus>>({});
  const { mutate: updateOrder } = useUpdateOrder();
  const { mutate: deleteOrder } = useDeleteOrder();

  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const [deletingId, setDeletingId] = useState<string | null>(null);

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
        Failed to load orders.
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
      {/* Header */}
      <div className="border-b p-6">
        <h2 className="text-2xl font-bold text-slate-800">
          Update Order Status
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Update the current status of customer orders.
        </p>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600">
                Order ID
              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600">
                Store
              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600">
                Current Status
              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600">
                Update Status
              </th>

              <th className="px-6 py-4 text-center text-sm font-semibold text-slate-600">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100">
            {data?.data.length ? (
              data.data.map((order) => (
                <tr key={order._id} className="hover:bg-slate-50 transition">
                  <td className="px-6 py-5 font-semibold text-slate-800">
                    #{order._id.slice(-6).toUpperCase()}
                  </td>

                  <td className="px-6 py-5 text-slate-700">{order.store_id}</td>

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

                  <td className="px-6 py-5 min-w-55">
                    <StatusDropdown
                      value={statusMap[order._id] ?? order.status}
                      onChange={(status) =>
                        setStatusMap((prev) => ({
                          ...prev,
                          [order._id]: status,
                        }))
                      }
                    />
                  </td>

                  <td className="px-6 py-5">
                    <div className="flex items-center justify-center gap-3">
                      <button
                        onClick={() => {
                          setUpdatingId(order._id);

                          updateOrder(
                            {
                              id: order._id,
                              status: statusMap[order._id] ?? order.status,
                            },
                            {
                              onSuccess: () => {
                                setStatusMap((prev) => {
                                  const updated = { ...prev };
                                  delete updated[order._id];
                                  return updated;
                                });
                              },

                              onSettled: () => {
                                setUpdatingId(null);
                              },
                            },
                          );
                        }}
                        disabled={updatingId === order._id}
                        className="rounded-lg bg-orange-500 px-4 py-2 text-sm font-semibold text-white hover:bg-orange-600 disabled:opacity-50"
                      >
                        {updatingId === order._id ? "Updating..." : "Update"}
                      </button>

                      <button
                        onClick={() => {
                          if (!confirm("Delete this order?")) return;

                          setDeletingId(order._id);

                          deleteOrder(order._id, {
                            onSettled: () => {
                              setDeletingId(null);
                            },
                          });
                        }}
                        disabled={deletingId === order._id}
                        className="rounded-lg bg-red-500 px-4 py-2 text-sm font-semibold text-white hover:bg-red-600 disabled:opacity-50"
                      >
                        {deletingId === order._id ? "Deleting..." : "Delete"}
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="py-16 text-center text-slate-400">
                  No Orders Available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
