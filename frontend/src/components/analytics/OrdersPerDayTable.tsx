"use client";

import { useOrdersPerDay } from "@/hooks/useAnalytics";

export default function OrdersPerDayTable() {
  const { data, isLoading, error } = useOrdersPerDay();

  if (isLoading) return <p>Loading orders per day...</p>;

  if (error) return <p>Failed to load data.</p>;

  return (
    <div>
      <h2>Orders Per Day</h2>

      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Total Orders</th>
          </tr>
        </thead>

        <tbody>
          {data?.data.map(
            (
              item: {
                date: string;
                totalOrders: number;
              },
              index: number
            ) => (
              <tr key={index}>
                <td>{item.date}</td>

                <td>{item.totalOrders}</td>
              </tr>
            )
          )}
        </tbody>
      </table>
    </div>
  );
}