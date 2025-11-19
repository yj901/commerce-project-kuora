import { create } from "zustand";
import {
  addItemToCart,
  removeItemFromCart,
  increaseItemQuantity,
  decreaseItemQuantity,
} from "../utils/cartCalculations";

const useCartStore = create((set, get) => ({
  cartItems: (() => {
    const localCart = localStorage.getItem("cart");
    return localCart ? JSON.parse(localCart) : [];
  })(),
  isCartOpen: false,

  addToCart: (product, quantity = 1) => {
    set((state) => {
      const newItems = addItemToCart(state.cartItems, product, quantity);
      localStorage.setItem("cart", JSON.stringify(newItems));
      return { cartItems: newItems };
    });
  },

  removeFromCart: (productCode) => {
    set((state) => {
      const newItems = removeItemFromCart(state.cartItems, productCode);
      localStorage.setItem("cart", JSON.stringify(newItems));
      return { cartItems: newItems };
    });
  },

  increaseQuantity: (productCode) => {
    set((state) => {
      const newItems = increaseItemQuantity(state.cartItems, productCode);
      localStorage.setItem("cart", JSON.stringify(newItems));
      return { cartItems: newItems };
    });
  },

  decreaseQuantity: (productCode) => {
    set((state) => {
      const newItems = decreaseItemQuantity(state.cartItems, productCode);
      localStorage.setItem("cart", JSON.stringify(newItems));
      return { cartItems: newItems };
    });
  },

  clearCart: () => {
    set({ cartItems: [] });
    localStorage.setItem("cart", JSON.stringify([]));
  },

  setIsCartOpen: (open) => set({ isCartOpen: open }),
}));

export default useCartStore;
