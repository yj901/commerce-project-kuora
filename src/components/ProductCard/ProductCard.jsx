import React, { useState } from "react";
import { Link } from "react-router-dom";
import { resolveImage } from "../../utils/resolveImg";
import "./ProductCard.scss";

const ProductCard = ({ product, showDivider = true }) => {
  // 마우스 오버 상태를 추적하는 state 추가
  const [isHovered, setIsHovered] = useState(false);

  // 제품 정보 구조 분해 할당
  const { code, title, price, img } = product;

  let thumbnailImage;
  let backgroundImage;

  // 썸네일 이미지 경로 설정
  if (img && img.thumbnailImg && img.thumbnailImg.length > 0) {
    const imgPath = img.thumbnailImg[0];
    thumbnailImage = resolveImage(imgPath);
  } else {
    thumbnailImage = "/img/placeholder.jpg"; // 대체 이미지
  }

  // 배경 이미지 경로 설정
  if (img && img.backgroundImg && img.backgroundImg.length > 0) {
    const bgImgPath = img.backgroundImg[0];
    backgroundImage = resolveImage(bgImgPath);
  } else {
    backgroundImage = thumbnailImage; // 배경 이미지가 없으면 썸네일 이미지 사용
  }

  // 현재 표시할 이미지 결정
  const currentImage = isHovered ? backgroundImage : thumbnailImage;

  return (
    <div
      className={`product-card ${showDivider ? "with-divider" : ""}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link to={`/detail?id=${code}`}>
        <div className="product-image">
          <img src={currentImage} alt={title} />
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
