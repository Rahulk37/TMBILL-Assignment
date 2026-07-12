"use client";

import { useState } from "react";
import { Archive, CheckCircle } from "lucide-react";
import { useArchive } from "@/hooks/archive/useArchive";


export default function ArchiveButton() {
  const [days, setDays] = useState(30);

  const { mutate, isPending, data } = useArchive();

  return (
    <div className="flex flex-wrap items-center gap-3">
      <select
        value={days}
        onChange={(e) => setDays(Number(e.target.value))}
        className="rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm font-medium text-slate-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none"
      >
        <option value={7}>Last 7 Days</option>
        <option value={15}>Last 15 Days</option>
        <option value={30}>Last 30 Days</option>
        <option value={60}>Last 60 Days</option>
        <option value={90}>Last 90 Days</option>
        <option value={365}>Last 1 Year</option>
      </select>

      <button
        onClick={() => mutate({ days })}
        disabled={isPending}
        className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-3 text-white font-semibold shadow-sm hover:shadow-lg hover:shadow-blue-500/30 transition-all duration-200 hover:scale-105 disabled:opacity-70 disabled:cursor-not-allowed"
      >
        <Archive size={18} />

        {isPending ? (
          <>
            <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
            Archiving...
          </>
        ) : (
          `Archive ${days}+ Days`
        )}
      </button>

      {data && (
        <span className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-100 px-4 py-2 text-sm font-medium text-emerald-700">
          <CheckCircle className="h-4 w-4" />
          Archived {data.data.archivedCount} Orders
        </span>
      )}
    </div>
  );
}