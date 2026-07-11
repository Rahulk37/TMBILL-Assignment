"use client";

import useOrderStore from "@/store/order.store";

import styles from "./Pagination.module.css";

interface PaginationProps {
  totalPages: number;
}

export default function Pagination({
  totalPages,
}: PaginationProps) {
  const {
    page,
    setPage,
  } = useOrderStore();

  if (totalPages <= 1) {
    return null;
  }

  return (
    <div className={styles.container}>
      <button
        disabled={page === 1}
        onClick={() =>
          setPage(page - 1)
        }
      >
        Previous
      </button>

      <span>
        Page {page} of {totalPages}
      </span>

      <button
        disabled={
          page === totalPages
        }
        onClick={() =>
          setPage(page + 1)
        }
      >
        Next
      </button>
    </div>
  );
}