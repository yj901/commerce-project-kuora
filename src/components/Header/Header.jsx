import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "./Header.scss";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  const isHome = location.pathname === "/"; // 홈 확인

  useEffect(() => {
    if (!isHome) return; //홈이 아니면 스크롤 이벤트x

    const handleScroll = () => {
      if (window.scrollY > 50) {
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
        <div className="header_inner">
          <h1 className="header_logo">
            <img src="/assets/icons/logo_kuora.svg" />
          </h1>

          <div className="header_tops">
            <div className="menuBtn">SHOP</div>
            <div className="btns">
              <div className="search_btn">
                <img src="/assets/icons/searchBtn.svg" />
              </div>
              <div className="cart_btn">
                <img src="/assets/icons/cartBtn.svg" />
              </div>
            </div>
          </div>

          {/* <div className="header_left">
            <ul id="gnb">
              <li>
                <a href="">ARTIST</a>
              </li>
              <li>
                <a href="">MUSIC</a>
              </li>
              <li>
                <a href="">MAGAZINE</a>
              </li>
            </ul>
          </div>

          <div className="header_right">
            <form
              id="search_form_pc"
              name="search_bar_pc"
              method="#"
              action="post"
              className="search_bar"
            >
              <button className="search_btn">
                <img src="./imgs/h_search.svg" alt="search" />
              </button>
              <input
                className="search_txt"
                type="text"
                placeholder="찾으시는 상품을 입력해주세요."
              />
            </form>
          </div>

          <div className="header_right_m">
            <button className="search_btn_m">
              <img src="./imgs/h_search_m.svg" alt="search" />
            </button>

            <div className="trigger_bar_m">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>

          <div id="search_area_m">
            <form
              id="search_form_mb"
              name="search_bar_mb"
              method="#"
              action="post"
              className="search_bar"
            >
              <button className="search_btn">
                <img src="./imgs/h_search.svg" alt="search" />
              </button>
              <input
                className="search_txt"
                type="text"
                placeholder="찾으시는 상품을 입력해주세요."
              />
            </form>
            <button className="search_close_m">
              <img src="./imgs/h_search__back_m.svg" alt="SearchCloseBtn" />
            </button>
          </div> */}
        </div>
      </header>
    </>
  );
};

export default Header;
