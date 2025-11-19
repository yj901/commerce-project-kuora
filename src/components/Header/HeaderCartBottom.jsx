import React from "react";
import { useNavigate } from "react-router-dom";
import useCartStore from "../../stores/cartStore";
import { CalcTotalPrice } from "../../utils/cartCalculations";

const HeaderCartBottom = () => {
  const cartItems = useCartStore((state) => state.cartItems);
  const totalPrice = CalcTotalPrice(cartItems);
  const navigate = useNavigate();

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
            {totalPrice.toLocaleString()}
          </p>
        </li>
        <li className="total">
          <h6>TOTAL : </h6>
          <p>
            <span>￦</span>
            {totalPrice.toLocaleString()}
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

export default React.memo(HeaderCartBottom);
