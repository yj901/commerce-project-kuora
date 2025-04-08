// ProductCard.jsx 파일 수정
import React from "react";
import { Link } from "react-router-dom";
import "./ProductCard.scss";

const ProductCard = ({ product, showDivider = true }) => {
  const { code, title, price, img } = product;

  const getThumbnailPath = () => {
    try {
      if (img && img.thumbnailImg && img.thumbnailImg.length > 0) {
        let imgPath = img.thumbnailImg[0];
        console.log("Original imgPath:", imgPath);

        // 경로가 ./imgs/로 시작하는 경우 처리
        if (imgPath.startsWith("./imgs/")) {
          // React의 public 폴더 기준으로 경로 변환
          return `${process.env.PUBLIC_URL}${imgPath.substring(1)}`;
        }

        // 이미지 경로가 상대 경로인 경우 (./로 시작하지 않는 경우)
        if (!imgPath.startsWith("/") && !imgPath.startsWith("./")) {
          return `${process.env.PUBLIC_URL}/imgs/${imgPath}`;
        }

        // 경로가 /로 시작하는 경우 (절대 경로)
        return imgPath;
      }

      // 단순 문자열인 경우
      if (typeof img === "string") {
        if (img.startsWith("./")) {
          return `${process.env.PUBLIC_URL}${img.substring(1)}`;
        }
        return img;
      }

      // 기본 이미지 (require 사용하지 않음)
      return `https://via.placeholder.com/300x200?text=${title || "Product"}`;
    } catch (error) {
      console.error("이미지 경로 처리 중 오류:", error);
      console.log("문제가 된 이미지 데이터:", img);
      return `https://via.placeholder.com/300x200?text=${title || "Error"}`;
    }
  };

  const thumbnailImage = getThumbnailPath();
  console.log("최종 이미지 경로:", thumbnailImage);

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
