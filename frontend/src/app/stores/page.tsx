"use client";

import { useRouter } from "next/navigation";
import { useDeleteStore, useStores } from "@/hooks/store/useCreateStore";
import useStoreStore from "@/store/store.store";


export default function StoresPage() {
  const router = useRouter();

  const { page, limit, setPage } = useStoreStore();

  const { data, isLoading } = useStores(
    page,
    limit
  );
console.log("StoresPage",data);
  const { mutate: deleteStore } =
    useDeleteStore();

  if (isLoading) {
    return (
      <div className="p-8">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 p-8">
      <div className="mx-auto max-w-7xl">

        <div className="mb-8 flex items-center justify-between">

          <div>
            <h1 className="text-3xl font-bold">
              Stores
            </h1>

            <p className="text-slate-500">
              Manage all stores.
            </p>
          </div>

          <button
            onClick={() =>
              router.push("/stores/create")
            }
            className="rounded-lg bg-blue-600 px-5 py-3 text-white"
          >
            + Create Store
          </button>

        </div>

        <div className="overflow-hidden rounded-xl border bg-white">

          <table className="w-full">

            <thead className="bg-slate-100">

              <tr>
                <th className="p-4 text-left">
                  Store ID
                </th>

                <th className="p-4 text-left">
                  Name
                </th>

                <th className="p-4 text-left">
                  Address
                </th>

                <th className="p-4 text-center">
                  Actions
                </th>
              </tr>

            </thead>

            <tbody>

              {data?.data?.stores?.map((store: any) => (

                <tr
                  key={store.store_id}
                  className="border-t"
                >

                  <td className="p-4">
                    {store.store_id}
                  </td>

                  <td className="p-4">
                    {store.name}
                  </td>

                  <td className="p-4">
                    {store.address}
                  </td>

                  <td className="space-x-2 p-4 text-center">

                    <button
                      onClick={() =>
                        router.push(
                          `/stores/${store.store_id}`
                        )
                      }
                      className="rounded bg-green-500 px-3 py-2 text-white"
                    >
                      View
                    </button>

                    <button
                      onClick={() =>
                        router.push(
                          `/stores/${store.store_id}/update`
                        )
                      }
                      className="rounded bg-yellow-500 px-3 py-2 text-white"
                    >
                      Update
                    </button>

                    <button
                      onClick={() =>
                        router.push(
                          `/stores/${store.store_id}/orders`
                        )
                      }
                      className="rounded bg-blue-500 px-3 py-2 text-white"
                    >
                      Orders
                    </button>

                    <button
                      onClick={() =>
                        deleteStore(store.store_id)
                      }
                      className="rounded bg-red-500 px-3 py-2 text-white"
                    >
                      Delete
                    </button>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>
      </div>
    </div>
  );
}