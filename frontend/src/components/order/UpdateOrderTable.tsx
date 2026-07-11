"use client";

import { useState } from "react";

import { useOrders } from "@/hooks/useOrders";
import { useUpdateOrder } from "@/hooks/useUpdateOrder";

import useOrderStore from "@/store/order.store";

import StatusDropdown from "./StatusDropdown";

export default function UpdateOrderTable() {
  const {
    selectedStore,
    page,
    limit,
  } = useOrderStore();

  const { data } = useOrders(
    selectedStore,
    page,
    limit
  );

  const { mutate } = useUpdateOrder();

  const [statusMap, setStatusMap] = useState<
    Record<string, string>
  >({});

  return (
    <table>
      <thead>
        <tr>
          <th>Store</th>
          <th>Status</th>
          <th>Action</th>
        </tr>
      </thead>

      <tbody>
        {data?.data.map((order) => (
          <tr key={order._id}>
            <td>{order.store_id}</td>

            <td>
              <StatusDropdown
                value={
                  (statusMap[order._id] ||
                    order.status) as any
                }
                onChange={(status) =>
                  setStatusMap((prev) => ({
                    ...prev,
                    [order._id]: status,
                  }))
                }
              />
            </td>

            <td>
              <button
                onClick={() =>
                  mutate({
                    id: order._id,
                    status:
                      (statusMap[
                        order._id
                      ] ||
                        order.status) as any,
                  })
                }
              >
                Update
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}