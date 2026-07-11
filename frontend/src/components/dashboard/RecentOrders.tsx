export default function RecentOrders() {
  const orders = [
    {
      id: "ORD-1001",
      store: "Store A",
      amount: "₹550",
    },
    {
      id: "ORD-1002",
      store: "Store B",
      amount: "₹900",
    },
    {
      id: "ORD-1003",
      store: "Store C",
      amount: "₹1200",
    },
  ];

  return (
    <div className="rounded-2xl border bg-white p-6 shadow-sm">
      <h2 className="text-xl font-semibold">
        Recent Orders
      </h2>

      <div className="mt-5 space-y-4">
        {orders.map((order) => (
          <div
            key={order.id}
            className="flex items-center justify-between rounded-lg bg-slate-50 p-4"
          >
            <div>
              <h4 className="font-semibold">
                {order.id}
              </h4>

              <p className="text-sm text-slate-500">
                {order.store}
              </p>
            </div>

            <span className="font-bold text-green-600">
              {order.amount}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}