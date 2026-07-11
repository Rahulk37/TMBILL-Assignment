"use client";

import useOrderStore from "@/store/order.store";

export default function StoreFilter() {
  const {
    selectedStore,
    setSelectedStore,
  } = useOrderStore();

  return (
    <div>
      <input
        type="text"
        placeholder="Store ID"
        value={selectedStore}
        onChange={(e) =>
          setSelectedStore(
            e.target.value
          )
        }
      />
    </div>
  );
}