import React, { useCallback, useMemo, useState } from "react";
import { Link } from "react-router-dom";

import "./ProductCard.scss";

const ProductCard = ({ product, showDivider = true }) => {
  // 마우스 오버 상태를 추적하는 state 추가
  const [isHovered, setIsHovered] = useState(false);

  // 제품 정보 구조 분해 할당
  const { code, title, price, img } = product;

  //이미지 경로 계산 메모이제이션
  const { thumbnailImage, backgroundImage } = useMemo(() => {
    let thumbnail;
    let background;

    // 썸네일 이미지 경로 설정
    if (img?.thumbnailImg?.length > 0) {
      thumbnail = img.thumbnailImg[0];
    } else {
      thumbnail = "/img/placeholder.jpg";
    }

    // 배경 이미지 경로 설정
    if (img?.thumbnailImg?.length > 0) {
      background = img.backgroundImg[0];
    } else {
      background = thumbnail; // 배경 이미지가 없으면 썸네일 이미지 사용
    }

    return { thumbnailImage: thumbnail, backgroundImage: background };
  }, [img]);

  const handleMouseEnter = useCallback(() => setIsHovered(true), []);
  const handleMouseLeave = useCallback(() => setIsHovered(false), []);

  // 현재 표시할 이미지 결정
  const currentImage = isHovered ? backgroundImage : thumbnailImage;

  return (
    <div
      className={`product-card ${showDivider ? "with-divider" : ""}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Link to={`/detail?id=${code}`}>
        <div className="product-image">
          <img src={currentImage} alt={title} loading="lazy" />
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
