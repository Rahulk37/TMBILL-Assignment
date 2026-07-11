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
            className="h-36 animate-pulse rounded-2xl bg-white"
          />
        ))}
      </div>
    );
  }

  const totalOrders =
    ordersPerDay.data?.data.reduce(
      (sum: number, item: any) =>
        sum + item.totalOrders,
      0
    ) ?? 0;

  const totalRevenue =
    revenue.data?.data.reduce(
      (sum: number, item: any) =>
        sum + item.totalRevenue,
      0
    ) ?? 0;

  const totalStores =
    revenue.data?.data.length ?? 0;

  const topItem =
    topItems.data?.data[0]?.itemId ?? "--";

  const cards = [
    {
      title: "Total Orders",
      value: totalOrders,
      icon: ShoppingCart,
      color: "bg-blue-100 text-blue-700",
    },
    {
      title: "Revenue",
      value: `₹${totalRevenue.toLocaleString()}`,
      icon: IndianRupee,
      color: "bg-green-100 text-green-700",
    },
    {
      title: "Stores",
      value: totalStores,
      icon: Store,
      color: "bg-orange-100 text-orange-700",
    },
    {
      title: "Top Item",
      value: topItem,
      icon: Trophy,
      color: "bg-purple-100 text-purple-700",
    },
  ];

  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <div
            key={card.title}
            className="rounded-2xl border bg-white p-6 shadow-sm"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-500">
                  {card.title}
                </p>

                <h2 className="mt-3 text-3xl font-bold">
                  {card.value}
                </h2>
              </div>

              <div
                className={`rounded-xl p-4 ${card.color}`}
              >
                <Icon size={28} />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}