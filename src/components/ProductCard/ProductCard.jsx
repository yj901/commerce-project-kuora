import React from "react";
import { Link } from "react-router-dom";
import { resolveImage } from "../../utils/resolveImg";
import "./ProductCard.scss";

const ProductCard = ({ product, showDivider = true }) => {
  // 제품 정보 구조 분해 할당
  const { code, title, price, img } = product;

  let thumbnailImage;

  //이미지 경로 바꾸는 함수 추가
  if (img && img.thumbnailImg && img.thumbnailImg.length > 0) {
    // JSON에 있는 상대 경로 그대로 resolveImage에 넘김
    const imgPath = img.thumbnailImg[0];
    thumbnailImage = resolveImage(imgPath);
  } else {
    thumbnailImage = "/img/placeholder.jpg"; // 대체 이미지 (필요시 public 폴더에 추가)
  }

  return (
    <div className={`product-card ${showDivider ? "with-divider" : ""}`}>
      <Link to={`/detail?id=${code}`}>
        <div className="product-image">
          <img src={thumbnailImage} alt={title} />
        </div>
        <div className="product-info">
          <h3>{title}</h3>
          <p className="price">₩{price.toLocaleString()}</p>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
