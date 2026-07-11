"use client";

import { Archive } from "lucide-react";
import { useArchive } from "@/hooks/useArchive";

export default function ArchiveButton() {
  const { mutate, isPending, data } = useArchive();

  return (
    <div className="flex items-center gap-3">
      <button
        onClick={() => mutate()}
        disabled={isPending}
        className="flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-white font-semibold shadow-sm hover:bg-blue-700"
      >
        <Archive size={18} />

        {isPending ? "Archiving..." : "Archive Orders"}
      </button>

      {data && (
        <span className="rounded-lg bg-green-100 px-4 py-2 text-sm font-medium text-green-700">
          Archived {data.data.archivedCount} Orders
        </span>
      )}
    </div>
  );
}
