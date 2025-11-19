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
                <Link to={"/products/sofas"}>SOFAS</Link>
              </li>
              <li>
                <Link to={"/products/tables"}>TABLES</Link>
              </li>
              <li>
                <Link to={"/products/chairs"}>CHAIRS</Link>
              </li>
              <li>
                <Link to={"/products/shelves"}>SHELVES</Link>
              </li>
              <li>
                <Link to={"/products/beds"}>BEDS</Link>
              </li>
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

export default React.memo(HeaderLeftMenu);
