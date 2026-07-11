import ArchiveButton from "@/components/analytics/ArchiveButton";

import OrdersChart from "@/components/analytics/charts/OrdersChart";
import RevenueChart from "@/components/analytics/charts/RevenueChart";
import TopItemsChart from "@/components/analytics/charts/TopItemsChart";

import OrdersPerDayTable from "@/components/analytics/OrdersPerDayTable";
import RevenueTable from "@/components/analytics/RevenueTable";
import TopItemsTable from "@/components/analytics/TopItemsTable";
import DashboardCards from "@/components/dashboard/DashboardCards";

export default function AnalyticsPage() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">
            Analytics Dashboard
          </h1>

          <p className="mt-2 text-slate-500">
            View order analytics, revenue insights and archive old orders.
          </p>
        </div>

        <ArchiveButton />
      </div>

      {/* NEW */}
      <DashboardCards />

      {/* NEW */}
      <div className="grid gap-6 xl:grid-cols-2">
        <OrdersChart />
        <RevenueChart />
      </div>

      {/* NEW */}
      <TopItemsChart />

      {/* EXISTING */}
      <div className="grid gap-6 xl:grid-cols-2">
        <OrdersPerDayTable />
        <RevenueTable />
      </div>

      {/* EXISTING */}
      <TopItemsTable />
    </div>
  );
}