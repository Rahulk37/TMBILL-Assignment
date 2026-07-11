"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  useOrders,
  useDeleteOrder,
  useUpdateOrderStatus,
} from "@/hooks/order/useOrder";
import useOrderStore from "@/store/order.store";

export default function OrdersPage() {
  const router = useRouter();

  const { page, limit, setPage } = useOrderStore();

  const [selectedStore, setSelectedStore] = useState("");
  const [search, setSearch] = useState("");

  const { data, isLoading } = useOrders({
    store_id: "",
    page,
    limit,
  });

  const { mutate: deleteOrder } = useDeleteOrder();
  const { mutate: updateStatus } = useUpdateOrderStatus();

  if (isLoading) {
    return <div className="p-8">Loading...</div>;
  }

  const orders = data?.data || [];
  const pagination = data?.pagination;
console.log("orderssss",orders)
  // Unique Stores
  const stores = [...new Set(orders.map((o: any) => o.store_id))];

  // Filter Orders
  const filteredOrders = useMemo(() => {
    return orders.filter((order: any) => {
      const matchesStore =
        !selectedStore || order.store_id === selectedStore;

      const matchesSearch =
        !search ||
        order.order_id
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        order.customer_name
          .toLowerCase()
          .includes(search.toLowerCase());

      return matchesStore && matchesSearch;
    });
  }, [orders, selectedStore, search]);

  return (
    <div className="min-h-screen bg-slate-100 p-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Orders</h1>
            <p className="text-slate-500">Manage all orders</p>
          </div>
        </div>

        {/* Filters */}
        <div className="mb-6 flex gap-4">
          <select
            value={selectedStore}
            onChange={(e) => setSelectedStore(e.target.value)}
            className="rounded border px-4 py-2"
          >
            <option value="">All Stores</option>

            {stores.map((store: any) => (
              <option key={store} value={store}>
                {store}
              </option>
            ))}
          </select>

          <input
            type="text"
            placeholder="Search by Order ID or Customer"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-72 rounded border px-4 py-2"
          />
        </div>

        <div className="overflow-hidden rounded-xl bg-white shadow">
          <table className="w-full">
            <thead className="bg-slate-100">
              <tr>
                <th className="p-4 text-left">Store</th>
                <th className="p-4 text-left">Order</th>
                <th className="p-4 text-left">Customer</th>
                <th className="p-4 text-left">Items</th>
                <th className="p-4 text-left">Amount</th>
                <th className="p-4 text-left">Status</th>
                <th className="p-4 text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredOrders.length > 0 ? (
                filteredOrders.map((order: any) => (
                  <tr
                    key={`${order.store_id}-${order.order_id}`}
                    className="border-t"
                  >
                    <td className="p-4">{order.store_id}</td>

                    <td className="p-4">{order.order_id}</td>

                    <td className="p-4">{order.customer_name}</td>

                    <td className="p-4">{order.total_items}</td>

                    <td className="p-4">₹{order.total_amount}</td>

                    <td className="p-4">
                      <select
                        value={order.status}
                        onChange={(e) =>
                          updateStatus({
                            store_id: order.store_id,
                            order_id: order.order_id,
                            status: e.target.value as any,
                          })
                        }
                        className="rounded border px-2 py-1"
                      >
                        <option>PLACED</option>
                        <option>PREPARING</option>
                        <option>COMPLETED</option>
                      </select>
                    </td>

                    <td className="space-x-2 text-center">
                      <button
                        onClick={() =>
                          router.push(
                            `/orders/${order.store_id}/${order.order_id}`
                          )
                        }
                        className="rounded bg-green-500 px-3 py-2 text-white"
                      >
                        View
                      </button>

                      <button
                        onClick={() =>
                          deleteOrder({
                            store_id: order.store_id,
                            order_id: order.order_id,
                          })
                        }
                        className="rounded bg-red-500 px-3 py-2 text-white"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={7}
                    className="p-6 text-center text-slate-500"
                  >
                    No orders found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {pagination && (
          <div className="mt-6 flex items-center justify-between">
            <button
              disabled={page === 1}
              onClick={() => setPage(page - 1)}
              className="rounded bg-slate-700 px-4 py-2 text-white disabled:opacity-50"
            >
              Previous
            </button>

            <span>
              Page {pagination.currentPage} of {pagination.totalPages}
            </span>

            <button
              disabled={page === pagination.totalPages}
              onClick={() => setPage(page + 1)}
              className="rounded bg-slate-700 px-4 py-2 text-white disabled:opacity-50"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
}