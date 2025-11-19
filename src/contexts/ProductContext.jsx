import React, { createContext, useState, useContext, useEffect } from "react";

// Context 생성
const ProductContext = createContext();

// Context Provider 컴포넌트
export const ProductProvider = ({ children }) => {
  const [allProducts, setAllProducts] = useState({});

  // 모든 제품 데이터 로드
  useEffect(() => {
    const dbData = "https://yj901.github.io/kuora-db/db/products.json";

    fetch(dbData)
      .then((response) => response.json())
      .then((data) => {
        setAllProducts(data.products);
      })
      .catch((error) => {
        console.error("Error loading products:", error);
      });
  }, []);

  // Context 값
  const value = {
    allProducts,
  };

  return (
    <ProductContext.Provider value={value}>{children}</ProductContext.Provider>
  );
};

// 커스텀 훅으로 Context 사용 간소화
export const useProducts = () => {
  const context = useContext(ProductContext);

  if (context === undefined) {
    throw new Error("useProducts must be used within a ProductProvider");
  }
  return context;
};
