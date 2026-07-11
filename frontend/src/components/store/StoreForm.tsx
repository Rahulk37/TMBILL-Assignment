"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCreateStore } from "@/hooks/store/useCreateStore";


export default function StoreForm() {
  const router = useRouter();

  const { mutate, isPending } = useCreateStore();

  const [formData, setFormData] = useState({
    name: "",
    address: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    mutate(formData, {
      onSuccess: () => {
        alert("Store Created Successfully");

        setFormData({
          name: "",
          address: "",
        });

        router.push("/create-store");
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
      <div className="mx-auto max-w-3xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-800">
            Create Store
          </h1>

          <p className="mt-2 text-slate-500">
            Add a new store to the system.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="rounded-2xl border bg-white p-8 shadow-sm"
        >
          <div className="space-y-6">
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Store Name
              </label>

              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Store Name"
                className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Address
              </label>

              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Store Address"
                className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
              />
            </div>

            <div className="flex justify-end gap-4 pt-6">
              <button
                type="button"
                onClick={() =>
                  setFormData({
                    name: "",
                    address: "",
                  })
                }
                className="rounded-lg border border-slate-300 px-6 py-3 font-medium hover:bg-slate-100"
              >
                Reset
              </button>

              <button
                type="submit"
                disabled={isPending}
                className="rounded-lg bg-blue-600 px-8 py-3 font-semibold text-white hover:bg-blue-700 disabled:opacity-50"
              >
                {isPending
                  ? "Creating..."
                  : "Create Store"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}