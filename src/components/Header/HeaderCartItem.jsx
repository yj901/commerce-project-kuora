import React from "react";
import { useCart } from "../../contexts/CartContext";
import IconRemove from "../../assets/icons/remove_icon.svg";

const HeaderCartItem = ({ item }) => {
  const { removeFromCart, increaseQuantity, decreaseQuantity } = useCart();

  return (
    <div className="cart_item">
      <div className="top_item">
        <figure>
          <img src={item.thumbnail} alt={item.title} />
        </figure>
        <div className="txt">
          <h4>{item.title}</h4>
          <h5>
            <span>￦</span>
            {item.price.toLocaleString()}
          </h5>
        </div>
      </div>
      <ul className="bot_items">
        <li className="quantity_controls">
          <button onClick={() => decreaseQuantity(item.code)}>-</button>
          <p className="count">{item.quantity}</p>
          <button onClick={() => increaseQuantity(item.code)}>+</button>
        </li>
        <li className="removeBtn" onClick={() => removeFromCart(item.code)}>
          <div className="remove_wrap">
            <img src={IconRemove} alt="removeIcon" />
            <p>Remove</p>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default HeaderCartItem;
