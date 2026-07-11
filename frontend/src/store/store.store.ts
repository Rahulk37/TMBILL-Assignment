import { create } from "zustand";

interface StoreState {
  selectedStoreId: string;

  page: number;
  limit: number;

  setSelectedStoreId: (storeId: string) => void;
  setPage: (page: number) => void;
  resetSelection: () => void;
}

const useStoreStore = create<StoreState>((set) => ({
  selectedStoreId: "",

  page: 1,
  limit: 10,

  setSelectedStoreId: (storeId) =>
    set({
      selectedStoreId: storeId,
      page: 1,
    }),

  setPage: (page) =>
    set({
      page,
    }),

  resetSelection: () =>
    set({
      selectedStoreId: "",
      page: 1,
    }),
}));

export default useStoreStore;