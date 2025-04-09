import React from "react";
import { useCart } from "../../contexts/CartContext";
import HeaderCartItem from "./HeaderCartItem";
import IconCart from "../../assets/icons/cart_icon_bg.svg";

const HeaderCartCenter = () => {
  const { cartItems } = useCart();

  if (cartItems.length === 0) {
    return (
      <div id="cart_center">
        <div className="cart_empty">
          <img src={IconCart} alt="cartIcon" />
          <span>장바구니가 비었습니다.</span>
        </div>
      </div>
    );
  }

  return (
    <div id="cart_center">
      {cartItems.map((item) => (
        <HeaderCartItem key={item.code} item={item} />
      ))}
    </div>
  );
};

export default HeaderCartCenter;
