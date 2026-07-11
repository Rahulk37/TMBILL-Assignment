import ArchiveButton from "@/components/analytics/ArchiveButton";

import OrdersPerDayTable from "@/components/analytics/OrdersPerDayTable";

import RevenueTable from "@/components/analytics/RevenueTable";

import TopItemsTable from "@/components/analytics/TopItemsTable";

export default function AnalyticsPage() {
  return (
    <>
      <h1>Analytics Dashboard</h1>

      <ArchiveButton />

      <OrdersPerDayTable />

      <RevenueTable />

      <TopItemsTable />
    </>
  );
}