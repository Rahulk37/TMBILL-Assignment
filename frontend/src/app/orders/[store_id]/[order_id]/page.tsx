"use client";

import { useParams, useRouter } from "next/navigation";
import { 
  ArrowLeft, 
  ShoppingBag, 
  User, 
  Store, 
  Package, 
  DollarSign,
  CheckCircle,
  Clock,
  AlertCircle,
  Trash2,
  Edit,
  Calendar,
  Hash
} from "lucide-react";
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
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/30 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-slate-600 font-medium">Loading order details...</p>
        </div>
      </div>
    );
  }

  const order = data?.data;

  if (!order) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/30 flex items-center justify-center p-8">
        <div className="bg-white rounded-2xl p-12 text-center shadow-sm max-w-md">
          <AlertCircle className="w-16 h-16 text-red-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-slate-800">Order Not Found</h2>
          <p className="text-slate-500 mt-2">The order you're looking for doesn't exist.</p>
          <button
            onClick={() => router.push(`/stores/${store_id}/orders`)}
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-white font-medium hover:bg-blue-700 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Orders
          </button>
        </div>
      </div>
    );
  }

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
      case "COMPLETED": return <CheckCircle className="w-5 h-5" />;
      case "PREPARING": return <Clock className="w-5 h-5" />;
      case "PLACED": return <Package className="w-5 h-5" />;
      default: return null;
    }
  };

  const infoItems = [
    { label: "Store ID", value: order.store_id, icon: Store },
    { label: "Order ID", value: order.order_id, icon: Hash },
    { label: "Customer", value: order.customer_name, icon: User },
    { label: "Status", value: order.status, icon: Package, isStatus: true },
    { label: "Total Items", value: order.total_items, icon: ShoppingBag },
    { label: "Total Amount", value: `₹${order.total_amount}`, icon: DollarSign },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30 p-8">
      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => router.push(`/stores/${store_id}/orders`)}
              className="p-2 rounded-xl bg-white shadow-sm hover:shadow-md transition-shadow"
            >
              <ArrowLeft className="w-5 h-5 text-slate-600" />
            </button>
            <div>
              <h1 className="text-3xl font-bold text-slate-800">
                Order #{order.order_id}
              </h1>
              <div className="flex items-center gap-3 mt-1">
                <span className="flex items-center gap-1.5 text-sm text-slate-500">
                  <User className="w-4 h-4" />
                  {order.customer_name}
                </span>
                <span className="w-1 h-1 rounded-full bg-slate-300" />
                <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(order.status)}`}>
                  {getStatusIcon(order.status)}
                  {order.status}
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
         
            <button
              onClick={() => {
                if (confirm(`Are you sure you want to delete order #${order.order_id}?`)) {
                  deleteOrder(
                    { store_id, order_id },
                    {
                      onSuccess: () => router.push(`/stores/${store_id}/orders`),
                    }
                  );
                }
              }}
              className="inline-flex items-center gap-2 rounded-xl bg-red-50 px-5 py-2.5 text-red-600 font-medium hover:bg-red-100 transition-colors"
            >
              <Trash2 className="w-4 h-4" />
              Delete
            </button>
          </div>
        </div>

        {/* Order Info Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8">
          {infoItems.map((item) => (
            <div
              key={item.label}
              className="group relative overflow-hidden rounded-2xl bg-white p-6 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <p className="text-sm font-medium text-slate-500 flex items-center gap-1.5">
                    <item.icon className="w-4 h-4" />
                    {item.label}
                  </p>
                  {item.isStatus ? (
                    <span className={`mt-2 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-semibold ${getStatusColor(item.value as string)}`}>
                      {getStatusIcon(item.value as string)}
                      {item.value}
                    </span>
                  ) : (
                    <p className="mt-2 text-xl font-semibold text-slate-800 break-all">
                      {item.value}
                    </p>
                  )}
                </div>
              </div>
              <div className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-blue-500 to-purple-500 w-0 group-hover:w-full transition-all duration-300" />
            </div>
          ))}
        </div>

        {/* Items Table */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <div className="flex items-center justify-between border-b border-slate-100 p-6">
            <div>
              <h2 className="text-lg font-semibold text-slate-800 flex items-center gap-2">
                <ShoppingBag className="w-5 h-5" />
                Order Items
              </h2>
              <p className="text-sm text-slate-500">
                {order.items.length} item(s) in this order
              </p>
            </div>
            <span className="text-sm font-medium text-slate-500">
              Total: ₹{order.total_amount}
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50/80">
                <tr>
                  <th className="p-4 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">#</th>
                  <th className="p-4 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Item ID</th>
                  <th className="p-4 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Quantity</th>
                  <th className="p-4 text-right text-xs font-medium text-slate-500 uppercase tracking-wider">Subtotal</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {order.items.map((item: any, index: number) => (
                  <tr key={item.item_id} className="group hover:bg-slate-50/50 transition-colors">
                    <td className="p-4">
                      <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-slate-100 text-slate-600 text-xs font-semibold">
                        {index + 1}
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <Package className="w-4 h-4 text-slate-400" />
                        <p className="font-medium text-slate-800">{item.item_id}</p>
                      </div>
                    </td>
                    <td className="p-4">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-sm font-medium">
                        <ShoppingBag className="w-3.5 h-3.5" />
                        {item.qty}
                      </span>
                    </td>
                    <td className="p-4 text-right font-medium text-slate-800">
                      ₹{(item.qty * (order.total_amount / order.items.reduce((acc: number, i: any) => acc + i.qty, 0))).toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot className="bg-slate-50/50">
                <tr>
                  <td colSpan={3} className="p-4 text-right font-semibold text-slate-700">
                    Total
                  </td>
                  <td className="p-4 text-right font-bold text-slate-800 text-lg">
                    ₹{order.total_amount}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-100">
            <div className="flex items-center gap-2 text-sm text-slate-500">
              <Calendar className="w-4 h-4" />
              <span>Order Status: <span className={`font-semibold ${getStatusColor(order.status)}`}>{order.status}</span></span>
            </div>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-100">
            <div className="flex items-center gap-2 text-sm text-slate-500">
              <Store className="w-4 h-4" />
              <span>Store: <span className="font-semibold text-slate-700">{order.store_id}</span></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}