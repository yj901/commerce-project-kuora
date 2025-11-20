import { useState, useEffect, useCallback, useMemo } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useProducts } from "../../contexts/ProductContext";
import HeaderLeftMenu from "./HeaderLeftMenu";
import HeaderCartModal from "./HeaderCartModal";
import IconSearchBtn from "../../assets/icons/searchBtn.svg";
import IconCartBtn from "../../assets/icons/cartBtn.svg";
import IconLogo from "../../assets/icons/logo_kuora.svg";
import IconClose from "../../assets/icons/header_search_close.svg";
import useCartStore from "../../stores/cartStore";
import SearchDropdown from "./SearchDropdown";

import "./Header.scss";

const Header = () => {
  const setIsCartOpen = useCartStore((state) => state.setIsCartOpen);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuActive, setIsMenuActive] = useState(false);
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [debouncedKeyword, setDebouncedKeyword] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const { allProducts } = useProducts();

  const isHome = location.pathname === "/";

  useEffect(() => {
    setIsMenuActive(false);
    setIsCartOpen(false);
    setIsSearchActive(false);
    setSearchKeyword("");
    setDebouncedKeyword("");
  }, [location.pathname, setIsCartOpen]);

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

  //  debounce 효과
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedKeyword(searchKeyword);
    }, 300); // 300ms 대기

    return () => clearTimeout(timer);
  }, [searchKeyword]);

  const AllsearchProduct = useMemo(
    () => Object.values(allProducts).flat(),
    [allProducts]
  );

  //  debouncedKeyword 사용
  const searchResults = useMemo(() => {
    if (!debouncedKeyword.trim()) return [];

    return AllsearchProduct.filter((product) =>
      product?.title?.toLowerCase().includes(debouncedKeyword.toLowerCase())
    )
      .sort((a, b) => {
        const aIndex = a.title
          .toLowerCase()
          .indexOf(debouncedKeyword.toLowerCase());
        const bIndex = b.title
          .toLowerCase()
          .indexOf(debouncedKeyword.toLowerCase());

        if (aIndex !== bIndex) return aIndex - bIndex; // 1순위: 관련도
        return a.title.localeCompare(b.title); // 2순위: 알파벳
      })
      .slice(0, 5);
  }, [debouncedKeyword, AllsearchProduct]);

  const handleSearchInput = useCallback((e) => {
    setSearchKeyword(e.target.value); // 즉시 업데이트 (타이핑 반응)
  }, []);

  //검색
  const handleSearch = useCallback(() => {
    if (searchResults.length > 0) {
      const firstResult = searchResults[0];
      navigate(`/detail?id=${firstResult.info.code}`);
      setSearchKeyword("");
      setDebouncedKeyword("");
      setIsSearchActive(false);
    }
  }, [searchResults, navigate]);

  const onCheckEnter = useCallback(
    (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        handleSearch();
      }
    },
    [handleSearch]
  );

  const handleCloseDropdown = useCallback(() => {
    setSearchKeyword("");
    setDebouncedKeyword("");
  }, []);

  const handleSearchToggle = useCallback(() => {
    setIsSearchActive((prev) => !prev);
    setSearchKeyword("");
    setDebouncedKeyword("");
  }, []);

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
                      value={searchKeyword}
                      onChange={handleSearchInput}
                      onKeyDown={onCheckEnter}
                    />
                    {/* 검색 드롭다운 */}
                    {isSearchActive &&
                      debouncedKeyword &&
                      searchResults.length > 0 && (
                        <SearchDropdown
                          results={searchResults}
                          onClose={handleCloseDropdown}
                        />
                      )}
                    {/* 검색 결과 없음 */}
                    {isSearchActive &&
                      debouncedKeyword &&
                      searchResults.length === 0 && (
                        <div className="noSearchbox">
                          검색하신 상품이 존재하지 않습니다.
                        </div>
                      )}
                  </div>

                  <button
                    id="search_btn"
                    className={isSearchActive ? "active" : undefined}
                    onClick={handleSearchToggle}
                  >
                    <img src={IconSearchBtn} alt="searchBtn1" />
                    <img src={IconClose} alt="closeBtn1" />
                  </button>
                  <button
                    id="mb_closeBtn"
                    className={isSearchActive ? "active" : undefined}
                    onClick={handleSearchToggle}
                  >
                    <img src={IconSearchBtn} alt="searchBtn2" />
                    <img src={IconClose} alt="closeBtn2" />
                  </button>
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
              value={searchKeyword}
              onChange={handleSearchInput}
              onKeyDown={onCheckEnter}
            />
            {/* 모바일 드롭다운 */}
            {debouncedKeyword && searchResults.length > 0 && (
              <SearchDropdown
                results={searchResults}
                onClose={handleCloseDropdown}
              />
            )}
            {/* 모바일 검색 결과 없음 */}
            {debouncedKeyword && searchResults.length === 0 && (
              <div className="noSearchbox">
                검색하신 상품이 존재하지 않습니다.
              </div>
            )}
          </div>
          <button className="search_btn" onClick={handleSearch}>
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
