import React, { useEffect, useState } from "react";
import { useProducts } from "../../contexts/ProductContext";
import ProductCard from "../ProductCard/ProductCard";

const EventProducts = () => {
  const [eliasProducts, setEliasProducts] = useState([]);
  const { allProducts } = useProducts();

  useEffect(() => {
    const filtered = Object.values(allProducts)
      .flat()
      .filter((product) => product.info?.collection === "Elias Klemens");

    setEliasProducts(filtered);
  }, [allProducts]);

  return (
    <>
      <section className="featured-section">
        <h2>EXHIBITION Products LIST</h2>
        <div className="products-grid">
          {eliasProducts.map((product) => (
            <ProductCard
              key={product.info.code}
              product={{
                code: product.info.code,
                title: product.title,
                price: product.price,
                img: product.img,
              }}
              showDivider={false}
            />
          ))}
        </div>
      </section>
    </>
  );
};

export default React.memo(EventProducts);
