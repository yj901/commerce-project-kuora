import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
} from "react";
import {
  addItemToCart,
  removeItemFromCart,
  increaseItemQuantity,
  decreaseItemQuantity,
  CalcTotalPrice,
} from "../utils/cartCalculations";

const CartStateContext = createContext();
const CartActionsContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    const localCart = localStorage.getItem("cart");
    return localCart ? JSON.parse(localCart) : [];
  });
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === "cart") {
        const newCart = e.newValue ? JSON.parse(e.newValue) : [];
        setCartItems(newCart);
      }
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  //상품추가
  const addToCart = useCallback((product, quantity = 1) => {
    setCartItems((prevItems) => addItemToCart(prevItems, product, quantity));
  }, []);

  //상품삭제
  const removeFromCart = useCallback((productCode) => {
    setCartItems((prevItems) => removeItemFromCart(prevItems, productCode));
  }, []);

  //수량 증가
  const increaseQuantity = useCallback((productCode) => {
    setCartItems((prevItems) => increaseItemQuantity(prevItems, productCode));
  }, []);

  //수량 감소
  const decreaseQuantity = useCallback((productCode) => {
    setCartItems((prevItems) => decreaseItemQuantity(prevItems, productCode));
  }, []);

  // 전체 가격 계산
  const totalPrice = useMemo(() => {
    return CalcTotalPrice(cartItems);
  }, [cartItems]);

  //장바구니 비우기
  const clearCart = useCallback(() => {
    setCartItems([]);
  }, []);

  const stateValue = useMemo(
    () => ({
      cartItems,
      totalPrice,
    }),
    [cartItems, totalPrice]
  );

  const actionsValue = useMemo(
    () => ({
      addToCart,
      removeFromCart,
      increaseQuantity,
      decreaseQuantity,
      clearCart,
      isCartOpen,
      setIsCartOpen,
    }),
    [
      addToCart,
      removeFromCart,
      increaseQuantity,
      decreaseQuantity,
      clearCart,
      isCartOpen,
    ]
  );

  return (
    <CartStateContext.Provider value={stateValue}>
      <CartActionsContext.Provider value={actionsValue}>
        {children}
      </CartActionsContext.Provider>
    </CartStateContext.Provider>
  );
};

export const useCartState = () => {
  const context = useContext(CartStateContext);
  if (context === undefined) {
    throw new Error("useCartState must be used within CartProvider");
  }
  return context;
};

export const useCartActions = () => {
  const context = useContext(CartActionsContext);
  if (context === undefined) {
    throw new Error("useCartActions must be used within CartProvider");
  }
  return context;
};

export const useCart = () => {
  return {
    ...useCartState(),
    ...useCartActions(),
  };
};
