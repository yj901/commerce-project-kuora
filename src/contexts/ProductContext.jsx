import React, { createContext, useState, useContext, useEffect } from "react";

// Context 생성
const ProductContext = createContext();

// Context Provider 컴포넌트
export const ProductProvider = ({ children }) => {
  const [allProducts, setAllProducts] = useState({});
  const [currentCategory, setCurrentCategory] = useState("SOFA");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [loading, setLoading] = useState(false);

  // 모든 제품 데이터 로드
  useEffect(() => {
    const dbData = "https://yj901.github.io/kuora-db/db/products.json";

    setLoading(true);
    fetch(dbData)
      .then((response) => response.json())
      .then((data) => {
        setAllProducts(data.products);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error loading products:", error);
        setLoading(false);
      });
  }, []);

  // 카테고리 변경 함수
  const changeCategory = (category) => {
    setCurrentCategory(category.toUpperCase());
  };

  // 제품 선택 함수
  const selectProduct = (productId) => {
    // sofas, armchairs 등 모든 카테고리에서 제품 찾기
    for (const category in allProducts) {
      const found = allProducts[category].find(
        (product) => product.info.code === parseInt(productId)
      );
      if (found) {
        setSelectedProduct(found);
        return found;
      }
    }
    return null;
  };

  // Context 값
  const value = {
    allProducts,
    // currentCategory,
    // changeCategory,
    // selectedProduct,
    // selectProduct,
    // loading,
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

// 휘찬아 화이팅
