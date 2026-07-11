"use client";

import { useState } from "react";
import { useCreateOrder } from "@/hooks/useCreateOrder";
import { useRouter } from "next/navigation";
export default function OrderForm() {
  const router = useRouter();
  const { mutate, isPending } = useCreateOrder();

  const [formData, setFormData] = useState({
    store_id: "",
    total_amount: "",
    items: [
      {
        item_id: "",
        qty: 1,
      },
    ],
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleItemChange = (
    index: number,
    field: string,
    value: string
  ) => {
    const updatedItems = [...formData.items];

    updatedItems[index] = {
      ...updatedItems[index],
      [field]:
        field === "qty"
          ? Number(value)
          : value,
    };

    setFormData((prev) => ({
      ...prev,
      items: updatedItems,
    }));
  };

  const addItem = () => {
    setFormData((prev) => ({
      ...prev,
      items: [
        ...prev.items,
        {
          item_id: "",
          qty: 1,
        },
      ],
    }));
  };

  const removeItem = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      items: prev.items.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    const payload = {
      store_id: formData.store_id.trim(),
      total_amount: Number(formData.total_amount),
      items: formData.items.map((item) => ({
        item_id: item.item_id.trim(),
        qty: Number(item.qty),
      })),
    };

    console.log(payload);

    mutate(payload, {
      onSuccess: () => {
        alert("Order Created Successfully");

        setFormData({
          store_id: "",
          total_amount: "",
          items: [
            {
              item_id: "",
              qty: 1,
            },
          ],
        });
          router.push("/orders");
      },

      onError: (error: any) => {
        alert(
          error.response?.data?.message ||
            "Something went wrong"
        );
      },
    });
  };

return (
  <div className="min-h-screen bg-slate-100 p-8">
    <div className="mx-auto max-w-7xl">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-800">
          Create New Order
        </h1>
        <p className="mt-2 text-slate-500">
          Create a new order for your store.
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid gap-6 lg:grid-cols-3">
          {/* LEFT */}
          <div className="lg:col-span-2 rounded-2xl border bg-white p-6 shadow-sm">
            {/* Store */}
            <div className="mb-8">
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Store ID
              </label>

              <input
                type="text"
                name="store_id"
                value={formData.store_id}
                onChange={handleChange}
                placeholder="Enter Store ID"
                className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500"
              />
            </div>

            {/* Order Items */}

            <div className="flex items-center justify-between mb-5">
              <h2 className="text-lg font-semibold">
                Order Items
              </h2>

              <button
                type="button"
                onClick={addItem}
                className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
              >
                + Add Item
              </button>
            </div>

            <div className="overflow-hidden rounded-xl border">
              <table className="w-full">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm">
                      Item ID
                    </th>

                    <th className="px-4 py-3 text-left text-sm">
                      Qty
                    </th>

                    <th className="px-4 py-3 text-center text-sm">
                      Action
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {formData.items.map((item, index) => (
                    <tr
                      key={index}
                      className="border-t"
                    >
                      <td className="p-4">
                        <input
                          type="text"
                          value={item.item_id}
                          onChange={(e) =>
                            handleItemChange(
                              index,
                              "item_id",
                              e.target.value
                            )
                          }
                          placeholder="ITEM-101"
                          className="w-full rounded-lg border px-3 py-2"
                        />
                      </td>

                      <td className="p-4 w-40">
                        <input
                          type="number"
                          min={1}
                          value={item.qty}
                          onChange={(e) =>
                            handleItemChange(
                              index,
                              "qty",
                              e.target.value
                            )
                          }
                          className="w-full rounded-lg border px-3 py-2"
                        />
                      </td>

                      <td className="text-center">
                        {formData.items.length >
                          1 && (
                          <button
                            type="button"
                            onClick={() =>
                              removeItem(index)
                            }
                            className="rounded-md bg-red-500 px-3 py-2 text-white hover:bg-red-600"
                          >
                            Remove
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* RIGHT */}

          <div className="rounded-2xl border bg-white p-6 shadow-sm h-fit">
            <h3 className="mb-6 text-xl font-semibold">
              Order Summary
            </h3>

            <div className="space-y-4">
              <div className="flex justify-between">
                <span>Total Items</span>

                <span>
                  {formData.items.length}
                </span>
              </div>

              <div className="flex justify-between">
                <span>Total Qty</span>

                <span>
                  {formData.items.reduce(
                    (a, b) => a + b.qty,
                    0
                  )}
                </span>
              </div>

              <div className="border-t pt-4">
                <label className="mb-2 block text-sm font-semibold">
                  Total Amount
                </label>

                <input
                  type="number"
                  name="total_amount"
                  value={formData.total_amount}
                  onChange={handleChange}
                  placeholder="500"
                  className="w-full rounded-lg border px-4 py-3"
                />
              </div>

              <div className="pt-6 space-y-3">
                <button
                  type="button"
                  onClick={() =>
                    setFormData({
                      store_id: "",
                      total_amount: "",
                      items: [
                        {
                          item_id: "",
                          qty: 1,
                        },
                      ],
                    })
                  }
                  className="w-full rounded-lg border border-slate-300 py-3 font-medium hover:bg-slate-50"
                >
                  Reset
                </button>

                <button
                  type="submit"
                  disabled={isPending}
                  className="w-full rounded-lg bg-blue-600 py-3 font-semibold text-white hover:bg-blue-700 disabled:opacity-60"
                >
                  {isPending
                    ? "Creating..."
                    : "Create Order"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  </div>
);
}