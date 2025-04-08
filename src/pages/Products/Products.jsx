import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "../../styles/_global.scss";
import productsData from "../../db/products.json"; // JSON 파일 경로 추가
import "./Products.scss";
import ProductCard from "../../components/ProductCard/ProductCard";

const Products = () => {
  // URL에서 카테고리 파라미터 가져오기
  const { category: urlCategory } = useParams();

  // 상태 관리
  const [products, setProducts] = useState([]);

  const [category, setCategory] = useState(() => {
    if (urlCategory) {
      // URL에서 받은 카테고리를 싱글 폼으로 변환 (예: 'sofas' -> 'sofa')
      const singularCategory = urlCategory.endsWith("s")
        ? urlCategory.slice(0, -1)
        : urlCategory;
      return singularCategory.toUpperCase();
    }
    return "SOFA"; // 기본값
  });
  const [designers, setDesigners] = useState([]); // 디자이너 목록을 위한 상태
  const [materials, setMaterials] = useState([]); // 재질 목록을 위한 상태
  const [filters, setFilters] = useState({
    materials: "",
    designer: "",
    sort: "",
  });

  // 드롭다운 메뉴 상태 관리
  const [openDropdown, setOpenDropdown] = useState(null);

  // 첫 번째 useEffect: URL 파라미터 변경 감지 및 카테고리 상태 업데이트
  useEffect(() => {
    if (urlCategory) {
      // URL이 변경되면 카테고리도 업데이트
      const singularCategory = urlCategory.endsWith("s")
        ? urlCategory.slice(0, -1)
        : urlCategory;
      setCategory(singularCategory.toUpperCase());
    }
  }, [urlCategory]);

  // 두 번째 useEffect: 카테고리 상태 변경에 따른 제품 데이터 로드 (기존 코드)
  useEffect(() => {
    try {
      const categoryKey = category.toLowerCase() + "s";
      const categoryProducts = productsData.products[categoryKey] || [];

      setProducts(categoryProducts);

      // 고유한 디자이너 목록 추출
      const uniqueDesigners = [
        ...new Set(categoryProducts.map((product) => product.info.designer)),
      ];
      setDesigners(uniqueDesigners);

      // 고유한 재질 목록 추출
      const uniqueMaterials = [
        ...new Set(categoryProducts.map((product) => product.info.materials)),
      ];
      setMaterials(uniqueMaterials);
    } catch (error) {
      console.error("Error loading products:", error);
      // 오류 발생 시 더미 데이터 사용
      const dummyProducts = [];
      for (let i = 1; i <= 9; i++) {
        dummyProducts.push({
          code: i,
          title: `BUBBLE ${(i % 3) + 1}`,
          product: "SOFA",
          price: 300000 + (i % 5) * 10000,
          designer: `Designer ${(i % 3) + 1}`,
          materials: i % 2 === 0 ? "fabric" : "leather",
          img: "/path/to/placeholder.jpg",
        });
      }
      setProducts(dummyProducts);
      // 로딩 상태 해제 (선택 사항)
      // setLoading(false);
    }
  }, [category]);

  // 카테고리 변경 핸들러 - 여기에 배치
  const handleCategoryChange = (newCategory) => {
    setCategory(newCategory.toUpperCase());
  };

  // 필터 변경 핸들러
  const handleFilterChange = (type, value) => {
    setFilters((prev) => ({
      ...prev,
      [type]: value,
    }));
    setOpenDropdown(null); // 선택 후 드롭다운 닫기
  };

  // 드롭다운 토글 함수
  const toggleDropdown = (dropdown) => {
    if (openDropdown === dropdown) {
      setOpenDropdown(null);
    } else {
      setOpenDropdown(dropdown);
    }
  };

  // 필터링된 제품 가져오기 - JSON 구조에 맞게 수정
  const filteredProducts = products
    .filter((product) => {
      // 카테고리 필터링은 이미 fetch에서 처리됨

      // 재질 필터링
      if (filters.materials && product.info.materials !== filters.materials)
        return false;

      // 디자이너 필터링
      if (filters.designer && product.info.designer !== filters.designer)
        return false;

      // 가격 필터링
      return true;
    })
    .sort((a, b) => {
      // 가격 정렬
      if (filters.sort === "asc") {
        return a.price - b.price; // 오름차순
      } else if (filters.sort === "desc") {
        return b.price - a.price; // 내림차순
      }
      return 0; // 기본 정렬 없음
    });

  return (
    <>
      <div className="products-page">
        <div className="products-header inner">
          <h1>{category}S</h1>
          <p>DESIGNED AND MANUFACTURED BY KUORA</p>
        </div>

        <div className="filter-bar-wrapper">
          <div className="filter-bar inner">
            {/* 재질 필터 */}
            <div className="filter-dropdown">
              <div
                className="filter-dropdown-header"
                onClick={() => toggleDropdown("materials")}
              >
                <span>FILTER BY MATERIAL</span>
                <i
                  className={`arrow ${
                    openDropdown === "materials" ? "up" : "down"
                  }`}
                ></i>
              </div>
              {openDropdown === "materials" && (
                <div className="filter-dropdown-content">
                  <div className="dropdown-line"></div>
                  <div className="dropdown-options">
                    <label>
                      <input
                        type="checkbox"
                        checked={filters.materials === ""}
                        onChange={() => handleFilterChange("materials", "")}
                      />
                      All Materials
                    </label>
                    {materials.map((material) => (
                      <label key={material}>
                        <input
                          type="checkbox"
                          checked={filters.materials === material}
                          onChange={() =>
                            handleFilterChange("materials", material)
                          }
                        />
                        {material.charAt(0).toUpperCase() + material.slice(1)}
                      </label>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* 디자이너 필터 */}
            <div className="filter-dropdown">
              <div
                className="filter-dropdown-header"
                onClick={() => toggleDropdown("designer")}
              >
                <span>FILTER BY DESIGNER</span>
                <i
                  className={`arrow ${
                    openDropdown === "designer" ? "up" : "down"
                  }`}
                ></i>
              </div>
              {openDropdown === "designer" && (
                <div className="filter-dropdown-content">
                  <div className="dropdown-line"></div>
                  <div className="dropdown-options">
                    <label>
                      <input
                        type="checkbox"
                        checked={filters.designer === ""}
                        onChange={() => handleFilterChange("designer", "")}
                      />
                      All Designers
                    </label>
                    {designers.map((designer) => (
                      <label key={designer}>
                        <input
                          type="checkbox"
                          checked={filters.designer === designer}
                          onChange={() =>
                            handleFilterChange("designer", designer)
                          }
                        />
                        {designer}
                      </label>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* 가격 필터 */}
            <div className="filter-dropdown">
              <div
                className="filter-dropdown-header"
                onClick={() => toggleDropdown("sort")}
              >
                <span>SORT BY PRICE</span>
                <i
                  className={`arrow ${openDropdown === "sort" ? "up" : "down"}`}
                ></i>
              </div>
              {openDropdown === "sort" && (
                <div className="filter-dropdown-content">
                  <div className="dropdown-line"></div>
                  <div className="dropdown-options">
                    <label>
                      <input
                        type="checkbox"
                        checked={filters.sort === ""}
                        onChange={() => handleFilterChange("sort", "")}
                      />
                      Default
                    </label>
                    <label>
                      <input
                        type="checkbox"
                        checked={filters.sort === "asc"}
                        onChange={() => handleFilterChange("sort", "asc")}
                      />
                      Price: Low to High
                    </label>
                    <label>
                      <input
                        type="checkbox"
                        checked={filters.sort === "desc"}
                        onChange={() => handleFilterChange("sort", "desc")}
                      />
                      Price: High to Low
                    </label>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="products-grid inner">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => {
              console.log("Product data:", product);
              return (
                <ProductCard
                  key={product.info.code}
                  product={{
                    code: product.info.code,
                    title: product.title,
                    price: product.price,
                    img: product.img,
                  }}
                  showDivider={true}
                />
              );
            })
          ) : (
            <div className="no-products">
              <p>No products found matching your filters.</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Products;
