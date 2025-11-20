import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useProducts } from "../../contexts/ProductContext";

import CustomPaging from "../../components/DetailSlider/DetailSlider";
import "./Detail.scss";
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb";
import NotFound from "../NotFound/NotFound";
import useCartStore from "../../stores/cartStore";

const Detail = () => {
  const { allProducts } = useProducts();
  const setIsCartOpen = useCartStore((state) => state.setIsCartOpen);
  const addToCart = useCartStore((state) => state.addToCart);
  const [searchParams] = useSearchParams();
  const productId = parseInt(searchParams.get("id"));
  const [product, setProduct] = useState(undefined);
  const [quantity, setQuantity] = useState(1); // 수량 상태 추가

  useEffect(() => {
    if (allProducts && productId) {
      const found = Object.values(allProducts)
        .flat()
        .find((item) => String(item.info.code) === String(productId));
      setProduct(found);
    }
  }, [allProducts, productId]);

  // 수량 증가 함수
  const increaseQuantity = () => {
    if (quantity < 99) {
      setQuantity(quantity + 1);
    }
  };

  // 수량 감소 함수
  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  if (!productId) return <NotFound />;
  if (product === undefined) {
    return (
      <div className="detail-placeholder">
        <Breadcrumb />
      </div>
    );
  }
  if (product === null) return <NotFound />;

  const handleAddToCart = () => {
    const cartItem = {
      code: product.info.code,
      title: product.title,
      price: product.price,
      thumbnail: product.img.thumbnailImg[0],
      quantity: quantity, // 수량 추가
    };
    addToCart(cartItem, quantity); // 수량을 addToCart에 전달
    setIsCartOpen(true);
  };

  return (
    <>
      <Breadcrumb />
      <section className="detail_main">
        <div className="leftmain">
          <CustomPaging product={product} />
        </div>
        <div className="rightmain">
          <div className="rightmain_detail">
            <div className="topmain_detail">
              <div className="topmain_detail_header">{product.title}</div>
              <p>{product.desc_top}</p>
            </div>
            <div className="centermain_detail">
              <div className="maindetail">
                <span>
                  <b>COLOR</b>
                </span>
                <span>{product.info.color}</span>
              </div>
              <div className="maindetail">
                <span>
                  <b>SIZE</b>
                </span>
                <span>{product.info.size}</span>
              </div>
              <div className="maindetail">
                <span>
                  <b>MATERIAL</b>
                </span>
                <span>{product.info.materials}</span>
              </div>
              <div className="maindetail">
                <span>
                  <b>DESIGNER</b>
                </span>
                <span>{product.info.designer}</span>
              </div>
            </div>
            <div className="undermain_detail">
              <div className="undermain_detail_price">
                <span className="price">
                  ₩ {product.price.toLocaleString()}{" "}
                </span>
                <span className="tax">Including VAT</span>
              </div>
              <div className="delivery">
                Delivery Costs <i className="fas fa-circle-info"></i>
              </div>

              <div className="quantity">
                <div className="quantity-control">
                  <button
                    className="quantity-btn decrease"
                    onClick={decreaseQuantity}
                    disabled={quantity <= 1}
                  >
                    -
                  </button>
                  <span className="quantity-value">{quantity}</span>
                  <button
                    className="quantity-btn increase"
                    onClick={increaseQuantity}
                    disabled={quantity >= 99}
                  >
                    +
                  </button>
                </div>

                <button onClick={handleAddToCart} className="icon_button">
                  <i className="fas fa-shopping-cart"></i>
                  ADD TO CART
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="detail_center">
        <div className="inner">
          <h3>MORE DETAIL VIEW</h3>
          <div className="detail_image_wrap">
            <div className="DetailImage">
              {product.img.backgroundImg.map((thumb, index) => (
                <img
                  key={index}
                  src={thumb}
                  alt={`${product.title} ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
      <section className="detail_info">
        <div className="detail_info_wrap">
          <div className="left_detail_info">
            <div className="wrap">
              <div className="detail_info_title">
                DESCRIPTION/BETILLA3 SEATER SOFA
              </div>
              <p>{product.desc_fullView}</p>
            </div>
          </div>
          <div className="right_detail_info">
            <div className="wrap">
              <div className="detail_info_title">MORE IMFORMATION</div>
              <ul className="info-list">
                <li>
                  <span className="label">CODE</span>
                  <span className="value">{product.info.code}</span>
                  <span className="underline"></span>
                </li>
                <li>
                  <span className="label">DESIGNER</span>
                  <span className="value">{product.info.designer}</span>
                  <span className="underline"></span>
                </li>
                <li>
                  <span className="label">COLOR</span>
                  <span className="value">{product.info.color}</span>
                  <span className="underline"></span>
                </li>
                <li>
                  <span className="label">SIZE</span>
                  <span className="value">{product.info.size}</span>
                  <span className="underline"></span>
                </li>
                <li>
                  <span className="label">MATERIALS</span>
                  <span className="value">{product.info.materials}</span>
                  <span className="underline"></span>
                </li>
                {product?.info?.collection && (
                  <li>
                    <span className="label">COLLECTION</span>
                    <span className="value">{product.info.collection}</span>
                    <span className="underline"></span>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Detail;
