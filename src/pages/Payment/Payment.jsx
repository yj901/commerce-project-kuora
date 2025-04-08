import React from "react";
import { useLocation } from "react-router-dom";
import { useCart } from "../../contexts/CartContext";

const Payment = () => {
  const location = useLocation();
  const { cartItems, getTotalPrice } = useCart();

  return (
    <div className="checkout">
      <h1>Checkout</h1>
      {cartItems.length === 0 ? (
        <p>장바구니가 비었습니다.</p>
      ) : (
        <>
          <ul>
            {cartItems.map((item) => (
              <li key={item.code}>
                {item.title} - {item.quantity}개 - ₩
                {(item.price * item.quantity).toLocaleString()}
              </li>
            ))}
          </ul>
          <h2>총 합계: ₩{getTotalPrice().toLocaleString()}</h2>
        </>
      )}
    </div>
  );
};

export default Payment;
