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

  // 브레드크럼에서 클릭을 막을 경로들
  const DISABLED_PATHS = new Set(["/products"]);

  const crumbs = pathnames.map((segment, index) => {
    const path = "/" + pathnames.slice(0, index + 1).join("/");

    const name =
      routeNameMap[path] || segment.charAt(0).toUpperCase() + segment.slice(1);

    const isLast = index === pathnames.length - 1;
    const isDisabled = DISABLED_PATHS.has(path);

    return (
      <span key={path}>
        {/* <span className="arrow">&gt;{index > 0}</span>
        <Link to={path}>{name}</Link> */}
        <span className="arrow">&gt;</span>
        {isLast || isDisabled ? (
          <span
            className={isDisabled ? "crumb disabled" : "crumb current"}
            {...(isLast ? { "aria-current": "page" } : {})}
          >
            {name}
          </span>
        ) : (
          <Link to={path} className="crumb">
            {name}+{" "}
          </Link>
        )}
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
