import { useState, useEffect } from "react";
import { Link, useLocation, Navigate, useNavigate } from "react-router-dom";
import { useProducts } from "../../contexts/ProductContext";
import { useCart } from "../../contexts/CartContext";
import HeaderLeftMenu from "./HeaderLeftMenu";
import HeaderCartModal from "./HeaderCartModal";
import IconSearchBtn from "../../assets/icons/searchBtn.svg";
import IconCartBtn from "../../assets/icons/cartBtn.svg";
import IconLogo from "../../assets/icons/logo_kuora.svg";
import IconClose from "../../assets/icons/header_search_close.svg";

import "./Header.scss";

const Header = () => {
  const { setIsCartOpen } = useCart();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuActive, setIsMenuActive] = useState(false);
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [showNoResult, setShowNoResult] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { allProducts } = useProducts();

  const isHome = location.pathname === "/";

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

  const AllsearchProduct = Object.values(allProducts).flat();

  const onCheckEnter = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();

      const keyword = e.target.value.toLowerCase();

      const filterKeyword = AllsearchProduct.find(
        (product) => product?.title?.toLowerCase() === keyword
      );

      const filterCode = filterKeyword?.info?.code;

      if (filterKeyword) {
        navigate(`/detail?id=${filterCode}`);
      } else {
        setShowNoResult(true);
        setTimeout(() => setShowNoResult(false), 3000);
      }

      e.target.value = "";
    }
  };

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
                  className="search_form"
                  onSubmit={(e) => e.preventDefault()}
                >
                  <div className="input_wrap">
                    <input
                      className={
                        isSearchActive ? "active search_txt" : "search_txt"
                      }
                      type="text"
                      placeholder="찾으시는 상품을 입력해주세요."
                      onKeyUp={onCheckEnter}
                    />
                    {showNoResult && (
                      <div className="noSearchbox">
                        검색하신 상품이 존재하지 않습니다.
                      </div>
                    )}
                  </div>

                  <button
                    id="search_btn"
                    onClick={() => {
                      setIsSearchActive(!isSearchActive);
                    }}
                  >
                    <img src={IconSearchBtn} alt="searchBtn1" />
                  </button>
                  <div
                    id="mb_closeBtn"
                    className={isSearchActive ? "active" : undefined}
                    onClick={() => setIsSearchActive(!isSearchActive)}
                  >
                    <img src={IconSearchBtn} alt="searchBtn2" />
                    <img src={IconClose} alt="closeBtn2" />
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
          onSubmit={(e) => e.preventDefault()}
          className={isSearchActive ? "active" : undefined}
        >
          <div className="input_wrap">
            <input
              className="search_txt"
              type="text"
              placeholder="찾으시는 상품을 입력해주세요."
              onKeyUp={onCheckEnter}
            />
            {showNoResult && (
              <div className="noSearchbox">
                검색하신 상품이 존재하지 않습니다.
              </div>
            )}
          </div>
          <button className="search_btn" onClick={onCheckEnter}>
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
