"use client";

import { useOrders } from "@/hooks/order/useOrder";
import { useStore } from "@/hooks/store/useCreateStore";
import { useParams, useRouter } from "next/navigation";
import { 
  ArrowLeft, 
  ShoppingBag, 
  TrendingUp, 
  Clock, 
  CheckCircle,
  Package,
  Store,
  MapPin,
  Calendar,
  Eye,
  Edit,
  MoreVertical
} from "lucide-react";

export default function StoreDetailsPage() {
  const router = useRouter();
  const { store_id } = useParams<{ store_id: string }>();

  const { data: storeData, isLoading } = useStore(store_id);
  const { data: orderData } = useOrders({
    store_id,
    page: 1,
    limit: 100,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/30 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-slate-600 font-medium">Loading store details...</p>
        </div>
      </div>
    );
  }

  const store = storeData?.data;
  const orders = orderData?.data ?? [];

  const totalRevenue = orders.reduce(
    (sum: number, order: any) => sum + order.total_amount,
    0
  );

  const placed = orders.filter((o: any) => o.status === "PLACED").length;
  const preparing = orders.filter((o: any) => o.status === "PREPARING").length;
  const completed = orders.filter((o: any) => o.status === "COMPLETED").length;

  const stats = [
    {
      title: "Total Orders",
      value: orders.length,
      icon: ShoppingBag,
      color: "from-blue-500 to-blue-600",
      bgColor: "bg-blue-50",
      textColor: "text-blue-600"
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
      title: "Preparing",
      value: preparing,
      icon: Clock,
      color: "from-yellow-500 to-yellow-600",
      bgColor: "bg-yellow-50",
      textColor: "text-yellow-600"
    },
    {
      title: "Completed",
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

  const getStatusIcon = (status: string) => {
    switch(status) {
      case "COMPLETED": return <CheckCircle className="w-3 h-3" />;
      case "PREPARING": return <Clock className="w-3 h-3" />;
      case "PLACED": return <Package className="w-3 h-3" />;
      default: return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30 p-8">
      <div className="mx-auto max-w-7xl">
        {/* Header with Store Info */}
        <div className="bg-white rounded-2xl shadow-sm p-6 mb-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-blue-50 to-purple-50 rounded-full -mr-32 -mt-32 opacity-50" />
          
          <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-lg shadow-blue-500/30">
                <Store className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-slate-800">{store?.name}</h1>
                <div className="flex flex-wrap items-center gap-4 mt-1">
                  <span className="flex items-center gap-1.5 text-sm text-slate-500">
                    <MapPin className="w-4 h-4" />
                    {store?.address}
                  </span>
                  <span className="flex items-center gap-1.5 text-sm text-slate-500">
                    <span className="w-1 h-1 rounded-full bg-slate-300" />
                    ID: {store?.store_id}
                  </span>
                  <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${
                    store?.is_active !== false 
                      ? 'bg-emerald-100 text-emerald-700' 
                      : 'bg-red-100 text-red-700'
                  }`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${
                      store?.is_active !== false ? 'bg-emerald-500' : 'bg-red-500'
                    }`} />
                    {store?.is_active !== false ? 'Active' : 'Inactive'}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3 mt-4 md:mt-0">
              <button
                onClick={() => router.push(`/stores/${store?.store_id}/update`)}
                className="inline-flex items-center gap-2 rounded-xl bg-yellow-50 px-5 py-2.5 text-yellow-600 font-medium hover:bg-yellow-100 transition-colors"
              >
                <Edit className="w-4 h-4" />
                Edit Store
              </button>
              <button
                onClick={() => router.push("/stores")}
                className="inline-flex items-center gap-2 rounded-xl bg-slate-100 px-5 py-2.5 text-slate-600 font-medium hover:bg-slate-200 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Back
              </button>
            </div>
          </div>
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
          <div className="bg-white rounded-xl p-4 shadow-sm border-l-4 border-blue-500">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Package className="w-5 h-5 text-blue-500" />
                <span className="text-sm font-medium text-slate-600">Placed</span>
              </div>
              <span className="text-xl font-bold text-slate-800">{placed}</span>
            </div>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm border-l-4 border-yellow-500">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-yellow-500" />
                <span className="text-sm font-medium text-slate-600">Preparing</span>
              </div>
              <span className="text-xl font-bold text-slate-800">{preparing}</span>
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

        {/* Orders Table */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <div className="flex items-center justify-between border-b border-slate-100 p-6">
            <div>
              <h2 className="text-lg font-semibold text-slate-800">Recent Orders</h2>
              <p className="text-sm text-slate-500">Latest customer orders for this store</p>
            </div>
            <button
              onClick={() => router.push(`/stores/${store?.store_id}/orders`)}
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 px-5 py-2.5 text-white font-medium hover:shadow-lg hover:shadow-blue-500/30 transition-all duration-200 hover:scale-105"
            >
              <Eye className="w-4 h-4" />
              View All Orders
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50/80">
                <tr>
                  <th className="p-4 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Order</th>
                  <th className="p-4 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Customer</th>
                  <th className="p-4 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Items</th>
                  <th className="p-4 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Amount</th>
                  <th className="p-4 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {orders.length > 0 ? (
                  orders.slice(0, 5).map((order: any) => (
                    <tr key={order.order_id} className="group hover:bg-slate-50/50 transition-colors">
                      <td className="p-4">
                        <p className="font-medium text-slate-800">#{order.order_id}</p>
                      </td>
                      <td className="p-4">
                        <p className="text-sm text-slate-600">{order.customer_name}</p>
                      </td>
                      <td className="p-4">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-600 text-sm">
                          <Package className="w-3.5 h-3.5" />
                          {order.total_items || 0} items
                        </span>
                      </td>
                      <td className="p-4">
                        <p className="font-semibold text-slate-800">₹{order.total_amount}</p>
                      </td>
                      <td className="p-4">
                        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(order.status)}`}>
                          {getStatusIcon(order.status)}
                          {order.status}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="p-12 text-center">
                      <div className="flex flex-col items-center gap-3">
                        <ShoppingBag className="w-12 h-12 text-slate-300" />
                        <p className="text-slate-500 font-medium">No orders yet</p>
                        <p className="text-sm text-slate-400">Orders will appear here once customers place them</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {orders.length > 5 && (
            <div className="border-t border-slate-100 px-6 py-4 text-center">
              <p className="text-sm text-slate-500">
                Showing 5 of {orders.length} orders
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}