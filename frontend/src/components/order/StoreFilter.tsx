"use client";

import useOrderStore from "@/store/order.store";

export default function StoreFilter() {
  const { selectedStore, setSelectedStore } = useOrderStore();

  return (
    <div className="flex flex-wrap items-end gap-5">
      {/* Store Filter */}
      <div className="min-w-[250px]">
        <label className="mb-2 block text-sm font-medium text-slate-700">
          Store
        </label>

        <input
          type="text"
          value={selectedStore}
          onChange={(e) =>
            setSelectedStore(e.target.value)
          }
          placeholder="All Stores"
          className="h-11 w-full rounded-lg border border-slate-300 bg-white px-4 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
        />
      </div>

      {/* Status (UI only) */}

      <div className="min-w-[220px]">
        <label className="mb-2 block text-sm font-medium text-slate-700">
          Status
        </label>

        <select className="h-11 w-full rounded-lg border border-slate-300 bg-white px-4 text-sm outline-none focus:border-blue-500">
          <option>All Status</option>
          <option>PLACED</option>
          <option>PREPARING</option>
          <option>COMPLETED</option>
        </select>
      </div>

      {/* Date */}

      {/* <div className="min-w-[220px]">
        <label className="mb-2 block text-sm font-medium text-slate-700">
          Date
        </label>

        <input
          type="date"
          className="h-11 w-full rounded-lg border border-slate-300 px-4"
        />
      </div> */}

      <button
        type="button"
        className="h-11 rounded-lg border border-slate-300 bg-white px-6 text-sm font-medium hover:bg-slate-50"
      >
        Reset
      </button>
    </div>
  );
}