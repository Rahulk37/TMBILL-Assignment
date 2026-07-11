"use client";

import { useTopItems } from "@/hooks/useAnalytics";

export default function TopItemsTable() {
  const { data, isLoading, error } =
    useTopItems();

  if (isLoading)
    return <p>Loading top items...</p>;

  if (error)
    return <p>Failed to load items.</p>;

  return (
    <div>
      <h2>Top 5 Selling Items</h2>

      <table>
        <thead>
          <tr>
            <th>Item</th>

            <th>Total Quantity</th>
          </tr>
        </thead>

        <tbody>
          {data?.data.map(
            (
              item: {
                itemId: string;
                totalQuantity: number;
              },
              index: number
            ) => (
              <tr key={index}>
                <td>{item.itemId}</td>

                <td>{item.totalQuantity}</td>
              </tr>
            )
          )}
        </tbody>
      </table>
    </div>
  );
}