import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useProducts } from "../../contexts/ProductContext";
import { useCart } from "../../contexts/CartContext";
import { resolveImage } from "../../utils/resolveImg";

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
    <div className="detail-page">
      <h2>{product.title}</h2>
      <p>{product.desc_fullView}</p>
      <p>₩ {product.price.toLocaleString()}</p>
      {product.img.thumbnailImg.map((thumb, index) => (
        <img
          key={index}
          src={resolveImage(thumb)}
          alt={`${product.title} ${index + 1}`}
        />
      ))}
      {product.img.backgroundImg.map((thumb, index) => (
        <img
          key={index}
          src={resolveImage(thumb)}
          alt={`${product.title} ${index + 1}`}
        />
      ))}
      <button onClick={handleAddToCart}>🛒 장바구니 담기</button>
    </div>
  );
};

export default Detail;
