import React, { useEffect, useState } from "react";
import { useProducts } from "../../contexts/ProductContext";
import "./Home.scss";
import ReactPlayer from "react-player";
import SimpleSlider from "./SliderComp";
import MAIN_BED from "../../assets/MAIN_BED.png";
import MAIN_SOFA from "../../assets/MAIN_SOFA.png";
import MAIN_CHAIR from "../../assets/MAIN_CHAIR.png";
import MAIN_SHELF from "../../assets/MAIN_SHELF.png";
import MAIN_TABLE from "../../assets/MAIN_TABLE.png";
import { resolveImage } from "../../utils/resolveImg";

export const Home = () => {
  const { allProducts } = useProducts();
  console.log(allProducts);

  useEffect(() => {
    const bestBeds = Array.from(allProducts?.beds || []).filter(
      (it) => it.best === true
    );
    console.log(bestBeds);
    const bestChairs = Array.from(allProducts?.chairs || []).filter(
      (it) => it.best === true
    );
    console.log(bestChairs);
  }, [allProducts]);

  return (
    <div className="home">
      {/* firstSection */}
      <section>
        <div className="main_vid_text">
          <h1>DESIGNED BY EMOTION</h1>
          <p>Premium furniture that inspires your space.</p>
          <p>Inspiring your space with premium design</p>
        </div>
        <div className="filter">
          <ReactPlayer
            width="100%"
            height="100%"
            url={process.env.PUBLIC_URL + "/videos/FIVEGUYS_MAINVID.mp4"}
            playing={true}
            muted={true}
            controls={false}
            loop={true}
          />
        </div>
      </section>
      {/* secondSection */}
      <section>
        <h1>BEST SELLER</h1>
      </section>
      {/* thirdSection */}
      <section>
        <SimpleSlider />
      </section>
      {/* fourthSection */}
      <section>
        <div className="inner">
          <p className="category_font">CATEGORY</p>
          <div className="grid_container_1">
            <div className="grid_item">
              <div className="img_div">
                <img src={MAIN_SOFA} alt="BED" />
              </div>
              <p className="text">SOFAS</p>
            </div>
            <div className="grid_item">
              <div className="img_div">
                <img src={MAIN_BED} alt="BED" />
              </div>
              <p className="text">BEDS</p>
            </div>
          </div>
          <div className="grid_container_2">
            <div className="grid_item">
              <div className="img_div">
                <img src={MAIN_TABLE} alt="Table" />
              </div>
              <p className="text">TABLES</p>
            </div>
            <div className="grid_item">
              <div className="img_div">
                <img src={MAIN_CHAIR} alt="Chair" />
              </div>
              <p className="text">CHAIRS</p>
            </div>
            <div className="grid_item">
              <div className="img_div">
                <img src={MAIN_SHELF} alt="Shelf" />
              </div>
              <p className="text">SHELVES</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
