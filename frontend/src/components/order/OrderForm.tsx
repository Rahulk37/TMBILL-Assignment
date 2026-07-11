"use client";

import { useState } from "react";
import { useCreateOrder } from "@/hooks/useCreateOrder";

import styles from "./OrderForm.module.css";

export default function OrderForm() {
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
    const updatedItems = formData.items.filter(
      (_, i) => i !== index
    );

    setFormData((prev) => ({
      ...prev,
      items: updatedItems,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    mutate(
      {
        ...formData,
        total_amount: Number(formData.total_amount),
      },
      {
        onSuccess: () => {
          alert("Order Created");

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
        },

        onError: (error: any) => {
          alert(
            error.response?.data?.message ||
              "Something went wrong"
          );
        },
      }
    );
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={styles.form}
    >
      <input
        type="text"
        name="store_id"
        placeholder="Store ID"
        value={formData.store_id}
        onChange={handleChange}
      />

      <input
        type="number"
        name="total_amount"
        placeholder="Total Amount"
        value={formData.total_amount}
        onChange={handleChange}
      />

      {formData.items.map((item, index) => (
        <div
          key={index}
          className={styles.itemRow}
        >
          <input
            type="text"
            placeholder="Item ID"
            value={item.item_id}
            onChange={(e) =>
              handleItemChange(
                index,
                "item_id",
                e.target.value
              )
            }
          />

          <input
            type="number"
            value={item.qty}
            onChange={(e) =>
              handleItemChange(
                index,
                "qty",
                e.target.value
              )
            }
          />

          {formData.items.length > 1 && (
            <button
              type="button"
              onClick={() => removeItem(index)}
            >
              Remove
            </button>
          )}
        </div>
      ))}

      <button
        type="button"
        onClick={addItem}
      >
        Add Item
      </button>

      <button
        type="submit"
        disabled={isPending}
      >
        {isPending
          ? "Creating..."
          : "Create Order"}
      </button>
    </form>
  );
}