"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  useOrders,
  useDeleteOrder,
  useUpdateOrderStatus,
} from "@/hooks/order/useOrder";
import useOrderStore from "@/store/order.store";
import {
  ShoppingBag,
  Search,
  Filter,
  Eye,
  Trash2,
  ChevronLeft,
  ChevronRight,
  Package,
  User,
  Store,
  DollarSign,
  CheckCircle,
  Clock,
  AlertCircle,
  X,
} from "lucide-react";

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

  const orders = data?.data || [];
  const pagination = data?.pagination;
  console.log("orders", orders);
  // Unique Stores

const storeMap = new Map<string, string>();

orders.forEach((order) => {
  if (!storeMap.has(order.store_id)) {
    storeMap.set(order.store_id, order.store_name);
  }
});

const stores = Array.from(storeMap.entries());
  // Filter Orders
  const filteredOrders = useMemo(() => {
    return orders.filter((order: any) => {
      const matchesStore = !selectedStore || order.store_id === selectedStore;

      const matchesSearch =
        !search ||
        order.order_id.toLowerCase().includes(search.toLowerCase()) ||
        order.customer_name.toLowerCase().includes(search.toLowerCase());

      return matchesStore && matchesSearch;
    });
  }, [orders, selectedStore, search]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "COMPLETED":
        return "bg-green-100 text-green-700";
      case "PREPARING":
        return "bg-yellow-100 text-yellow-700";
      case "PLACED":
        return "bg-blue-100 text-blue-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "COMPLETED":
        return <CheckCircle className="w-3.5 h-3.5" />;
      case "PREPARING":
        return <Clock className="w-3.5 h-3.5" />;
      case "PLACED":
        return <Package className="w-3.5 h-3.5" />;
      default:
        return null;
    }
  };

  const getStatusCount = (status: string) => {
    if (status === "ALL") return orders.length;
    return orders.filter((o: any) => o.status === status).length;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/30 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-slate-600 font-medium">Loading orders...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30 p-8">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-800">All Orders</h1>
            <p className="text-slate-500 mt-1">
              Manage and track all orders across stores
            </p>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm text-slate-500">
              Total:{" "}
              <span className="font-semibold text-slate-700">
                {orders.length}
              </span>{" "}
              orders
            </span>
          </div>
        </div>

        {/* Stats */}
        <div className="grid gap-4 md:grid-cols-4 mb-8">
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">
                  Total Orders
                </p>
                <p className="mt-1 text-2xl font-bold text-slate-800">
                  {orders.length}
                </p>
              </div>
              <div className="rounded-xl bg-blue-50 p-2.5">
                <ShoppingBag className="w-5 h-5 text-blue-600" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">Placed</p>
                <p className="mt-1 text-2xl font-bold text-blue-600">
                  {getStatusCount("PLACED")}
                </p>
              </div>
              <div className="rounded-xl bg-blue-50 p-2.5">
                <Package className="w-5 h-5 text-blue-600" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">Preparing</p>
                <p className="mt-1 text-2xl font-bold text-yellow-600">
                  {getStatusCount("PREPARING")}
                </p>
              </div>
              <div className="rounded-xl bg-yellow-50 p-2.5">
                <Clock className="w-5 h-5 text-yellow-600" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">Completed</p>
                <p className="mt-1 text-2xl font-bold text-green-600">
                  {getStatusCount("COMPLETED")}
                </p>
              </div>
              <div className="rounded-xl bg-green-50 p-2.5">
                <CheckCircle className="w-5 h-5 text-green-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-sm p-4 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                placeholder="Search by Order ID or Customer name..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-lg border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
              />
            </div>
            <div className="flex gap-2">
             <select
  value={selectedStore}
  onChange={(e) => setSelectedStore(e.target.value)}
  className="px-4 py-3 rounded-lg border border-slate-200 bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all min-w-[160px]"
>
  <option value="">All Stores</option>

  {stores.map(([storeId, storeName]) => (
    <option key={storeId} value={storeId}>
      {storeName}
    </option>
  ))}
</select>
              {selectedStore && (
                <button
                  onClick={() => setSelectedStore("")}
                  className="px-3 py-3 rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-50 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Orders Table */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50/80">
                <tr>
                  <th className="p-4 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                    Store
                  </th>
                  <th className="p-4 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                    Order
                  </th>
                  <th className="p-4 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                    Customer
                  </th>
                  <th className="p-4 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                    Items
                  </th>
                  <th className="p-4 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="p-4 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="p-4 text-center text-xs font-medium text-slate-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredOrders.length > 0 ? (
                  filteredOrders.map((order: any) => (
                    <tr
                      key={`${order.store_id}-${order.order_id}`}
                      className="group hover:bg-slate-50/50 transition-colors"
                    >
                      <td className="p-4">
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-purple-50 text-purple-600 text-xs font-medium">
                          <Store className="w-3 h-3" />
                          {order.store_id}
                        </span>
                      </td>
                      <td className="p-4">
                        <p className="font-medium text-slate-800">
                          #{order.order_id}
                        </p>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <User className="w-4 h-4 text-slate-400" />
                          <p className="text-sm text-slate-600">
                            {order.customer_name}
                          </p>
                        </div>
                      </td>
                      <td className="p-4">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-600 text-sm">
                          <Package className="w-3.5 h-3.5" />
                          {order.total_items || 0}
                        </span>
                      </td>
                      <td className="p-4">
                        <p className="font-semibold text-slate-800">
                          ₹{order.total_amount}
                        </p>
                      </td>
                      <td className="p-4">
                        <select
                          value={order.status}
                          onChange={(e) => {
                            if (
                              confirm(
                                `Update order #${order.order_id} status to ${e.target.value}?`,
                              )
                            ) {
                              updateStatus({
                                store_id: order.store_id,
                                order_id: order.order_id,
                                status: e.target.value as any,
                              });
                            }
                          }}
                          className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border-0 cursor-pointer transition-colors ${getStatusColor(order.status)}`}
                        >
                          {getStatusIcon(order.status)}
                          <option
                            value="PLACED"
                            className="bg-blue-100 text-blue-700"
                          >
                            PLACED
                          </option>
                          <option
                            value="PREPARING"
                            className="bg-yellow-100 text-yellow-700"
                          >
                            PREPARING
                          </option>
                          <option
                            value="COMPLETED"
                            className="bg-green-100 text-green-700"
                          >
                            COMPLETED
                          </option>
                        </select>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            onClick={() =>
                              router.push(
                                `/orders/${order.store_id}/${order.order_id}`,
                              )
                            }
                            className="p-2 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors group-hover:scale-105 transform duration-200"
                            title="View Order"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => {
                              if (
                                confirm(
                                  `Are you sure you want to delete order #${order.order_id}?`,
                                )
                              ) {
                                deleteOrder({
                                  store_id: order.store_id,
                                  order_id: order.order_id,
                                });
                              }
                            }}
                            className="p-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition-colors group-hover:scale-105 transform duration-200"
                            title="Delete Order"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={7} className="p-12 text-center">
                      <div className="flex flex-col items-center gap-3">
                        <ShoppingBag className="w-12 h-12 text-slate-300" />
                        <p className="text-slate-500 font-medium">
                          No orders found
                        </p>
                        <p className="text-sm text-slate-400">
                          {search || selectedStore
                            ? "Try adjusting your search or filters"
                            : "Orders will appear here once they are created"}
                        </p>
                        {(search || selectedStore) && (
                          <button
                            onClick={() => {
                              setSearch("");
                              setSelectedStore("");
                            }}
                            className="mt-2 text-blue-600 hover:text-blue-700 text-sm font-medium"
                          >
                            Clear all filters
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {pagination && pagination.totalPages > 1 && (
            <div className="flex items-center justify-between border-t border-slate-100 px-6 py-4">
              <p className="text-sm text-slate-500">
                Page {pagination.currentPage} of {pagination.totalPages} •{" "}
                {orders.length} orders
              </p>
              <div className="flex gap-2">
                <button
                  onClick={() => setPage(page - 1)}
                  disabled={page === 1}
                  className="p-2 rounded-lg border border-slate-200 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setPage(page + 1)}
                  disabled={page === pagination.totalPages}
                  className="p-2 rounded-lg border border-slate-200 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
