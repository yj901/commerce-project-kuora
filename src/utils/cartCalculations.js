//상품추가
export const addItemToCart = (cartItems, product, quantity = 1) => {
  const existingItem = cartItems.find((item) => item.code === product.code);

  if (existingItem) {
    return cartItems.map((item) =>
      item.code === product.code
        ? { ...item, quantity: item.quantity + quantity }
        : item
    );
  }

  return [...cartItems, { ...product, quantity }];
};

//상품삭제
export const removeItemFromCart = (cartItems, productCode) => {
  return cartItems.filter((item) => item.code !== productCode);
};

//수량 증가
export const increaseItemQuantity = (cartItems, productCode) => {
  return cartItems.map((item) =>
    item.code === productCode ? { ...item, quantity: item.quantity + 1 } : item
  );
};

//수량 삭제
export const decreaseItemQuantity = (cartItems, productCode) => {
  return cartItems
    .map((item) =>
      item.code === productCode
        ? { ...item, quantity: item.quantity - 1 }
        : item
    )
    .filter((item) => item.quantity > 0);
};

//전체 가격 계산
export const CalcTotalPrice = (cartItems) => {
  return cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
};
