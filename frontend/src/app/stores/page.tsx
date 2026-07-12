"use client";

import { useRouter } from "next/navigation";
import { useDeleteStore, useStores } from "@/hooks/store/useCreateStore";
import useStoreStore from "@/store/store.store";
import {
  Plus,
  Eye,
  Edit,
  Trash2,
  Package,
  Store,
  Search,
  ChevronLeft,
  ChevronRight,
  MoreVertical,
} from "lucide-react";
import { useState } from "react";
import { useOrders } from "@/hooks/order/useOrder";

export default function StoresPage() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");

  const { page, limit, setPage } = useStoreStore();

  const { data, isLoading } = useStores(page, limit);
  const { mutate: deleteStore } = useDeleteStore();

  const totalPages = data?.data?.pagination?.totalPages ?? 1;
  const stores = data?.data?.stores || [];

   const { data: orderData } = useOrders({
  store_id: "",
  page,
  limit,
});

  console.log("orderData21", orderData);
  // Filter stores based on search
  const filteredStores = stores.filter(
    (store: any) =>
      store.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      store.store_id.toString().includes(searchTerm) ||
      store.address.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/30 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-slate-600 font-medium">Loading stores...</p>
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
            <h1 className="text-3xl font-bold text-slate-800">Stores</h1>
            <p className="text-slate-500 mt-1">
              Manage your store locations and settings
            </p>
          </div>
          <button
            onClick={() => router.push("/stores/create")}
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-3 text-white font-semibold hover:shadow-lg hover:shadow-blue-500/30 transition-all duration-200 hover:scale-105"
          >
            <Plus className="w-5 h-5" />
            Create New Store
          </button>
        </div>

        {/* Stats */}
        <div className="grid gap-4 md:grid-cols-3 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">
                  Total Stores
                </p>
                <p className="mt-2 text-3xl font-bold text-slate-800">
                  {stores.length}
                </p>
              </div>
              <div className="rounded-xl bg-blue-50 p-3">
                <Store className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">
                  Active Stores
                </p>
                <p className="mt-2 text-3xl font-bold text-slate-800">
                  {stores.filter((s: any) => s.is_active !== false).length}
                </p>
              </div>
              <div className="rounded-xl bg-emerald-50 p-3">
                <div className="w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center">
                  <span className="text-white text-xs font-bold">✓</span>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">
                  Total Orders
                </p>
                <p className="mt-2 text-3xl font-bold text-slate-800">{orderData?.data?.orders?.length ?? 0}</p>
              </div>
              <div className="rounded-xl bg-purple-50 p-3">
                <Package className="w-6 h-6 text-purple-600" />
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
                placeholder="Search stores by name, ID, or address..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-lg border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
              />
            </div>
            <div className="flex gap-2">
              <select className="px-4 py-3 rounded-lg border border-slate-200 bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all">
                <option value="10">10 per page</option>
                <option value="25">25 per page</option>
                <option value="50">50 per page</option>
                <option value="100">100 per page</option>
              </select>
            </div>
          </div>
        </div>

        {/* Stores Table */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50/80">
                <tr>
                  <th className="p-4 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                    Store
                  </th>
                  <th className="p-4 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                    Address
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
                {filteredStores.length > 0 ? (
                  filteredStores.map((store: any) => (
                    <tr
                      key={store.store_id}
                      className="group hover:bg-slate-50/50 transition-colors"
                    >
                      <td className="p-4">
                        <div>
                          <p className="font-semibold text-slate-800">
                            {store.name}
                          </p>
                          <p className="text-xs text-slate-400">
                            ID: {store.store_id}
                          </p>
                        </div>
                      </td>
                      <td className="p-4">
                        <p className="text-sm text-slate-600">
                          {store.address}
                        </p>
                      </td>
                      <td className="p-4">
                        <span
                          className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
                            store.is_active !== false
                              ? "bg-emerald-100 text-emerald-700"
                              : "bg-red-100 text-red-700"
                          }`}
                        >
                          <span
                            className={`w-1.5 h-1.5 rounded-full mr-1.5 ${
                              store.is_active !== false
                                ? "bg-emerald-500"
                                : "bg-red-500"
                            }`}
                          />
                          {store.is_active !== false ? "Active" : "Inactive"}
                        </span>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            onClick={() =>
                              router.push(`/stores/${store.store_id}`)
                            }
                            className="p-2 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors group-hover:scale-105 transform duration-200"
                            title="View Store"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() =>
                              router.push(`/stores/${store.store_id}/update`)
                            }
                            className="p-2 rounded-lg bg-yellow-50 text-yellow-600 hover:bg-yellow-100 transition-colors group-hover:scale-105 transform duration-200"
                            title="Edit Store"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() =>
                              router.push(`/stores/${store.store_id}/orders`)
                            }
                            className="p-2 rounded-lg bg-purple-50 text-purple-600 hover:bg-purple-100 transition-colors group-hover:scale-105 transform duration-200"
                            title="View Orders"
                          >
                            <Package className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => {
                              if (
                                confirm(
                                  `Are you sure you want to delete "${store.name}"?`,
                                )
                              ) {
                                deleteStore(store.store_id);
                              }
                            }}
                            className="p-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition-colors group-hover:scale-105 transform duration-200"
                            title="Delete Store"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4} className="p-12 text-center">
                      <div className="flex flex-col items-center gap-3">
                        <Store className="w-12 h-12 text-slate-300" />
                        <p className="text-slate-500 font-medium">
                          No stores found
                        </p>
                        <p className="text-sm text-slate-400">
                          {searchTerm
                            ? "Try adjusting your search"
                            : "Create your first store to get started"}
                        </p>
                        {!searchTerm && (
                          <button
                            onClick={() => router.push("/stores/create")}
                            className="mt-2 inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 transition-colors"
                          >
                            <Plus className="w-4 h-4" />
                            Create Store
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
                Page {page} of {totalPages}
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
