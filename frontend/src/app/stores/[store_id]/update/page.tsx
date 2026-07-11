"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useStore, useUpdateStore } from "@/hooks/store/useCreateStore";


export default function UpdateStorePage() {
  const router = useRouter();

  const { store_id } = useParams<{
    store_id: string;
  }>();

  const { data, isLoading } =
    useStore(store_id);

  const { mutate, isPending } =
    useUpdateStore();

  const [formData, setFormData] = useState({
    name: "",
    address: "",
  });

  useEffect(() => {
    if (data?.data) {
      setFormData({
        name: data.data.name,
        address: data.data.address,
      });
    }
  }, [data]);

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

    mutate(
      {
        store_id,
        data: formData,
      },
      {
        onSuccess: () => {
          alert("Store updated successfully");

          router.push("/stores");
        },

        onError: (error: any) => {
          alert(
            error.response?.data?.message ??
              "Update failed"
          );
        },
      }
    );
  };

  if (isLoading) {
    return (
      <div className="p-8">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 p-8">
      <div className="mx-auto max-w-2xl">

        <div className="mb-8">
          <h1 className="text-3xl font-bold">
            Update Store
          </h1>

          <p className="mt-2 text-slate-500">
            Update store details.
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
                type="submit"
                disabled={isPending}
                className="rounded-lg bg-blue-600 px-6 py-3 text-white"
              >
                {isPending
                  ? "Updating..."
                  : "Update Store"}
              </button>

            </div>

          </div>
        </form>
      </div>
    </div>
  );
}