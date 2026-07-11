"use client";

import { useRevenuePerStore } from "@/hooks/useAnalytics";

export default function RevenueTable() {
  const { data, isLoading, error } =
    useRevenuePerStore();

  if (isLoading)
    return <p>Loading revenue...</p>;

  if (error)
    return <p>Failed to load revenue.</p>;

  return (
    <div>
      <h2>Revenue Per Store</h2>

      <table>
        <thead>
          <tr>
            <th>Store</th>

            <th>Total Revenue</th>
          </tr>
        </thead>

        <tbody>
          {data?.data.map(
            (
              item: {
                storeId: string;
                totalRevenue: number;
              },
              index: number
            ) => (
              <tr key={index}>
                <td>{item.storeId}</td>

                <td>
                  ₹{item.totalRevenue}
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>
    </div>
  );
}