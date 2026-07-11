"use client";

import { useParams, useRouter } from "next/navigation";

import useOrderStore from "@/store/order.store";
import { useDeleteOrder, useOrders, useUpdateOrderStatus } from "@/hooks/order/useOrder";




export default function StoreOrdersPage() {
  const router = useRouter();

  const { store_id } = useParams<{
    store_id: string;
  }>();

  const {
    page,
    limit,
    setPage,
  } = useOrderStore();

  const { data, isLoading } = useOrders({
    store_id,
    page,
    limit,
  });

  const { mutate: deleteOrder } =
    useDeleteOrder();

  const { mutate: updateStatus } =
    useUpdateOrderStatus();

  if (isLoading) {
    return <div className="p-8">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-slate-100 p-8">

      <div className="mx-auto max-w-7xl">

        <div className="mb-8 flex items-center justify-between">

          <div>

            <h1 className="text-3xl font-bold">
              Store Orders
            </h1>

            <p className="text-slate-500">
              Store ID : {store_id}
            </p>

          </div>
          <div className="flex gap-4"> 
          <button
            onClick={() =>
              router.push(
                `/stores`
              )
            }
            className="rounded-lg bg-blue-600 px-5 py-3 text-white"
          >
            Go Back
          </button>

          <button
            onClick={() =>
              router.push(
                `/orders/create?store_id=${store_id}`
              )
            }
            className="rounded-lg bg-blue-600 px-5 py-3 text-white"
          >
            + Create Order
          </button></div>

        </div>

        <div className="rounded-xl bg-white shadow">

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

                <th className="p-4 text-center">
                  Actions
                </th>

              </tr>

            </thead>

            <tbody>

              {data?.data?.map((order: any) => (

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

                    <select
                      value={order.status}
                      onChange={(e) =>
                        updateStatus({
                          store_id,
                          order_id:
                            order.order_id,
                          status:
                            e.target.value as any,
                        })
                      }
                      className="rounded border px-3 py-2"
                    >

                      <option>
                        PLACED
                      </option>

                      <option>
                        PREPARING
                      </option>

                      <option>
                        COMPLETED
                      </option>

                    </select>

                  </td>

                  <td className="space-x-2 text-center">

                    <button
                      onClick={() =>
                        router.push(
                          `/orders/${store_id}/${order.order_id}`
                        )
                      }
                      className="rounded bg-green-500 px-3 py-2 text-white"
                    >
                      View
                    </button>

                    <button
                      onClick={() =>
                        router.push(
                          `/orders/${store_id}/${order.order_id}/update`
                        )
                      }
                      className="rounded bg-yellow-500 px-3 py-2 text-white"
                    >
                      Update
                    </button>

                    <button
                      onClick={() =>
                        deleteOrder({
                          store_id,
                          order_id:
                            order.order_id,
                        })
                      }
                      className="rounded bg-red-500 px-3 py-2 text-white"
                    >
                      Delete
                    </button>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

        <div className="mt-6 flex justify-end gap-3">

          <button
            disabled={page === 1}
            onClick={() =>
              setPage(page - 1)
            }
            className="rounded border px-4 py-2"
          >
            Previous
          </button>

          <button
            disabled={
              page ===
              data?.pagination.totalPages
            }
            onClick={() =>
              setPage(page + 1)
            }
            className="rounded border px-4 py-2"
          >
            Next
          </button>

        </div>

      </div>

    </div>
  );
}