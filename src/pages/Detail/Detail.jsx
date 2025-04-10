import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useProducts } from "../../contexts/ProductContext";
import { useCart } from "../../contexts/CartContext";
import { resolveImage } from "../../utils/resolveImg";
import CustomPaging from "../../components/DetailSlider/DetailSlider";
import "./Detail.scss";
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb";

const Detail = () => {
  const { allProducts } = useProducts();
  const { addToCart, setIsCartOpen } = useCart();
  const [searchParams] = useSearchParams();
  const productId = parseInt(searchParams.get("id"));
  const [product, setProduct] = useState(null);

  useEffect(() => {
    if (allProducts && productId) {
      const found = Object.values(allProducts)
        .flat()
        .find((item) => String(item.info.code) === String(productId));
      setProduct(found);
    }
  }, [allProducts, productId]);

  if (!product) return <div>Loading...</div>;

  const handleAddToCart = () => {
    const cartItem = {
      code: product.info.code,
      title: product.title,
      price: product.price,
      thumbnail: resolveImage(product.img.thumbnailImg[0]),
    };
    addToCart(cartItem);
    setIsCartOpen(true);
  };

  return (
    <>
      <Breadcrumb />
      <section className="detail_main">
        <div className="leftmain">
          <CustomPaging product={product}/>
        </div>
        <div className="rightmain">
          <div className="rightmain_detail">
            <div className="topmain_detail">
              <div className="topmain_detail_header">
              {product.title}
              </div>
              <p>
                {product.desc_top}
              </p>
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
                <span className="price">₩ {product.price.toLocaleString()} </span>
                <span className="tax">Including VAT</span>
              </div>
              <div className="delivery">
                Delivery Costs <i className="fas fa-circle-info"></i>
              </div>
              <div className="quantity">
                <input className="text" type="text" />
                <buttonon onClick={handleAddToCart}class="icon_button">
                  <i class="fas fa-shopping-cart"></i>
                  ADD TO CART
                </buttonon>
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
            src={resolveImage(thumb)}
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
              <p>
              {product.desc_fullView}
              </p>
            </div>
          </div>
          <div className="right_detail_info">
            <div className="wrap">
              <div className="detail_info_title">MORE IMPORMATION</div>
              <ul class="info-list">
                <li>
                  <span class="label">CODE</span>
                  <span class="value">{product.info.code}</span>
                  <span class="underline"></span>
                </li>
                <li>
                  <span class="label">DESIGNER</span>
                  <span class="value">{product.info.designer}</span>
                  <span class="underline"></span>
                </li>
                <li>
                  <span class="label">COLOR</span>
                  <span class="value">{product.info.color}</span>
                  <span class="underline"></span>
                </li>
                <li>
                  <span class="label">SIZE</span>
                  <span class="value">{product.info.size}</span>
                  <span class="underline"></span>
                </li>
                <li>
                  <span class="label">MATERIALS</span>
                  <span class="value">{product.info.materials}</span>
                  <span class="underline"></span>
                </li>
                { product?.info?.collection && <li>
                  <span class="label">COLLECTION</span>
                  <span class="value">{product.info.collection}</span>
                  <span class="underline"></span>
                </li>}
                {/* <li>
                  <span class="label">NUMBER OF SEATS</span>
                  <span class="value">3</span>
                  <span class="underline"></span>
                </li>
                <li>
                  <span class="label">SEAT HEIGHT</span>
                  <span class="value">48CM</span>
                  <span class="underline"></span>
                </li>
                <li>
                  <span class="label">FILTER BY COLLECTION</span>
                  <span class="value">TIMELESS COLLECTION</span>
                  <span class="underline"></span>
                </li>
                <li>
                  <span class="label">COLOR</span>
                  <span class="value">ANTIQUE BROWN</span>
                  <span class="underline"></span>
                </li>
                <li>
                  <span class="label">FDFD</span>
                  <span class="value">ANTIQUE BROWN</span>
                  <span class="underline"></span>
                </li> */}
              </ul>
            </div>
          </div>
        </div>
      </section>
      <section className="more_item">
        <h3>MORE DETAIL VIEW</h3>
      </section>

      <div className="detail-page">
      </div>
    </>
  );
};

export default Detail;
