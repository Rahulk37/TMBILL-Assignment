"use client";

import {
  ShoppingCart,
  IndianRupee,
  Store,
  Trophy,
} from "lucide-react";
import { useDashboard } from "@/hooks/useDashboard";

export default function DashboardCards() {
  const {
    ordersPerDay,
    revenue,
    topItems,
  } = useDashboard();

  if (
    ordersPerDay.isLoading ||
    revenue.isLoading ||
    topItems.isLoading
  ) {
    return (
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="h-36 animate-pulse rounded-2xl bg-white shadow-sm"
          />
        ))}
      </div>
    );
  }

  const totalOrders =
    ordersPerDay.data?.data.reduce(
      (sum: number, item: any) => sum + item.totalOrders,
      0
    ) ?? 0;

  const totalRevenue =
    revenue.data?.data.reduce(
      (sum: number, item: any) => sum + item.totalRevenue,
      0
    ) ?? 0;

  const totalStores = revenue.data?.data.length ?? 0;

  const topItem = topItems.data?.data[0]?.itemId ?? "--";

  const cards = [
    {
      title: "Total Orders",
      value: totalOrders.toLocaleString(),
      icon: ShoppingCart,
      color: "bg-blue-50 text-blue-600",
      gradient: "from-blue-500 to-blue-600",
    },
    {
      title: "Revenue",
      value: `₹${totalRevenue.toLocaleString()}`,
      icon: IndianRupee,
      color: "bg-emerald-50 text-emerald-600",
      gradient: "from-emerald-500 to-emerald-600",
    },
    {
      title: "Stores",
      value: totalStores,
      icon: Store,
      color: "bg-purple-50 text-purple-600",
      gradient: "from-purple-500 to-purple-600",
    },
    {
      title: "Top Item",
      value: topItem,
      icon: Trophy,
      color: "bg-orange-50 text-orange-600",
      gradient: "from-orange-500 to-orange-600",
    },
  ];

  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
      {cards.map((card) => {
        const Icon = card.icon;
        return (
          <div
            key={card.title}
            className="group relative overflow-hidden rounded-2xl bg-white p-6 shadow-sm border border-slate-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">
                  {card.title}
                </p>
                <h2 className="mt-2 text-3xl font-bold text-slate-800">
                  {card.value}
                </h2>
              </div>
              <div className={`rounded-xl ${card.color} p-3 group-hover:scale-110 transition-transform duration-300`}>
                <Icon size={28} />
              </div>
            </div>
            <div className={`absolute bottom-0 left-0 h-1 bg-gradient-to-r ${card.gradient} w-0 group-hover:w-full transition-all duration-300`} />
          </div>
        );
      })}
    </div>
  );
}