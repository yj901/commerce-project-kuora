import React, { useState, useEffect } from "react";
import "./Footer.scss";
import { Link } from "react-router-dom";

const Footer = () => {
  const [isVisible, setIsVisible] = useState(false);

  // 스크롤 위치에 따라 버튼 표시 여부 결정
  useEffect(() => {
    const toggleVisibility = () => {
      const footer = document.querySelector(".footer");
      const footerTop = footer ? footer.getBoundingClientRect().top : 0;
      const windowHeight = window.innerHeight;

      if (window.pageYOffset > 300) {
        setIsVisible(true);

        // Footer와 버튼 사이 간격 계산 (Footer가 뷰포트에 들어오기 시작할 때)
        if (footerTop < windowHeight) {
          const button = document.querySelector(".scroll-to-top");
          if (button) {
            // Footer 상단에서 10px 위에 버튼 위치
            const newBottom = windowHeight - footerTop + 10;
            button.style.bottom = `${newBottom}px`;
          }
        } else {
          // 기본 위치로 복원
          const button = document.querySelector(".scroll-to-top");
          if (button) {
            button.style.bottom = "30px";
          }
        }
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    // 초기 실행
    toggleVisibility();

    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  // 상단으로 스크롤 이동 함수
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="footer">
      <div className="footer-content inner">
        <div className="footer-columns">
          <div className="footer-column">
            <h3>COMPANY</h3>
            <div className="footer-info">
              <p>
                <span className="bold-text">KUORA</span>
              </p>
              <p>
                <span className="bold-text">OWNER</span> 구여진
              </p>
              <p>
                <span className="bold-text">BUSINESS LICENSE</span> 123-45-00678
              </p>
              <p>
                <span className="bold-text">ONLINE LICENSE</span>{" "}
                제2025-서울강남-01234
              </p>
              <p>서울특별시 강남구 강남대로 123 IJK빌딩 11층</p>
            </div>
          </div>

          <div className="footer-column">
            <h3>CONTACT US</h3>
            <div className="footer-info">
              <p>
                <span className="bold-text">02-0123-4567</span>
              </p>
              <p>
                <span className="bold-text">INFO@KUORA.CO.KR</span>
              </p>
              <p>MON-FRI 10:00 - 18:00</p>
              <p>BREAK TIME 13:00 - 14:00</p>
            </div>
          </div>

          <div className="footer-column">
            <h3>INFO</h3>
            <div className="footer-info">
              <p>
                <span className="bold-text">NOTICE</span>
              </p>
              <p>
                <span className="bold-text">Q&A</span>
              </p>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="copyright">
            © COPYRIGHT KUORA. ALL RIGHTS RESERVED.
          </div>
          <div className="footer-links">
            <p>TERMS OF USE</p>
            <span className="divider">|</span>
            <p>PRIVACY POLICY</p>
            <span className="divider">|</span>
            <p>SHOP GUIDE</p>
          </div>
        </div>
      </div>

      {/* 상단으로 이동 버튼 */}
      <button
        className={`scroll-to-top ${isVisible ? "visible" : ""}`}
        onClick={scrollToTop}
        aria-label="상단으로 이동"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M18 15l-6-6-6 6" />
        </svg>
      </button>
    </footer>
  );
};

export default Footer;
