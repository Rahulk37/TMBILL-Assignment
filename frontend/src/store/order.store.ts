import { create } from "zustand";

interface OrderStore {
  selectedStore: string;
  page: number;
  limit: number;

  setSelectedStore: (store: string) => void;
  setPage: (page: number) => void;
}

const useOrderStore = create<OrderStore>((set) => ({
  selectedStore: "",
  page: 1,
  limit: 10,

  setSelectedStore: (store) =>
    set({
      selectedStore: store,
      page: 1,
    }),

  setPage: (page) =>
    set({
      page,
    }),
}));

export default useOrderStore;