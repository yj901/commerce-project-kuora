import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./Products.scss";
import ProductCard from "../../components/ProductCard/ProductCard";
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb";

const Products = () => {
  // URL에서 카테고리 파라미터 가져오기
  // 유즈파람스로 받은 카테고리 변수명을 urlCategory라는 변수명으로 쓰고싶을때 (밑에 category 스테이트가 있기때문)
  // 구조 분해 + 이름 바꾸기(별칭 부여) 문법임
  // useParams - :id값 즉 tables,.. 값가져옴
  const { category: urlCategory } = useParams();

  // 상태 관리
  const [datas, setDatas] = useState([]);
  const [products, setProducts] = useState([]);
  // useState에 초기값을 계산하는 함수를 넣음/ 이런걸 lazy initializer 이라고 부름 / 컴포넌트 렌더링시 딱 한번 실행됨 즉 TABLES,.. 로 변환
  const [category, setCategory] = useState(() => {
    return urlCategory.toUpperCase();
  });

  const [designers, setDesigners] = useState([]); // 디자이너 목록을 위한 상태
  const [materials, setMaterials] = useState([]); // 재질 목록을 위한 상태
  const [filters, setFilters] = useState({
    materials: [],
    designer: "",
    sort: "",
  });

  // 드롭다운 메뉴 상태 관리
  const [openDropdown, setOpenDropdown] = useState(null);

  useEffect(() => {
    const dbData = "https://yj901.github.io/kuora-db/db/products.json";

    fetch(dbData)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setDatas(data);
        // URL 파라미터 기준 카테고리 설정
        const rawCategory = urlCategory
          ? urlCategory.endsWith("s")
            ? urlCategory.slice(0, -1)
            : urlCategory
          : "sofa";
        const categoryKey = rawCategory.toLowerCase() + "s";

        const categoryProducts = data.products[categoryKey] || [];

        setCategory(rawCategory.toUpperCase());
        setProducts(categoryProducts);

        // 디자이너 목록 추출
        const uniqueDesigners = [
          ...new Set(categoryProducts.map((product) => product.info.designer)),
        ];
        setDesigners(uniqueDesigners);

        // 재질 목록 추출
        const uniqueMaterials = [
          ...new Set(categoryProducts.map((product) => product.info.materials)),
        ];
        setMaterials(uniqueMaterials);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }, [urlCategory]);

  // 두 번째 useEffect: 카테고리 상태 변경에 따른 제품 데이터 로드
  useEffect(() => {
    if (!datas || typeof datas !== "object" || !datas.products) {
      return;
    }

    try {
      const categoryKey = category.toLowerCase() + "s";
      const categoryProducts = datas.products[categoryKey] || [];

      setProducts(categoryProducts);

      // 디자이너 목록 추출
      const uniqueDesigners = [
        ...new Set(categoryProducts.map((product) => product.info.designer)),
      ];
      setDesigners(uniqueDesigners);

      // 재질 목록 추출
      const uniqueMaterials = [
        ...new Set(categoryProducts.map((product) => product.info.materials)),
      ];
      setMaterials(uniqueMaterials);
    } catch (error) {
      console.error("Error loading products:", error);
    }
  }, [category]);

  //다중선택 체크박스 토글함수
  const toggleMaterialFilter = (material) => {
    setFilters((prev) => {
      const alreadySelected = prev.materials.includes(material);
      let updatedMaterials;

      // 이미 선택되어 있으면 제거
      if (alreadySelected) {
        updatedMaterials = prev.materials.filter((m) => m !== material);
      } else {
        // 선택되어 있지 않으면 추가
        updatedMaterials = [...prev.materials, material];
      }

      return {
        // 기존값복사 후 ,즉 기존값 유지
        ...prev,
        // 특정필드 업데이트
        materials: updatedMaterials,
      };
    });
  };

  // 카테고리 변경 핸들러
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

  // 필터링된 제품 가져오기
  const filteredProducts = products
    .filter((product) => {
      // 카테고리 필터링은 이미 fetch에서 처리됨
      // 재질 필터링
      if (
        filters.materials.length > 0 &&
        !filters.materials.includes(product.info.materials)
      )
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
      return 0;
    });

  return (
    <>
      <Breadcrumb />;
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
                        // 초기 빈 배열일땐 체크됨 즉 초기렌더링단계에선 All materials 디폴트로 체크
                        checked={filters.materials.length === 0}
                        // 다시 All materials클릭하면 빈배열로 만들어서 All Materials 체크되게 설정
                        onChange={() => handleFilterChange("materials", [])}
                      />
                      All Materials
                    </label>
                    {materials.map((material) => (
                      <label key={material}>
                        <input
                          type="checkbox"
                          // 체크여부는 includes 불리언값으로 판단
                          checked={filters.materials.includes(material)}
                          // 체크박스 클릭하면 toggleMaterialFilter 함수호출
                          onChange={() => toggleMaterialFilter(material)}
                        />
                        {/* 문자열 첫글자를 대문자로 바꾸기 wood -> Wood */}
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
