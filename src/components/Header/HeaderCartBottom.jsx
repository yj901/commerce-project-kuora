import React from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../contexts/CartContext";

const HeaderCartBottom = () => {
  const { cartItems, getTotalPrice } = useCart();
  const navigate = useNavigate();
  const total = getTotalPrice();

  const hasItems = cartItems.length > 0;

  const handleCheckout = () => {
    if (hasItems) {
      navigate("/payment", { state: cartItems });
    }
  };

  return (
    <div id="cart_bottom">
      <ul className="cart_price">
        <li className="subtotal">
          <h6>SUBTOTAL : </h6>
          <p>
            <span>￦</span>
            {total.toLocaleString()}
          </p>
        </li>
        <li className="total">
          <h6>TOTAL : </h6>
          <p>
            <span>￦</span>
            {total.toLocaleString()}
          </p>
        </li>
      </ul>
      {hasItems && (
        <button className="checkoutBtn" onClick={handleCheckout}>
          PROCEED TO CHECKOUT
        </button>
      )}
    </div>
  );
};

export default HeaderCartBottom;
