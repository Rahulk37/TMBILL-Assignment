"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  CreateOrderPayload,
  OrderItem,
  OrderStatus,
} from "@/types/order";
import { useCreateOrder } from "@/hooks/order/useOrder";
import { 
  ArrowLeft, 
  Plus, 
  Trash2, 
  ShoppingBag, 
  User, 
  DollarSign,
  Package,
  X,
  Check,
  AlertCircle
} from "lucide-react";

export default function OrdersPage() {
  const router = useRouter();
  const { store_id } = useParams<{ store_id: string }>();

  const { mutate: createOrder, isPending } = useCreateOrder();

  const [customerName, setCustomerName] = useState<string>("");
  const [status, setStatus] = useState<OrderStatus>("PLACED");
  const [totalAmount, setTotalAmount] = useState<number>(0);

  const [items, setItems] = useState<OrderItem[]>([
    {
      item_id: "",
      qty: 1,
    },
  ]);

  const handleItemChange = (
    index: number,
    field: keyof OrderItem,
    value: string | number
  ) => {
    const updated = [...items];
    updated[index] = {
      ...updated[index],
      [field]: value,
    } as OrderItem;
    setItems(updated);
  };

  const addItem = () => {
    setItems((prev) => [...prev, { item_id: "", qty: 1 }]);
  };

  const removeItem = (index: number) => {
    setItems((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = () => {
    if (!customerName.trim()) {
      alert("Please enter customer name");
      return;
    }
    if (items.some(item => !item.item_id.trim())) {
      alert("Please fill in all item IDs");
      return;
    }
    if (totalAmount <= 0) {
      alert("Please enter a valid total amount");
      return;
    }

    const payload: CreateOrderPayload = {
      store_id,
      customer_name: customerName,
      items,
      total_amount: totalAmount,
      status,
    };

    createOrder(payload, {
      onSuccess: () => {
        router.push(`/stores/${store_id}/orders`);
      },
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30 p-8">
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => router.push(`/stores/${store_id}/orders`)}
              className="p-2 rounded-xl bg-white shadow-sm hover:shadow-md transition-shadow"
            >
              <ArrowLeft className="w-5 h-5 text-slate-600" />
            </button>
            <div>
              <h1 className="text-3xl font-bold text-slate-800">Create New Order</h1>
              <p className="text-slate-500 mt-1">Store ID: {store_id}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold ${
              status === "COMPLETED" ? "bg-green-100 text-green-700" :
              status === "PREPARING" ? "bg-yellow-100 text-yellow-700" :
              "bg-blue-100 text-blue-700"
            }`}>
              <span className={`w-1.5 h-1.5 rounded-full ${
                status === "COMPLETED" ? "bg-green-500" :
                status === "PREPARING" ? "bg-yellow-500" :
                "bg-blue-500"
              }`} />
              {status}
            </span>
          </div>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <div className="p-6 border-b border-slate-100">
            <h2 className="text-lg font-semibold text-slate-800">Order Details</h2>
            <p className="text-sm text-slate-500">Enter the order information below</p>
          </div>

          <div className="p-6 space-y-6">
            {/* Customer Name */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                <User className="w-4 h-4 inline mr-1.5" />
                Customer Name
              </label>
              <input
                placeholder="Enter customer name"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
              />
            </div>

            {/* Total Amount and Status */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  <DollarSign className="w-4 h-4 inline mr-1.5" />
                  Total Amount
                </label>
                <input
                  type="number"
                  placeholder="0.00"
                  value={totalAmount}
                  onChange={(e) => setTotalAmount(Number(e.target.value))}
                  className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  <Package className="w-4 h-4 inline mr-1.5" />
                  Order Status
                </label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value as OrderStatus)}
                  className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all bg-white"
                >
                  <option value="PLACED">📦 Placed</option>
                  <option value="PREPARING">⏳ Preparing</option>
                  <option value="COMPLETED">✅ Completed</option>
                </select>
              </div>
            </div>

            {/* Order Items */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <label className="block text-sm font-medium text-slate-700">
                  <ShoppingBag className="w-4 h-4 inline mr-1.5" />
                  Order Items
                </label>
                <span className="text-sm text-slate-500">{items.length} item(s)</span>
              </div>

              <div className="space-y-3">
                {items.map((item, index) => (
                  <div
                    key={index}
                    className="flex flex-col sm:flex-row items-start sm:items-center gap-3 p-4 bg-slate-50 rounded-xl border border-slate-100 hover:border-blue-200 transition-colors"
                  >
                    <div className="flex-1 w-full">
                      <input
                        placeholder="Item ID"
                        value={item.item_id}
                        onChange={(e) =>
                          handleItemChange(index, "item_id", e.target.value)
                        }
                        className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all bg-white"
                      />
                    </div>

                    <div className="flex items-center gap-3 w-full sm:w-auto">
                      <div className="flex-1 sm:w-24">
                        <input
                          type="number"
                          min="1"
                          value={item.qty}
                          onChange={(e) =>
                            handleItemChange(index, "qty", Number(e.target.value))
                          }
                          className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all bg-white"
                        />
                      </div>

                      <button
                        type="button"
                        onClick={() => removeItem(index)}
                        className="p-2.5 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition-colors"
                        title="Remove item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <span className="text-xs font-medium text-slate-400 hidden sm:block">
                      #{index + 1}
                    </span>
                  </div>
                ))}
              </div>

              <button
                type="button"
                onClick={addItem}
                className="mt-4 inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border-2 border-dashed border-slate-300 text-slate-600 hover:border-blue-400 hover:text-blue-600 transition-colors"
              >
                <Plus className="w-4 h-4" />
                Add Item
              </button>
            </div>

            {/* Preview Section */}
            {customerName || totalAmount > 0 || items.some(i => i.item_id) ? (
              <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-blue-100">
                <h3 className="text-sm font-semibold text-slate-700 mb-2">Order Preview</h3>
                <div className="space-y-1 text-sm">
                  <p className="text-slate-600">
                    <span className="font-medium">Customer:</span> {customerName || "—"}
                  </p>
                  <p className="text-slate-600">
                    <span className="font-medium">Total:</span> ₹{totalAmount || 0}
                  </p>
                  <p className="text-slate-600">
                    <span className="font-medium">Items:</span> {items.filter(i => i.item_id).length} item(s)
                  </p>
                </div>
              </div>
            ) : null}

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-slate-100">
              <button
                type="button"
                onClick={() => router.push(`/stores/${store_id}/orders`)}
                className="flex-1 px-6 py-3 rounded-xl border border-slate-200 text-slate-600 font-medium hover:bg-slate-50 transition-all"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSubmit}
                disabled={isPending}
                className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold hover:shadow-lg hover:shadow-blue-500/30 transition-all duration-200 hover:scale-[1.02] disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isPending ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Creating...
                  </>
                ) : (
                  <>
                    <Check className="w-5 h-5" />
                    Create Order
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        
      </div>
    </div>
  );
}