"use client";

import { useParams, useRouter } from "next/navigation";
import useOrderStore from "@/store/order.store";
import { useDeleteOrder, useOrders, useUpdateOrderStatus } from "@/hooks/order/useOrder";
import { 
  ArrowLeft, 
  Plus, 
  ShoppingBag, 
  Package, 
  Eye, 
  Edit, 
  Trash2,
  ChevronLeft,
  ChevronRight,
  CheckCircle,
  Clock,
  AlertCircle,
  Search,
  Filter
} from "lucide-react";
import { useState } from "react";

export default function StoreOrdersPage() {
  const router = useRouter();
  const { store_id } = useParams<{ store_id: string }>();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
console.log("StoreOrdersPage",store_id)
  const { page, limit, setPage } = useOrderStore();
  const { data, isLoading } = useOrders({ store_id, page, limit });
  const { mutate: deleteOrder } = useDeleteOrder();
  const { mutate: updateStatus } = useUpdateOrderStatus();

  const orders = data?.data || [];
  const totalPages = data?.pagination?.totalPages || 1;
  const totalOrders = data?.data?.length|| 0;
  // Filter orders based on search and status
  const filteredOrders = orders.filter((order: any) => {
    const matchesSearch = 
      order.order_id.toString().includes(searchTerm) ||
      order.customer_name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "ALL" || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch(status) {
      case "COMPLETED": return "bg-green-100 text-green-700";
      case "PREPARING": return "bg-yellow-100 text-yellow-700";
      case "PLACED": return "bg-blue-100 text-blue-700";
      default: return "bg-gray-100 text-gray-700";
    }
  };

  const getStatusIcon = (status: string) => {
    switch(status) {
      case "COMPLETED": return <CheckCircle className="w-3.5 h-3.5" />;
      case "PREPARING": return <Clock className="w-3.5 h-3.5" />;
      case "PLACED": return <Package className="w-3.5 h-3.5" />;
      default: return null;
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
            <div className="flex items-center gap-3">
              <button
                onClick={() => router.push(`/stores/${store_id}`)}
                className="p-2 rounded-xl bg-white shadow-sm hover:shadow-md transition-shadow"
              >
                <ArrowLeft className="w-5 h-5 text-slate-600" />
              </button>
              <div>
                <h1 className="text-3xl font-bold text-slate-800">Store Orders</h1>
                <p className="text-slate-500 mt-1">Store ID: {store_id}</p>
              </div>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => router.push("/stores")}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 text-slate-600 font-medium border border-slate-200 hover:bg-slate-50 transition-all duration-200"
            >
              <ArrowLeft className="w-4 h-4" />
              All Stores
            </button>
            <button
              onClick={() =>router.push(`/orders/${store_id}`)}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-3 text-white font-semibold hover:shadow-lg hover:shadow-blue-500/30 transition-all duration-200 hover:scale-105"
            >
              <Plus className="w-5 h-5" />
              Create Order
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid gap-4 md:grid-cols-4 mb-8">
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">Total Orders</p>
                <p className="mt-1 text-2xl font-bold text-slate-800">{totalOrders}</p>
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
                <p className="mt-1 text-2xl font-bold text-blue-600">{getStatusCount("PLACED")}</p>
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
                <p className="mt-1 text-2xl font-bold text-yellow-600">{getStatusCount("PREPARING")}</p>
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
                <p className="mt-1 text-2xl font-bold text-green-600">{getStatusCount("COMPLETED")}</p>
              </div>
              <div className="rounded-xl bg-green-50 p-2.5">
                <CheckCircle className="w-5 h-5 text-green-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="bg-white rounded-xl shadow-sm p-4 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                placeholder="Search by order ID or customer name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-lg border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
              />
            </div>
            <div className="flex gap-2">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-3 rounded-lg border border-slate-200 bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all min-w-[140px]"
              >
                <option value="ALL">All Status</option>
                <option value="PLACED">Placed</option>
                <option value="PREPARING">Preparing</option>
                <option value="COMPLETED">Completed</option>
              </select>
            </div>
          </div>
        </div>

        {/* Orders Table */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50/80">
                <tr>
                  <th className="p-4 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Order</th>
                  <th className="p-4 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Customer</th>
                  <th className="p-4 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Items</th>
                  <th className="p-4 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Amount</th>
                  <th className="p-4 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Status</th>
                  <th className="p-4 text-center text-xs font-medium text-slate-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredOrders.length > 0 ? (
                  filteredOrders.map((order: any) => (
                    <tr key={order.order_id} className="group hover:bg-slate-50/50 transition-colors">
                      <td className="p-4">
                        <p className="font-medium text-slate-800">#{order.order_id}</p>
                      </td>
                      <td className="p-4">
                        <p className="text-sm text-slate-600">{order.customer_name}</p>
                      </td>
                      <td className="p-4">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-600 text-sm">
                          <Package className="w-3.5 h-3.5" />
                          {order.total_items || 0} items
                        </span>
                      </td>
                      <td className="p-4">
                        <p className="font-semibold text-slate-800">₹{order.total_amount}</p>
                      </td>
                      <td className="p-4">
                        <select
                          value={order.status}
                          onChange={(e) => {
                            if (confirm(`Update order #${order.order_id} status to ${e.target.value}?`)) {
                              updateStatus({
                                store_id,
                                order_id: order.order_id,
                                status: e.target.value as any,
                              });
                            }
                          }}
                          className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border-0 cursor-pointer transition-colors ${getStatusColor(order.status)}`}
                        >
                          {getStatusIcon(order.status)}
                          <option value="PLACED" className="bg-blue-100 text-blue-700">PLACED</option>
                          <option value="PREPARING" className="bg-yellow-100 text-yellow-700">PREPARING</option>
                          <option value="COMPLETED" className="bg-green-100 text-green-700">COMPLETED</option>
                        </select>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            onClick={() => router.push(`/orders/${store_id}/${order.order_id}`)}
                            className="p-2 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors group-hover:scale-105 transform duration-200"
                            title="View Order"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          {/* <button
                            onClick={() => router.push(`/orders/${store_id}/${order.order_id}/update`)}
                            className="p-2 rounded-lg bg-yellow-50 text-yellow-600 hover:bg-yellow-100 transition-colors group-hover:scale-105 transform duration-200"
                            title="Edit Order"
                          >
                            <Edit className="w-4 h-4" />
                          </button> */}
                          <button
                            onClick={() => {
                              if (confirm(`Are you sure you want to delete order #${order.order_id}?`)) {
                                deleteOrder({ store_id, order_id: order.order_id });
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
                    <td colSpan={6} className="p-12 text-center">
                      <div className="flex flex-col items-center gap-3">
                        <ShoppingBag className="w-12 h-12 text-slate-300" />
                        <p className="text-slate-500 font-medium">No orders found</p>
                        <p className="text-sm text-slate-400">
                          {searchTerm || statusFilter !== "ALL" 
                            ? 'Try adjusting your search or filters' 
                            : 'Create your first order for this store'}
                        </p>
                        {(searchTerm || statusFilter !== "ALL") ? (
                          <button
                            onClick={() => {
                              setSearchTerm("");
                              setStatusFilter("ALL");
                            }}
                            className="mt-2 text-blue-600 hover:text-blue-700 text-sm font-medium"
                          >
                            Clear filters
                          </button>
                        ) : (
                          <button
                            onClick={() => router.push(`/orders/${store_id}`)}
                            className="mt-2 inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 transition-colors"
                          >
                            <Plus className="w-4 h-4" />
                            Create Order
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
          {totalPages > 1 && (
            <div className="flex items-center justify-between border-t border-slate-100 px-6 py-4">
              <p className="text-sm text-slate-500">
                Page {page} of {totalPages} • {totalOrders} orders
              </p>
              <div className="flex gap-2">
                <button
                  onClick={() => setPage(Math.max(1, page - 1))}
                  disabled={page === 1}
                  className="p-2 rounded-lg border border-slate-200 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setPage(Math.min(totalPages, page + 1))}
                  disabled={page === totalPages}
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