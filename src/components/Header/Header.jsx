import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useCart } from "../../contexts/CartContext";
import HeaderLeftMenu from "./HeaderLeftMenu";
import HeaderCartModal from "./HeaderCartModal";
import IconSearchBtn from "../../assets/icons/searchBtn.svg";
import IconCartBtn from "../../assets/icons/cartBtn.svg";
import IconLogo from "../../assets/icons/logo_kuora.svg";
import IconClose from "../../assets/icons/header_search_close.svg";

import "./Header.scss";

const Header = () => {
  const { isCartOpen, setIsCartOpen } = useCart();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuActive, setIsMenuActive] = useState(false);
  const location = useLocation();

  const isHome = location.pathname === "/"; // 홈 확인

  useEffect(() => {
    setIsMenuActive(false);
    setIsCartOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (!isHome) return;

    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isHome]);

  return (
    <>
      <header
        id="header"
        className={`header ${
          isHome ? (isScrolled ? "scrolled" : "transparent") : "default"
        }`}
      >
        <div className="header_inner inner">
          <h1 className="header_logo">
            <Link to={"/"}>
              <img src={IconLogo} alt="logo" />
            </Link>
          </h1>

          <div className="header_tops">
            <div className="menuBtn" onClick={() => setIsMenuActive(true)}>
              SHOP
            </div>
            <div className="btns">
              <div className="search_bar">
                <form
                  id="search_form_pc"
                  name="search_bar_pc"
                  method="#"
                  action="post"
                  className="search_form"
                >
                  <div className="input_wrap">
                    <input
                      className="search_txt"
                      type="text"
                      placeholder="찾으시는 상품을 입력해주세요."
                    />
                  </div>
                  <button className="search_btn">
                    <img src={IconSearchBtn} alt="searchBtn" />
                  </button>
                  <div className="mb_closeBtn ">
                    <img src={IconSearchBtn} alt="searchBtn" />
                    <img src={IconClose} alt="closeBtn" />
                  </div>
                </form>
              </div>
              <div className="cart_btn" onClick={() => setIsCartOpen(true)}>
                <img src={IconCartBtn} alt="cartBtn" />
              </div>
            </div>
          </div>
        </div>
        <form
          id="search_form_mb"
          name="search_bar_mb"
          method="#"
          action="post"
          className="search_bar"
        >
          <div className="input_wrap">
            <input
              className="search_txt"
              type="text"
              placeholder="찾으시는 상품을 입력해주세요."
            />
          </div>
          <button className="search_btn">
            <img src={IconSearchBtn} alt="searchBtn" />
          </button>
        </form>
        <HeaderLeftMenu isActive={isMenuActive} setisActive={setIsMenuActive} />
        <HeaderCartModal />
      </header>
    </>
  );
};

export default Header;
