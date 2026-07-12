"use client";

import { Archive, CheckCircle } from "lucide-react";
import { useArchive } from "@/hooks/useArchive";

export default function ArchiveButton() {
  const { mutate, isPending, data } = useArchive();

  return (
    <div className="flex items-center gap-3">
      <button
        onClick={() => mutate()}
        disabled={isPending}
        className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-3 text-white font-semibold shadow-sm hover:shadow-lg hover:shadow-blue-500/30 transition-all duration-200 hover:scale-105 disabled:opacity-70 disabled:cursor-not-allowed"
      >
        <Archive size={18} />
        {isPending ? (
          <>
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            Archiving...
          </>
        ) : (
          "Archive Orders"
        )}
      </button>

      {data && (
        <span className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-100 px-4 py-2 text-sm font-medium text-emerald-700">
          <CheckCircle className="w-4 h-4" />
          Archived {data.data.archivedCount} Orders
        </span>
      )}
    </div>
  );
}