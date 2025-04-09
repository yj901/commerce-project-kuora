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

  const [bestBeds, setBestBeds] = useState([]);
  const [bestChairs, setBestChairs] = useState([]);
  const [bestShelves, setBestShelves] = useState([]);
  const [bestSofas, setBestSofas] = useState([]);
  const [bestTables, setBestTables] = useState([]);

  useEffect(() => {
    setBestBeds(
      Array.from(allProducts?.beds || []).filter((it) => it.best === true)
    );
    setBestChairs(
      Array.from(allProducts?.chairs || []).filter((it) => it.best === true)
    );
    setBestShelves(
      Array.from(allProducts?.shelves || []).filter((it) => it.best === true)
    );
    setBestSofas(
      Array.from(allProducts?.sofas || []).filter((it) => it.best === true)
    );
    setBestTables(
      Array.from(allProducts?.tables || []).filter((it) => it.best === true)
    );
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
      {/* secondSection  BESTSELLER*/}
      <section>
        <div className="inner">
          <p className="category_font">BEST SELLER</p>
          <div className="bestContents">
            {bestBeds.map((bed, index) => {
              console.log(bed);
              return (
                <div className="">
                  <img
                    key={index}
                    src={resolveImage(bed.img.thumbnailImg[0])}
                  ></img>
                  <p key={index}>{bed.title}</p>
                  <p key={index}>₩{bed.price.toLocaleString()}</p>
                </div>
              );
            })}
            {bestChairs.map((chair, index) => {
              return (
                <div>
                  <img
                    key={index}
                    src={resolveImage(chair.img.thumbnailImg[0])}
                  ></img>
                  <p key={index}>{chair.title}</p>
                  <p key={index}>₩{chair.price.toLocaleString()}</p>
                </div>
              );
            })}
            {bestShelves.map((shelve, index) => {
              return (
                <div>
                  <img
                    key={index}
                    src={resolveImage(shelve.img.thumbnailImg[0])}
                  ></img>
                  <p key={index}>{shelve.title}</p>
                  <p key={index}>₩{shelve.price.toLocaleString()}</p>
                </div>
              );
            })}
            {bestSofas.map((sofa, index) => {
              return (
                <div>
                  <img
                    key={index}
                    src={resolveImage(sofa.img.thumbnailImg[0])}
                  ></img>
                  <p key={index}>{sofa.title}</p>
                  <p key={index}>₩{sofa.price.toLocaleString()}</p>
                </div>
              );
            })}
            {bestTables.map((table, index) => {
              return (
                <div>
                  <img
                    key={index}
                    src={resolveImage(table.img.thumbnailImg[0])}
                  ></img>
                  <p key={index}>{table.title}</p>
                  <p key={index}>₩{table.price.toLocaleString()}</p>
                </div>
              );
            })}
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
