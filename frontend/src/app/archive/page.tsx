"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  useDeleteOrder,
  useUpdateOrderStatus,
} from "@/hooks/order/useOrder";
import useOrderStore from "@/store/order.store";
import {
  ShoppingBag,
  Search,
  Eye,
  TrendingUp,
  ChevronLeft,
  ChevronRight,
  Package,
  User,
  Store,
  CheckCircle,
  Clock,
  X,
  RotateCcw,
  Archive,
  Calendar,
  AlertCircle,
} from "lucide-react";
import { useArchiveOrders } from "@/hooks/archive/useArchive";

export default function ArchiveOrdersPage() {
  const router = useRouter();
  const { page, limit, setPage } = useOrderStore();

  const [selectedStore, setSelectedStore] = useState("");
  const [search, setSearch] = useState("");
  const [showRestoreModal, setShowRestoreModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<any>(null);

  const { data, isLoading } = useArchiveOrders({
    store_id: "",
    page: 1,
    limit: 100,
  });



  const orders = data?.data || [];
  const pagination = data?.pagination;

  // Create store map from archived data
  const storeMap = new Map<string, string>();
  orders.forEach((order: any) => {
    const storeId = order.order_data?.store_id || order.store_id;
    const storeName = order.order_data?.store_name || order.store_name || storeId;
    if (!storeMap.has(storeId)) {
      storeMap.set(storeId, storeName);
    }
  });
  const stores = Array.from(storeMap.entries());

  // Filter Orders
  const filteredOrders = useMemo(() => {
    return orders.filter((order: any) => {
      const orderData = order.order_data || order;
      const storeId = orderData.store_id || order.store_id;
      
      const matchesStore = !selectedStore || storeId === selectedStore;
      
      const matchesSearch =
        !search ||
        orderData.order_id?.toLowerCase().includes(search.toLowerCase()) ||
        orderData.customer_name?.toLowerCase().includes(search.toLowerCase());

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
    return orders.filter((order: any) => {
      const orderData = order.order_data || order;
      return orderData.status === status;
    }).length;
  };

  const handleRestore = (order: any) => {
    setSelectedOrder(order);
    setShowRestoreModal(true);
  };



  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/30 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-slate-600 font-medium">Loading archived orders...</p>
        </div>
      </div>
    );
  }
if (orders.length === 0) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-amber-50/30 flex items-center justify-center p-8">
      <div className="w-full max-w-lg rounded-2xl bg-white/80 backdrop-blur-sm p-12 text-center shadow-xl border border-white/20">
        <div className="w-20 h-20 bg-gradient-to-br from-amber-500 to-amber-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
          <Archive className="w-10 h-10 text-white" />
        </div>
        <h1 className="mb-3 text-3xl font-bold text-slate-800">No Archived Orders</h1>
        <p className="mb-2 text-slate-600 text-lg">
          Your archive is empty
        </p>
        <p className="mb-8 text-sm text-slate-500">
          Orders that are archived will appear here. You can archive old orders from the analytics page or wait for automatic archiving.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={() => router.push("/analytics")}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-amber-600 to-amber-700 px-6 py-3 text-white font-semibold hover:shadow-lg hover:shadow-amber-500/30 transition-all duration-200 hover:scale-105"
          >
            <TrendingUp className="w-5 h-5" />
            Go to Analytics
          </button>
          <button
            onClick={() => router.push("/orders")}
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 px-6 py-3 text-slate-600 font-semibold hover:bg-slate-50 transition-all duration-200"
          >
            <ShoppingBag className="w-5 h-5" />
            View Active Orders
          </button>
        </div>
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
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-amber-50">
                <Archive className="w-6 h-6 text-amber-600" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-slate-800">Archived Orders</h1>
                <p className="text-slate-500 mt-1">
                  View and manage orders that have been archived
                </p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm text-slate-500">
              Total:{" "}
              <span className="font-semibold text-slate-700">
                {orders.length}
              </span>{" "}
              archived orders
            </span>
          </div>
        </div>

        {/* Stats */}
        <div className="grid gap-4 md:grid-cols-4 mb-8">
          <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">Archived Orders</p>
                <p className="mt-1 text-2xl font-bold text-slate-800">
                  {orders.length}
                </p>
              </div>
              <div className="rounded-xl bg-amber-50 p-2.5">
                <Archive className="w-5 h-5 text-amber-600" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-100">
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
          <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-100">
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
          <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-100">
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
        <div className="bg-white rounded-xl shadow-sm p-4 mb-8 border border-slate-100">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                placeholder="Search by Order ID or Customer name..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-lg border border-slate-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 outline-none transition-all"
              />
            </div>
            <div className="flex gap-2">
              <select
                value={selectedStore}
                onChange={(e) => setSelectedStore(e.target.value)}
                className="px-4 py-3 rounded-lg border border-slate-200 bg-white focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 outline-none transition-all min-w-[160px]"
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
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-amber-50/50">
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
                  <th className="p-4 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                    Archived
                  </th>
                 
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredOrders.length > 0 ? (
                  filteredOrders.map((order: any) => {
                    const orderData = order.order_data || order;
                    const storeId = orderData.store_id || order.store_id;
                    const storeName = orderData.store_name || order.store_name || storeId;
                    const archivedDate = order.archived_at || order.metadata?.archive_date || new Date();

                    return (
                      <tr
                        key={order._id || order.order_id}
                        className="group hover:bg-amber-50/30 transition-colors"
                      >
                        <td className="p-4">
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-purple-50 text-purple-600 text-xs font-medium">
                            <Store className="w-3 h-3" />
                            {storeName}
                          </span>
                        </td>
                        <td className="p-4">
                          <p className="font-medium text-slate-800">
                            #{orderData.order_id}
                          </p>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center gap-2">
                            <User className="w-4 h-4 text-slate-400" />
                            <p className="text-sm text-slate-600">
                              {orderData.customer_name}
                            </p>
                          </div>
                        </td>
                        <td className="p-4">
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-600 text-sm">
                            <Package className="w-3.5 h-3.5" />
                            {orderData.total_items || 0}
                          </span>
                        </td>
                        <td className="p-4">
                          <p className="font-semibold text-slate-800">
                            ₹{orderData.total_amount}
                          </p>
                        </td>
                        <td className="p-4">
                          <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold ${getStatusColor(orderData.status)}`}>
                            {getStatusIcon(orderData.status)}
                            {orderData.status}
                          </span>
                        </td>
                        <td className="p-4">
                          <span className="inline-flex items-center gap-1.5 text-xs text-slate-500">
                            <Calendar className="w-3.5 h-3.5" />
                            {new Date(archivedDate).toLocaleDateString('en-US', {
                              month: 'short',
                              day: 'numeric',
                              year: 'numeric'
                            })}
                          </span>
                        </td>
                      
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan={8} className="p-12 text-center">
                      <div className="flex flex-col items-center gap-3">
                        <Archive className="w-12 h-12 text-slate-300" />
                        <p className="text-slate-500 font-medium">No archived orders found</p>
                        <p className="text-sm text-slate-400">
                          {search || selectedStore
                            ? "Try adjusting your search or filters"
                            : "Archived orders will appear here"}
                        </p>
                        {(search || selectedStore) && (
                          <button
                            onClick={() => {
                              setSearch("");
                              setSelectedStore("");
                            }}
                            className="mt-2 text-amber-600 hover:text-amber-700 text-sm font-medium"
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
                Page {pagination.currentPage || page} of {pagination.totalPages} •{" "}
                {orders.length} archived orders
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

      {/* Restore Confirmation Modal */}
      {showRestoreModal && selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="flex items-center gap-3 mb-4">
              <div className="rounded-xl bg-emerald-50 p-2">
                <RotateCcw className="w-6 h-6 text-emerald-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-slate-800">
                  Restore Order
                </h3>
                <p className="text-sm text-slate-500">
                  Move this order back to active orders
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="bg-slate-50 rounded-lg p-4">
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <span className="text-slate-500">Order ID:</span>
                  <span className="font-medium text-slate-800">
                    #{selectedOrder.order_data?.order_id || selectedOrder.order_id}
                  </span>
                  <span className="text-slate-500">Customer:</span>
                  <span className="font-medium text-slate-800">
                    {selectedOrder.order_data?.customer_name || selectedOrder.customer_name}
                  </span>
                  <span className="text-slate-500">Amount:</span>
                  <span className="font-medium text-slate-800">
                    ₹{selectedOrder.order_data?.total_amount || selectedOrder.total_amount}
                  </span>
                  <span className="text-slate-500">Status:</span>
                  <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-semibold ${getStatusColor(selectedOrder.order_data?.status || selectedOrder.status)}`}>
                    {selectedOrder.order_data?.status || selectedOrder.status}
                  </span>
                </div>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                <div className="flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 text-yellow-600 mt-0.5" />
                  <p className="text-xs text-yellow-700">
                    This will restore the order to the active orders list.
                    The order will appear in the main orders page.
                  </p>
                </div>
              </div>
            </div>

           
          </div>
        </div>
      )}
    </div>
  );
}