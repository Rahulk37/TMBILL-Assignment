"use client";

import { useOrders } from "@/hooks/order/useOrder";
import { useStore } from "@/hooks/store/useCreateStore";

import { useParams, useRouter } from "next/navigation";



export default function StoreDetailsPage() {
  const router = useRouter();

  const { store_id } = useParams<{
    store_id: string;
  }>();

  const { data: storeData, isLoading } =
    useStore(store_id);

  const { data: orderData } = useOrders({
    store_id,
    page: 1,
    limit: 100,
  });

  if (isLoading) {
    return <div className="p-8">Loading...</div>;
  }

  const store = storeData?.data;

  const orders = orderData?.data ?? [];

  const totalRevenue = orders.reduce(
    (sum: number, order: any) =>
      sum + order.total_amount,
    0
  );

  const placed = orders.filter(
    (o: any) => o.status === "PLACED"
  ).length;

  const preparing = orders.filter(
    (o: any) => o.status === "PREPARING"
  ).length;

  const completed = orders.filter(
    (o: any) => o.status === "COMPLETED"
  ).length;

  return (
    <div className="min-h-screen bg-slate-100 p-8">

      <div className="mx-auto max-w-7xl">

        <div className="mb-8 flex justify-between">

          <div>

            <h1 className="text-3xl font-bold">
              {store.name}
            </h1>

            <p className="text-slate-500">
              {store.address}
            </p>

            <p className="mt-2 text-sm">
              Store ID : {store.store_id}
            </p>

          </div>

          <button
            onClick={() =>
              router.push(
                `/stores`
              )
            }
            className="rounded-lg bg-blue-600 px-5 py-3 text-white"
          >
            Store
          </button>

        </div>

        {/* Cards */}

        <div className="mb-8 grid gap-6 md:grid-cols-4">

          <Card
            title="Orders"
            value={orders.length}
          />

          <Card
            title="Revenue"
            value={`₹${totalRevenue}`}
          />

          <Card
            title="Preparing"
            value={preparing}
          />

          <Card
            title="Completed"
            value={completed}
          />

        </div>

        <div className="rounded-xl bg-white shadow">

          <div className="border-b p-5 flex justify-between">

            <h2 className="font-semibold">
              Recent Orders
            </h2>

            <button
              onClick={() =>
                router.push(
                  `/stores/${store.store_id}/orders`
                )
              }
              className="rounded bg-blue-600 px-4 py-2 text-white"
            >
              View All
            </button>

          </div>

          <table className="w-full">

            <thead className="bg-slate-100">

              <tr>

                <th className="p-4 text-left">
                  Order
                </th>

                <th className="p-4 text-left">
                  Customer
                </th>

                <th className="p-4 text-left">
                  Items
                </th>

                <th className="p-4 text-left">
                  Amount
                </th>

                <th className="p-4 text-left">
                  Status
                </th>

              </tr>

            </thead>

            <tbody>

              {orders.slice(0, 5).map((order: any) => (

                <tr
                  key={order.order_id}
                  className="border-t"
                >

                  <td className="p-4">
                    {order.order_id}
                  </td>

                  <td className="p-4">
                    {order.customer_name}
                  </td>

                  <td className="p-4">
                    {order.total_items}
                  </td>

                  <td className="p-4">
                    ₹{order.total_amount}
                  </td>

                  <td className="p-4">
                    {order.status}
                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
}

function Card({
  title,
  value,
}: {
  title: string;
  value: string | number;
}) {
  return (
    <div className="rounded-xl bg-white p-6 shadow">

      <h2 className="text-sm text-slate-500">
        {title}
      </h2>

      <p className="mt-3 text-3xl font-bold">
        {value}
      </p>

    </div>
  );
}