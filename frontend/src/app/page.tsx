"use client";

import { useOrders } from "@/hooks/order/useOrder";
import { useStores } from "@/hooks/store/useCreateStore";
import { useRouter } from "next/navigation";
import { 
  ShoppingBag, 
  Store, 
  TrendingUp, 
  CheckCircle, 
  Plus,
  ArrowRight,
  Package,
  Clock,
  AlertCircle
} from "lucide-react";

export default function DashboardPage() {
  const router = useRouter();

  const { data: stores } = useStores(1, 100);
  const { data: orders } = useOrders({
    store_id: "",
    page: 1,
    limit: 100,
  });

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

  if (allStores.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center p-8">
        <div className="w-full max-w-lg rounded-2xl bg-white/80 backdrop-blur-sm p-12 text-center shadow-xl border border-white/20">
          <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Store className="w-10 h-10 text-white" />
          </div>
          <h1 className="mb-3 text-3xl font-bold text-slate-800">Welcome to Your Dashboard</h1>
          <p className="mb-2 text-slate-600 text-lg">
            Get started by creating your first store
          </p>
          <p className="mb-8 text-sm text-slate-500">
            Manage orders, track revenue, and grow your business
          </p>
          <button
            onClick={() => router.push("/stores")}
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 px-8 py-4 text-white font-semibold hover:shadow-lg hover:shadow-blue-500/30 transition-all duration-200 hover:scale-105"
          >
            <Plus className="w-5 h-5" />
            Create Your First Store
          </button>
        </div>
      </div>
    );
  }

  const stats = [
    {
      title: "Total Stores",
      value: allStores.length,
      icon: Store,
      color: "from-blue-500 to-blue-600",
      bgColor: "bg-blue-50",
      textColor: "text-blue-600"
    },
    {
      title: "Total Orders",
      value: allOrders.length,
      icon: ShoppingBag,
      color: "from-purple-500 to-purple-600",
      bgColor: "bg-purple-50",
      textColor: "text-purple-600"
    },
    {
      title: "Revenue",
      value: `₹${totalRevenue.toLocaleString()}`,
      icon: TrendingUp,
      color: "from-emerald-500 to-emerald-600",
      bgColor: "bg-emerald-50",
      textColor: "text-emerald-600"
    },
    {
      title: "Completed Orders",
      value: completed,
      icon: CheckCircle,
      color: "from-green-500 to-green-600",
      bgColor: "bg-green-50",
      textColor: "text-green-600"
    },
  ];

  const getStatusColor = (status: string) => {
    switch(status) {
      case "COMPLETED": return "bg-green-100 text-green-700";
      case "PREPARING": return "bg-yellow-100 text-yellow-700";
      case "PLACED": return "bg-blue-100 text-blue-700";
      default: return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30 p-8">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-800">Dashboard</h1>
            <p className="text-slate-500 mt-1">Welcome back! Here's what's happening with your business.</p>
          </div>
          <button
            onClick={() => router.push("/stores")}
            className="mt-4 md:mt-0 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-3 text-white font-semibold hover:shadow-lg hover:shadow-blue-500/30 transition-all duration-200 hover:scale-105"
          >
            <Plus className="w-5 h-5" />
            Add New Store
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
          {stats.map((stat) => (
            <div
              key={stat.title}
              className="group relative overflow-hidden rounded-2xl bg-white p-6 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-500">{stat.title}</p>
                  <p className="mt-2 text-3xl font-bold text-slate-800">{stat.value}</p>
                </div>
                <div className={`rounded-xl ${stat.bgColor} p-3 group-hover:scale-110 transition-transform duration-300`}>
                  <stat.icon className={`w-6 h-6 ${stat.textColor}`} />
                </div>
              </div>
              <div className={`absolute bottom-0 left-0 h-1 bg-gradient-to-r ${stat.color} w-0 group-hover:w-full transition-all duration-300`} />
            </div>
          ))}
        </div>

        {/* Order Status Quick View */}
        <div className="grid gap-4 md:grid-cols-3 mb-8">
          <div className="bg-white rounded-xl p-4 shadow-sm border-l-4 border-yellow-500">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-yellow-500" />
                <span className="text-sm font-medium text-slate-600">Preparing</span>
              </div>
              <span className="text-xl font-bold text-slate-800">{preparing}</span>
            </div>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm border-l-4 border-blue-500">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Package className="w-5 h-5 text-blue-500" />
                <span className="text-sm font-medium text-slate-600">Placed</span>
              </div>
              <span className="text-xl font-bold text-slate-800">{placed}</span>
            </div>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm border-l-4 border-green-500">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span className="text-sm font-medium text-slate-600">Completed</span>
              </div>
              <span className="text-xl font-bold text-slate-800">{completed}</span>
            </div>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Recent Stores */}
          <div className="bg-white rounded-2xl shadow-sm overflow-hidden hover:shadow-lg transition-shadow duration-300">
            <div className="flex items-center justify-between border-b border-slate-100 p-6">
              <div>
                <h2 className="text-lg font-semibold text-slate-800">Recent Stores</h2>
                <p className="text-sm text-slate-500">Your latest store additions</p>
              </div>
              <button
                onClick={() => router.push("/stores")}
                className="inline-flex items-center gap-1 text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors"
              >
                View All
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-50/80">
                  <tr>
                    <th className="p-4 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Store</th>
                    <th className="p-4 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Address</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {allStores.slice(0, 5).map((store: any) => (
                    <tr key={store.store_id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="p-4">
                        <div>
                          <p className="font-medium text-slate-800">{store.name}</p>
                          <p className="text-xs text-slate-400">#{store.store_id}</p>
                        </div>
                      </td>
                      <td className="p-4 text-sm text-slate-600">{store.address}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Recent Orders */}
          <div className="bg-white rounded-2xl shadow-sm overflow-hidden hover:shadow-lg transition-shadow duration-300">
            <div className="flex items-center justify-between border-b border-slate-100 p-6">
              <div>
                <h2 className="text-lg font-semibold text-slate-800">Recent Orders</h2>
                <p className="text-sm text-slate-500">Latest customer orders</p>
              </div>
              <button
                onClick={() => router.push("/orders")}
                className="inline-flex items-center gap-1 text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors"
              >
                View All
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-50/80">
                  <tr>
                    <th className="p-4 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Order</th>
                    <th className="p-4 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Customer</th>
                    <th className="p-4 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Amount</th>
                    <th className="p-4 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {allOrders.slice(0, 5).map((order: any) => (
                    <tr key={order.order_id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="p-4">
                        <p className="font-medium text-slate-800">#{order.order_id}</p>
                      </td>
                      <td className="p-4 text-sm text-slate-600">{order.customer_name}</td>
                      <td className="p-4 font-medium text-slate-800">₹{order.total_amount}</td>
                      <td className="p-4">
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(order.status)}`}>
                          {order.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}