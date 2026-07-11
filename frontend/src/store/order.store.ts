import { create } from "zustand";

interface OrderStore {
  selectedStore: string;
  selectedOrder: string;

  page: number;
  limit: number;

  setSelectedStore: (store: string) => void;
  setSelectedOrder: (order: string) => void;
  setPage: (page: number) => void;
  resetSelection: () => void;
}

const useOrderStore = create<OrderStore>((set) => ({
  selectedStore: "",
  selectedOrder: "",

  page: 1,
  limit: 10,

  setSelectedStore: (store) =>
    set({
      selectedStore: store,
      selectedOrder: "",
      page: 1,
    }),

  setSelectedOrder: (order) =>
    set({
      selectedOrder: order,
    }),

  setPage: (page) =>
    set({
      page,
    }),

  resetSelection: () =>
    set({
      selectedStore: "",
      selectedOrder: "",
      page: 1,
    }),
}));

export default useOrderStore;