import React, { useState } from "react";
import "./Home.scss";
import ReactPlayer from "react-player";
import SimpleSlider from "./SliderComp";

export const Home = () => {
  return (
    <div className="home">
      {/* firstSection */}
      <section>
        <div className="main_vid_text">
          <h1>DESIGNED BY EMOTION</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel hic
            culpa
          </p>
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
            <div class="grid_item">
              <div className="img_div">
                <img src="/assets/MAIN_SOFA.png" alt="Sofa" />
              </div>
              <p className="text">SOFAS</p>
            </div>
            <div class="grid_item">
              <div className="img_div">
                <img src="/assets/MAIN_BED.png" alt="Bed" />
              </div>
              <p className="text">BEDS</p>
            </div>
          </div>
          <div className="grid_container_2">
            <div class="grid_item">
              <div className="img_div">
                <img src="/assets/MAIN_TABLE.png" alt="Table" />
              </div>
              <p className="text">TABLES</p>
            </div>
            <div class="grid_item">
              <div className="img_div">
                <img src="/assets/MAIN_CHAIR.png" alt="Chair" />
              </div>
              <p className="text">CHAIRS</p>
            </div>
            <div class="grid_item">
              <div className="img_div">
                <img src="/assets/MAIN_SHELF.png" alt="Shelf" />
              </div>
              <p className="text">SHELVES</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
