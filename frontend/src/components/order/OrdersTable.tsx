"use client";
import Pagination from "@/components/common/Pagination";
import { Order } from "@/types/order";
import { useOrders } from "@/hooks/useOrders";
import useOrderStore from "@/store/order.store";
import useSocket from "@/hooks/useSocket";
export default function OrdersTable() {
  useSocket();
  const { selectedStore, page, limit } = useOrderStore();

  const { data, isLoading, error } = useOrders(selectedStore, page, limit);

  if (isLoading) return <p>Loading...</p>;

  if (error) return <p>Something went wrong.</p>;

  return (
    <>
      <table>
        <thead>
          <tr>
            <th>Store</th>
            <th>Total</th>
            <th>Status</th>
            <th>Created</th>
          </tr>
        </thead>

        <tbody>
          {data?.data.map((order: Order) => (
            <tr key={order._id}>
              <td>{order.store_id}</td>

              <td>₹{order.total_amount}</td>

              <td>{order.status}</td>

              <td>{new Date(order.created_at).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination totalPages={data?.pagination.totalPages ?? 0} />
    </>
  );
}
