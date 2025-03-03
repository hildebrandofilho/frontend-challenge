import { create } from "zustand";

const useOrder = create((set) => ({
   orderItem: {},
   setOrderItem: (orderItem) => {
      set({ orderItem });
   },
   clearOrderItem: () => {
      set({ orderItem: {} });
   },
}));

export default useOrder;