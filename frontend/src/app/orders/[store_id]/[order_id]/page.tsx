"use client";

import { useParams, useRouter } from "next/navigation";

import { useOrder, useDeleteOrder } from "@/hooks/order/useOrder";

export default function OrderDetailsPage() {
  const router = useRouter();

  const { store_id, order_id } = useParams<{
    store_id: string;
    order_id: string;
  }>();

  const { data, isLoading } = useOrder({
    store_id,
    order_id,
  });

  const { mutate: deleteOrder } = useDeleteOrder();

  if (isLoading) {
    return <div className="p-8">Loading...</div>;
  }

  const order = data?.data;

  if (!order) {
    return <div className="p-8">Order not found</div>;
  }

  return (
    <div className="min-h-screen bg-slate-100 p-8">
      <div className="mx-auto max-w-5xl">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Order #{order.order_id}</h1>

            <p className="mt-2 text-slate-500">
              Customer : {order.customer_name}
            </p>
          </div>

          <div className="space-x-3">
            <button
              onClick={() =>
                router.push(`/orders/${store_id}/${order_id}/update`)
              }
              className="rounded bg-yellow-500 px-5 py-3 text-white"
            >
              Update
            </button>

            <button
              onClick={() =>
                deleteOrder(
                  {
                    store_id,
                    order_id,
                  },
                  {
                    onSuccess: () => router.push("/orders"),
                  },
                )
              }
              className="rounded bg-red-600 px-5 py-3 text-white"
            >
              Delete
            </button>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Info label="Store ID" value={order.store_id} />

          <Info label="Order ID" value={order.order_id} />

          <Info label="Customer" value={order.customer_name} />

          <Info label="Status" value={order.status} />

          <Info label="Total Items" value={order.total_items} />

          <Info label="Total Amount" value={`₹${order.total_amount}`} />
        </div>

        <div className="mt-8 rounded-xl bg-white shadow">
          <div className="border-b p-5">
            <h2 className="font-semibold">Items</h2>
          </div>

          <table className="w-full">
            <thead className="bg-slate-100">
              <tr>
                <th className="p-4 text-left">Item</th>

                <th className="p-4 text-left">Qty</th>
              </tr>
            </thead>

            <tbody>
              {order.items.map((item: any) => (
                <tr key={item.item_id} className="border-t">
                  <td className="p-4">{item.item_id}</td>

                  <td className="p-4">{item.qty}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function Info({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="rounded-xl bg-white p-6 shadow">
      <p className="text-sm text-slate-500">{label}</p>

      <p className="mt-2 text-xl font-semibold">{value}</p>
    </div>
  );
}
