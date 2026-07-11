"use client";

import { OrderStatus } from "@/types/order";

interface Props {
  value: OrderStatus;
  onChange: (status: OrderStatus) => void;
}

export default function StatusDropdown({
  value,
  onChange,
}: Props) {
  return (
    <select
      value={value}
      onChange={(e) =>
        onChange(
          e.target.value as OrderStatus
        )
      }
    >
      <option value="PLACED">
        PLACED
      </option>

      <option value="PREPARING">
        PREPARING
      </option>

      <option value="COMPLETED">
        COMPLETED
      </option>
    </select>
  );
}