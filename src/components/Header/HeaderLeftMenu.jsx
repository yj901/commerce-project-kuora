import { Link } from "react-router-dom";
import React from "react";
import ModalBtnClose from "../../assets/icons/modal_btn_x.svg";

const HeaderLeftMenu = ({ isActive, setisActive }) => {
  return (
    <div id="header_menu" className={isActive ? "active" : ""}>
      <div className="menu_black" onClick={() => setisActive(false)}></div>
      <div className="menu_bg">
        <div className="closeBtn" onClick={() => setisActive(false)}>
          <img src={ModalBtnClose} alt="closeBtn" />
        </div>
        <ul id="gnb">
          <li>
            <span>PRODUCTS</span>
            <ul className="h_menu_list">
              <li>
                <Link to={"/products?category=sofas"}>SOFAS</Link>
              </li>
              <li>TABLES</li>
              <li>CHAIRS</li>
              <li>SHELVES</li>
              <li>BEDS</li>
            </ul>
          </li>
          <li>
            <span>EVENTS</span>
            <ul className="h_menu_list">
              <li>
                <Link to={"/event"}>EVENT</Link>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default HeaderLeftMenu;
