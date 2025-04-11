import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  //상품추가 - 수량도 추가
  const addToCart = (product, quantity = 1) => {
    // quantity 파라미터가 없으면 기본값 1로 설정
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.code === product.code);
      if (existingItem) {
        // 이미 있는 경우 수량추가
        return prevItems.map((item) =>
          item.code === product.code
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        return [...prevItems, { ...product, quantity: quantity }];
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

  // 장바구니 내 특정 상품의 수량을 직접 설정하는 함수 추가
  const setItemQuantity = (productCode, newQuantity) => {
    if (newQuantity <= 0) {
      // 수량이 0 이하면 상품 삭제
      removeFromCart(productCode);
      return;
    }

    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.code === productCode ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const value = {
    cartItems,
    addToCart,
    removeFromCart,
    getTotalPrice,
    increaseQuantity,
    decreaseQuantity,
    setItemQuantity, // 신규 함수 export
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
