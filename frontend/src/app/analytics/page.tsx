"use client";

import { useState } from "react";
import {
  ShoppingBag,
  IndianRupee,
  Store,
  Trophy,
  Search,
  X,
  Calendar,
  TrendingUp,
  Package,
  Clock,
  CheckCircle,
} from "lucide-react";
import ArchiveButton from "@/components/analytics/ArchiveButton";
import DashboardCards from "@/components/dashboard/DashboardCards";
import OrdersChart from "@/components/analytics/charts/OrdersChart";
import RevenueChart from "@/components/analytics/charts/RevenueChart";
import TopItemsChart from "@/components/analytics/charts/TopItemsChart";
import OrdersPerDayTable from "@/components/analytics/OrdersPerDayTable";
import RevenueTable from "@/components/analytics/RevenueTable";
import TopItemsTable from "@/components/analytics/TopItemsTable";
import { useOrders } from "@/hooks/order/useOrder";

export default function AnalyticsPage() {
  const [storeId, setStoreId] = useState("");
  const [limit, setLimit] = useState(10);

  const { data, isLoading } = useOrders({
    store_id: storeId,
    page: 1,
    limit,
  });

  const orders = data?.data?.orders ?? [];

  // Calculate analytics from orders data
  const totalRevenue = orders.reduce(
    (sum: number, order: any) => sum + order.total_amount,
    0,
  );

  const totalOrders = orders.length;

  // Unique stores from orders
  const uniqueStores = [...new Set(orders.map((o: any) => o.store_id))];

  // Order status counts
  const placed = orders.filter((o: any) => o.status === "PLACED").length;
  const preparing = orders.filter((o: any) => o.status === "PREPARING").length;
  const completed = orders.filter((o: any) => o.status === "COMPLETED").length;

  // Calculate items sold
  const itemsSold = orders.reduce(
    (sum: number, order: any) => sum + (order.total_items || 0),
    0,
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30 p-8">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-sm p-6 mb-8 border border-slate-100">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-slate-800">
                Analytics Dashboard
              </h1>
              <p className="mt-1 text-slate-500">
                Monitor orders, revenue and store performance
              </p>
            </div>
            <ArchiveButton />
          </div>

          {/* Filters */}
          <div className="mt-6 flex flex-wrap gap-4">
            <div className="relative flex-1 min-w-[200px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                value={storeId}
                onChange={(e) => setStoreId(e.target.value)}
                placeholder="Filter by Store ID"
                className="w-full pl-9 pr-4 py-2.5 rounded-lg border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
              />
              {storeId && (
                <button
                  onClick={() => setStoreId("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            <select
              value={limit}
              onChange={(e) => setLimit(Number(e.target.value))}
              className="px-4 py-2.5 rounded-lg border border-slate-200 bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
            >
              <option value={5}>5 per page</option>
              <option value={10}>10 per page</option>
              <option value={20}>20 per page</option>
              <option value={50}>50 per page</option>
            </select>

            <div className="ml-auto flex items-center gap-2 text-sm text-slate-500 bg-slate-50 px-4 py-2.5 rounded-lg">
              <Package className="w-4 h-4" />
              {isLoading ? "Loading..." : `${totalOrders} Orders`}
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
          <div className="bg-white rounded-xl p-5 shadow-sm border border-slate-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">
                  Total Orders
                </p>
                <p className="mt-1 text-2xl font-bold text-slate-800">
                  {totalOrders}
                </p>
              </div>
              <div className="rounded-xl bg-blue-50 p-3">
                <ShoppingBag className="w-5 h-5 text-blue-600" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl p-5 shadow-sm border border-slate-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">
                  Total Revenue
                </p>
                <p className="mt-1 text-2xl font-bold text-emerald-600">
                  ₹{totalRevenue.toLocaleString()}
                </p>
              </div>
              <div className="rounded-xl bg-emerald-50 p-3">
                <IndianRupee className="w-5 h-5 text-emerald-600" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl p-5 shadow-sm border border-slate-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">
                  Active Stores
                </p>
                <p className="mt-1 text-2xl font-bold text-slate-800">
                  {uniqueStores.length}
                </p>
              </div>
              <div className="rounded-xl bg-purple-50 p-3">
                <Store className="w-5 h-5 text-purple-600" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl p-5 shadow-sm border border-slate-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">Items Sold</p>
                <p className="mt-1 text-2xl font-bold text-slate-800">
                  {itemsSold}
                </p>
              </div>
              <div className="rounded-xl bg-orange-50 p-3">
                <Trophy className="w-5 h-5 text-orange-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Order Status Quick View */}
        <div className="grid gap-4 md:grid-cols-3 mb-8">
          <div className="bg-white rounded-xl p-4 shadow-sm border-l-4 border-blue-500">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Package className="w-5 h-5 text-blue-500" />
                <span className="text-sm font-medium text-slate-600">
                  Placed
                </span>
              </div>
              <span className="text-xl font-bold text-slate-800">{placed}</span>
            </div>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm border-l-4 border-yellow-500">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-yellow-500" />
                <span className="text-sm font-medium text-slate-600">
                  Preparing
                </span>
              </div>
              <span className="text-xl font-bold text-slate-800">
                {preparing}
              </span>
            </div>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm border-l-4 border-green-500">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span className="text-sm font-medium text-slate-600">
                  Completed
                </span>
              </div>
              <span className="text-xl font-bold text-slate-800">
                {completed}
              </span>
            </div>
          </div>
        </div>

        {/* Dashboard Cards Component */}
        <div className="mb-8">
          <DashboardCards />
        </div>

        {/* Charts */}
        <div className="grid gap-6 xl:grid-cols-2 mb-8">
          <OrdersChart />
          <RevenueChart />
        </div>

        <div className="mb-8">
          <TopItemsChart />
        </div>

        {/* Tables */}
        <div className="grid gap-6 xl:grid-cols-2 mb-8">
          <OrdersPerDayTable />
          <RevenueTable />
        </div>

        <TopItemsTable />
      </div>
    </div>
  );
}
