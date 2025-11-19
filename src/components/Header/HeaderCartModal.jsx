import React from "react";
import HeaderCartCenter from "./HeaderCartCenter";
import HeaderCartBottom from "./HeaderCartBottom";
import ModalBtnClose from "../../assets/icons/modal_btn_x.svg";
import useCartStore from "../../stores/cartStore";

const HeaderCartModal = () => {
  const isCartOpen = useCartStore((state) => state.isCartOpen);
  const setIsCartOpen = useCartStore((state) => state.setIsCartOpen);

  return (
    <div id="header_cart" className={isCartOpen ? "active" : ""}>
      <div className="cart_black" onClick={() => setIsCartOpen(false)}></div>
      <div className="cart_inner">
        <div className="cart_top">
          <div className="closeBtn" onClick={() => setIsCartOpen(false)}>
            <img src={ModalBtnClose} alt="closeBtn" />
          </div>
          <h4>CART</h4>
        </div>
        <HeaderCartCenter />
        <HeaderCartBottom />
      </div>
    </div>
  );
};

export default React.memo(HeaderCartModal);
