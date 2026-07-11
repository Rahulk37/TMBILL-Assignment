"use client";

import { useArchive } from "@/hooks/useArchive";

export default function ArchiveButton() {
  const {
    mutate,
    isPending,
    data,
  } = useArchive();

  return (
    <div>
      <button
        onClick={() => mutate()}
        disabled={isPending}
      >
        {isPending
          ? "Archiving..."
          : "Archive Orders"}
      </button>

      {data && (
        <p>
          Archived{" "}
          {data.data.archivedCount} orders.
        </p>
      )}
    </div>
  );
}