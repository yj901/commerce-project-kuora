import React from "react";
import "./Footer.scss";
import { Link } from "react-router-dom";

const Footer = () => {
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
                <Link to="/notice" className="bold-text">
                  NOTICE
                </Link>
              </p>
              <p>
                <Link to="/qna" className="bold-text">
                  Q&A
                </Link>
              </p>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="copyright">
            © COPYRIGHT KUORA. ALL RIGHTS RESERVED.
          </div>
          <div className="footer-links">
            <Link to="/terms">TERMS OF USE</Link>
            <span className="divider">|</span>
            <Link to="/privacy">PRIVACY POLICY</Link>
            <span className="divider">|</span>
            <Link to="/guide">SHOP GUIDE</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
