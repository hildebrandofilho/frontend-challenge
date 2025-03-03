import { create } from "zustand";

const useCart = create((set, get) => ({
   cartItems: [],
   setCartItems: (item) => {
      const cartItems = get().cartItems;

      const itemIndex = cartItems.findIndex((cartItem) => cartItem.itemID === item.itemID && cartItem.modifierID === item.modifierID);
      
      if (itemIndex > -1) {
         cartItems[itemIndex].quantity += item.quantity;
         cartItems[itemIndex].price += item.price;
      } else {
         cartItems.push(item);
      }

      set({ cartItems: [ ...cartItems ] });
   },
   subtractItem: (item) => {
      const cartItems = get().cartItems;
      const itemIndex = cartItems.findIndex((cartItem) => cartItem.itemID === item.itemID && cartItem.modifierID === item.modifierID);

      if (itemIndex > -1) {
         cartItems[itemIndex].quantity -= 1;
         cartItems[itemIndex].price -= item.price;
      }

      if (cartItems[itemIndex].quantity <= 0) {
         cartItems.splice(itemIndex, 1);
      }

      set({ cartItems: [ ...cartItems ] });
   },
   addItem: (item) => {
      const cartItems = get().cartItems;
      const itemIndex = cartItems.findIndex((cartItem) => cartItem.itemID === item.itemID && cartItem.modifierID === item.modifierID);

      if (itemIndex > -1) {
         cartItems[itemIndex].quantity += 1;
         cartItems[itemIndex].price += item.price;
      } else {
         cartItems.push(item);
      }

      set({ cartItems: [ ...cartItems ] });
   },
   clearCartItems: () => {
      set({ cartItems: [] });
   },
}));

export default useCart;