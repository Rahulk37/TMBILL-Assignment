"use client";

import { useEffect } from "react";

import { useQueryClient } from "@tanstack/react-query";

import socket from "@/services/socket";

import useOrderStore from "@/store/order.store";

import { OrdersResponse, Order } from "@/types/order";

export default function useSocket() {
  const queryClient = useQueryClient();

  const { selectedStore } = useOrderStore();

  useEffect(() => {
    if (!selectedStore) return;

    socket.connect();

    socket.emit("join-store", selectedStore);

    socket.on(
      "order-created",
      (newOrder: Order) => {
        queryClient.setQueriesData(
          {
            queryKey: ["orders"],
          },
          (oldData: OrdersResponse | undefined) => {
            if (!oldData) return oldData;

            return {
              ...oldData,

              data: [
                newOrder,
                ...oldData.data,
              ],
            };
          }
        );
      }
    );

    socket.on(
      "order-status-updated",
      (updatedOrder: Order) => {
        queryClient.setQueriesData(
          {
            queryKey: ["orders"],
          },
          (oldData: OrdersResponse | undefined) => {
            if (!oldData) return oldData;

            return {
              ...oldData,

              data: oldData.data.map(
                (order) =>
                  order._id ===
                  updatedOrder._id
                    ? updatedOrder
                    : order
              ),
            };
          }
        );
      }
    );

    return () => {
      socket.emit(
        "leave-store",
        selectedStore
      );

      socket.off("order-created");

      socket.off(
        "order-status-updated"
      );

      socket.disconnect();
    };
  }, [selectedStore]);
}