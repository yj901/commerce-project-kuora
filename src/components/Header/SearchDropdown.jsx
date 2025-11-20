import React from "react";
import { Link } from "react-router-dom";
import "./SearchDropdown.scss";

const SearchDropdown = ({ results, onClose }) => {
  if (results.length === 0) return null;
  console.log(results);
  return (
    <div className="search_dropdown">
      {results.map((product) => (
        <Link
          key={product.info.code}
          to={`/detail?id=${product.info.code}`}
          className="search_dropdown_item"
          onClick={onClose}
        >
          <div className="item_image">
            <img src={product.img.thumbnailImg[0]} alt={product.title} />
          </div>
          <div className="item_info">
            <p className="item_title">{product.title}</p>
            <p className="item_price">₩{product.price.toLocaleString()}</p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default React.memo(SearchDropdown);
