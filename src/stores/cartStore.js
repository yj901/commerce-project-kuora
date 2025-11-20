import { create } from "zustand";
import { persist } from "zustand/middleware";
import {
  addItemToCart,
  removeItemFromCart,
  increaseItemQuantity,
  decreaseItemQuantity,
} from "../utils/cartCalculations";

const useCartStore = create(
  persist(
    (set) => ({
      cartItems: [],
      isCartOpen: false,

      addToCart: (product, quantity = 1) => {
        set((state) => {
          const newItems = addItemToCart(state.cartItems, product, quantity);
          return { cartItems: newItems };
        });
      },

      removeFromCart: (productCode) => {
        set((state) => {
          const newItems = removeItemFromCart(state.cartItems, productCode);
          return { cartItems: newItems };
        });
      },

      increaseQuantity: (productCode) => {
        set((state) => {
          const newItems = increaseItemQuantity(state.cartItems, productCode);
          return { cartItems: newItems };
        });
      },

      decreaseQuantity: (productCode) => {
        set((state) => {
          const newItems = decreaseItemQuantity(state.cartItems, productCode);
          return { cartItems: newItems };
        });
      },

      clearCart: () => {
        set({ cartItems: [] });
      },

      setIsCartOpen: (open) => set({ isCartOpen: open }),
    }),
    { name: "cart-storage" }
  )
);

export default useCartStore;
