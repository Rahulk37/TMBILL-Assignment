"use client";

import { useOrders } from "@/hooks/order/useOrder";
import { useStores } from "@/hooks/store/useCreateStore";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const router = useRouter();

  const { data: stores } = useStores(1, 100);

  const { data: orders } = useOrders({
    store_id: "",
    page: 1,
    limit: 100,
  });
  console.log("DashboardPage", stores,orders);
  const allStores = stores?.data?.stores ?? [];
  const allOrders = orders?.data ?? [];

  const totalRevenue = allOrders.reduce(
    (sum: number, order: any) => sum + order.total_amount,
    0,
  );

  const completed = allOrders.filter(
    (o: any) => o.status === "COMPLETED",
  ).length;

  const preparing = allOrders.filter(
    (o: any) => o.status === "PREPARING",
  ).length;

  const placed = allOrders.filter((o: any) => o.status === "PLACED").length;

  return (
    <div className="min-h-screen bg-slate-100 p-8">
      <div className="mx-auto max-w-7xl">
        <h1 className="mb-8 text-3xl font-bold">Dashboard</h1>

        {/* Cards */}

        <div className="grid gap-6 md:grid-cols-4">
          <Card title="Stores" value={allStores.length} />

          <Card title="Orders" value={allOrders.length} />

          <Card title="Revenue" value={`₹${totalRevenue}`} />

          <Card title="Completed" value={completed} />
        </div>

        {/* Stores */}

        <div className="mt-8 rounded-xl bg-white shadow">
          <div className="flex justify-between border-b p-5">
            <h2 className="font-semibold">Recent Stores</h2>

            <button
              onClick={() => router.push("/stores")}
              className="text-blue-600"
            >
              View All
            </button>
          </div>

          <table className="w-full">
            <thead className="bg-slate-100">
              <tr>
                <th className="p-4 text-left">Store ID</th>

                <th className="p-4 text-left">Name</th>

                <th className="p-4 text-left">Address</th>
              </tr>
            </thead>

            <tbody>
              {allStores.slice(0, 5).map((store: any) => (
                <tr key={store.store_id} className="border-t">
                  <td className="p-4">{store.store_id}</td>

                  <td className="p-4">{store.name}</td>

                  <td className="p-4">{store.address}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Orders */}

        <div className="mt-8 rounded-xl bg-white shadow">
          <div className="flex justify-between border-b p-5">
            <h2 className="font-semibold">Recent Orders</h2>

            <button
              onClick={() => router.push("/orders")}
              className="text-blue-600"
            >
              View All
            </button>
          </div>

          <table className="w-full">
            <thead className="bg-slate-100">
              <tr>
                <th className="p-4 text-left">Order</th>

                <th className="p-4 text-left">Customer</th>

                <th className="p-4 text-left">Amount</th>

                <th className="p-4 text-left">Status</th>
              </tr>
            </thead>

            <tbody>
              {allOrders.slice(0, 5).map((order: any) => (
                <tr key={order.order_id} className="border-t">
                  <td className="p-4">{order.order_id}</td>

                  <td className="p-4">{order.customer_name}</td>

                  <td className="p-4">₹{order.total_amount}</td>

                  <td className="p-4">{order.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function Card({ title, value }: { title: string; value: string | number }) {
  return (
    <div className="rounded-xl bg-white p-6 shadow">
      <h2 className="text-sm text-slate-500">{title}</h2>

      <p className="mt-3 text-3xl font-bold">{value}</p>
    </div>
  );
}
