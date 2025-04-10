// components/Breadcrumbs/Breadcrumbs.jsx
import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./Breadcrumb.scss";

const routeNameMap = {
  "/": "Home",
  "/event": "Event",
  "/products": "Products",
  "/products/:category": "Category",
  "/detail": "Detail",
};

function Breadcrumb() {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);
  console.log(pathnames);

  const crumbs = pathnames.map((segment, index) => {
    const path = "/" + pathnames.slice(0, index + 1).join("/");

    const name =
      routeNameMap[path] || segment.charAt(0).toUpperCase() + segment.slice(1);

    return (
      <span key={path}>
        <span className="arrow">&gt;{index > 0}</span>
        <Link to={path}>{name}</Link>
      </span>
    );
  });

  return (
    <div className="breadcrumb">
      <div className="inner">
        <Link to="/">Home</Link>
        {crumbs.length > 0 && crumbs}
      </div>
    </div>
  );
}

export default Breadcrumb;
