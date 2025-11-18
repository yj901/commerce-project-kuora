import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useProducts } from "../../contexts/ProductContext";
import "./Home.scss";
import ReactPlayer from "react-player";
import SimpleSlider from "./SliderComp";
import MAIN_BED from "../../assets/MAIN_BED.png";
import MAIN_SOFA from "../../assets/MAIN_SOFA.png";
import MAIN_CHAIR from "../../assets/MAIN_CHAIR.png";
import MAIN_SHELF from "../../assets/MAIN_SHELF.png";
import MAIN_TABLE from "../../assets/MAIN_TABLE.png";
import ProductCard from "../../components/ProductCard/ProductCard";

export const Home = () => {
  const { allProducts } = useProducts();
  const [bestProduct, setBestProduct] = useState([]);
  const [eliasProducts, setEliasProducts] = useState([]);
  const [videoLoaded, setVideoLoaded] = useState(false);

  useEffect(() => {
    const filtered = Object.values(allProducts)
      .flat()
      .filter((product) => product?.best === true);

    const filteredEvent = Object.values(allProducts)
      .flat()
      .filter((product) => product.info?.collection === "Elias Klemens");

    setBestProduct(filtered);
    setEliasProducts(filteredEvent.slice(0, 3));
  }, [allProducts]);

  return (
    <div className="home">
      {/* firstSection MAINVID*/}
      <section>
        <div className="main_vid_text">
          <h1>DESIGNED BY EMOTION</h1>
          <p>Premium furniture that inspires your space.</p>
          <p>Inspiring your space with premium design</p>
        </div>
        <div className="filter">
          {!videoLoaded && <div className="video-thumb"></div>}

          <ReactPlayer
            width="100%"
            height="100%"
            url={process.env.PUBLIC_URL + "/videos/FIVEGUYS_MAINVID.mp4"}
            playing={true}
            muted={true}
            controls={false}
            loop={true}
            onReady={() => setVideoLoaded(true)}
            style={{
              opacity: videoLoaded ? 1 : 0,
              transition: "opacity 0.8s ease-in",
            }}
          />
        </div>
      </section>
      {/* secondSection  BESTSELLER*/}
      <section>
        <div className="inner">
          <div className="bestSeller">
            <p className="category_font">BEST SELLER</p>
            <div className="products-grid">
              {bestProduct.map((product) => (
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
          </div>
          <div className="eventDiv">
            <p className="category_font">ELIAS KLEMENS COLLECTION</p>
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
          </div>
        </div>
      </section>
      {/* thirdSection SLIDER*/}
      <section>
        <SimpleSlider />
      </section>
      {/* fourthSection CATEGORY*/}
      <section>
        <div className="inner">
          <p className="category_font">CATEGORY</p>
          <div className="grid_container_1">
            <Link to={"/products/sofas"}>
              <div className="grid_item">
                <div className="img_div">
                  <img src={MAIN_SOFA} alt="BED" />
                </div>
                <p className="text">SOFAS</p>
              </div>
            </Link>

            <Link to={"/products/beds"}>
              <div className="grid_item">
                <div className="img_div">
                  <img src={MAIN_BED} alt="BED" />
                </div>
                <p className="text">BEDS</p>
              </div>
            </Link>
          </div>
          <div className="grid_container_2">
            <Link to={"/products/tables"}>
              <div className="grid_item">
                <div className="img_div">
                  <img src={MAIN_TABLE} alt="Table" />
                </div>
                <p className="text">TABLES</p>
              </div>
            </Link>
            <Link to={"/products/chairs"}>
              <div className="grid_item">
                <div className="img_div">
                  <img src={MAIN_CHAIR} alt="Chair" />
                </div>
                <p className="text">CHAIRS</p>
              </div>
            </Link>
            <Link to={"/products/shelves"}>
              <div className="grid_item">
                <div className="img_div">
                  <img src={MAIN_SHELF} alt="Shelf" />
                </div>
                <p className="text">SHELVES</p>
              </div>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
