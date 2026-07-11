import DashboardCards from "@/components/dashboard/DashboardCards";
import RecentActivity from "@/components/dashboard/RecentActivity";
import RecentOrders from "@/components/dashboard/RecentOrders";
import Link from "next/link";

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">
            Dashboard
          </h1>

          <p className="mt-2 text-slate-500">
            Welcome back! Here's an overview of your stores.
          </p>
        </div>

        <Link
          href="/create-order"
          className="rounded-xl bg-blue-600 px-5 py-3 font-medium text-white hover:bg-blue-700"
        >
          + Create Order
        </Link>
      </div>

      <DashboardCards />

      <div className="grid gap-6 lg:grid-cols-2">
        <RecentOrders />

        <RecentActivity />
      </div>
    </div>
  );
}