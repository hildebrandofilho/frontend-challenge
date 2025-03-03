import { create } from "zustand";

const useRestaurant = create((set) => ({
   restaurant: {},
   setRestaurant: (restaurant) => set({ restaurant }),
}));

export default useRestaurant;