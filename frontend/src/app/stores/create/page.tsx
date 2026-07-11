"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCreateStore } from "@/hooks/store/useCreateStore";



export default function CreateStorePage() {
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
        alert("Store created successfully");

        router.push("/stores");
      },

      onError: (error: any) => {
        alert(
          error.response?.data?.message ??
            "Failed to create store"
        );
      },
    });
  };

  return (
    <div className="min-h-screen bg-slate-100 p-8">
      <div className="mx-auto max-w-2xl">

        <div className="mb-8">
          <h1 className="text-3xl font-bold">
            Create Store
          </h1>

          <p className="text-slate-500 mt-2">
            Add a new store.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="rounded-xl bg-white p-8 shadow"
        >

          <div className="space-y-6">

            <div>

              <label className="mb-2 block font-medium">
                Store Name
              </label>

              <input
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Store Name"
                className="w-full rounded-lg border p-3"
              />

            </div>

            <div>

              <label className="mb-2 block font-medium">
                Address
              </label>

              <input
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Store Address"
                className="w-full rounded-lg border p-3"
              />

            </div>

            <div className="flex justify-end gap-4">

              <button
                type="button"
                onClick={() => router.back()}
                className="rounded-lg border px-6 py-3"
              >
                Cancel
              </button>

              <button
                disabled={isPending}
                className="rounded-lg bg-blue-600 px-6 py-3 text-white"
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