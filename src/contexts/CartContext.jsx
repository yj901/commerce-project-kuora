import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  //상품추가
  const addToCart = (product) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.code === product.code);
      if (existingItem) {
        // 이미 있는 경우 수량추가
        return prevItems.map((item) =>
          item.code === product.code
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevItems, { ...product, quantity: 1 }];
      }
    });
  };

  //상품삭제
  const removeFromCart = (productCode) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.code !== productCode)
    );
  };

  // 전체 가격 계산
  const getTotalPrice = () => {
    return cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  };

  // CartContext.js (계속)
  const increaseQuantity = (productCode) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.code === productCode
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  const decreaseQuantity = (productCode) => {
    setCartItems(
      (prevItems) =>
        prevItems
          .map((item) =>
            item.code === productCode
              ? { ...item, quantity: item.quantity - 1 }
              : item
          )
          .filter((item) => item.quantity > 0) // 수량이 0이 되면 자동 제거
    );
  };

  const value = {
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart,
    getTotalPrice,
    increaseQuantity,
    decreaseQuantity,
    isCartOpen,
    setIsCartOpen,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    console.error("useCart is undefined");
  }
  return context;
};
