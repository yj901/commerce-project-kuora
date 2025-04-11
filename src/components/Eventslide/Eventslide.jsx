import React, { useRef, useCallback, useEffect, useState } from "react";
import EventPoint from "./EventPoint";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Eventslide.scss";
import EventSliderBtn from "../../assets/icons/event_slide_arr.svg";
import { useProducts } from "../../contexts/ProductContext";

const EventSlidePaging = ["serenity", "embrace", "momentum"];

const EventSlide = () => {
  const [eliasProducts, setEliasProducts] = useState([]);
  const [activeCode, setActiveCode] = useState(null);
  const slickRef = useRef(null);
  const slideContainerRef = useRef(null);
  const { allProducts } = useProducts();

  useEffect(() => {
    const filtered = Object.values(allProducts)
      .flat()
      .filter((product) => product.info?.collection === "Elias Klemens");
    setEliasProducts(filtered);
  }, [allProducts]);

  const findCode = (code) => {
    const found = eliasProducts.find((product) => {
      return product.info.code === code;
    });
    return found;
  };

  var settings = {
    dots: true,
    centerMode: true,
    infinite: true,
    centerPadding: "140px",
    slidesToShow: 1,
    slidesToScroll: 1,
    speed: 500,
    arrows: false,
    appendDots: (dots) => (
      <div>
        <ul> {dots} </ul>
      </div>
    ),
    customPaging: (i) => <div>{EventSlidePaging[i]}</div>,

    responsive: [
      {
        breakpoint: 1440,
        settings: {
          centerPadding: "90px",
        },
      },
      {
        breakpoint: 1025,
        settings: {
          centerPadding: "50px",
        },
      },
      {
        breakpoint: 768,
        settings: {
          centerPadding: "0",
        },
      },
    ],
  };

  const previous = useCallback(() => {
    setActiveCode(null);
    return slickRef.current.slickPrev();
  }, []);
  const next = useCallback(() => {
    setActiveCode(null);
    return slickRef.current.slickNext();
  }, []);

  return (
    <div className="eventslides" ref={slideContainerRef}>
      <Slider {...settings} ref={slickRef} className="eventslide">
        <div>
          <div className="item bg3">
            <EventPoint
              topView="41"
              leftView="20"
              slideContainerRef={slideContainerRef}
              code={findCode(6009)}
              productCode={6009}
              activeCode={activeCode}
              setActiveCode={setActiveCode}
            />
            <EventPoint
              topView="64"
              leftView="50"
              slideContainerRef={slideContainerRef}
              code={findCode(6010)}
              productCode={6010}
              activeCode={activeCode}
              setActiveCode={setActiveCode}
            />
            <EventPoint
              topView="73"
              leftView="14"
              slideContainerRef={slideContainerRef}
              code={findCode(6006)}
              productCode={6006}
              activeCode={activeCode}
              setActiveCode={setActiveCode}
            />
            <EventPoint
              topView="76"
              leftView="69"
              slideContainerRef={slideContainerRef}
              code={findCode(6007)}
              productCode={6007}
              activeCode={activeCode}
              setActiveCode={setActiveCode}
            />
          </div>
        </div>
        <div>
          <div className="item bg2">
            <EventPoint
              topView="25"
              leftView="37"
              slideContainerRef={slideContainerRef}
              code={findCode(6004)}
              productCode={6004}
              activeCode={activeCode}
              setActiveCode={setActiveCode}
            />
            <EventPoint
              topView="50"
              leftView="27"
              slideContainerRef={slideContainerRef}
              code={findCode(6008)}
              productCode={6008}
              activeCode={activeCode}
              setActiveCode={setActiveCode}
            />
            <EventPoint
              topView="49"
              leftView="56"
              slideContainerRef={slideContainerRef}
              code={findCode(6005)}
              productCode={6005}
              activeCode={activeCode}
              setActiveCode={setActiveCode}
            />
            <EventPoint
              topView="56"
              leftView="46"
              slideContainerRef={slideContainerRef}
              code={findCode(6003)}
              productCode={6003}
              activeCode={activeCode}
              setActiveCode={setActiveCode}
            />
            <EventPoint
              topView="62"
              leftView="66"
              slideContainerRef={slideContainerRef}
              code={findCode(6006)}
              productCode={6006}
              activeCode={activeCode}
              setActiveCode={setActiveCode}
            />
          </div>
        </div>
        <div>
          <div className="item bg1">
            <EventPoint
              topView="48"
              leftView="33"
              slideContainerRef={slideContainerRef}
              code={findCode(6001)}
              productCode={6001}
              activeCode={activeCode}
              setActiveCode={setActiveCode}
            />
            <EventPoint
              topView="59"
              leftView="55"
              slideContainerRef={slideContainerRef}
              code={findCode(6002)}
              productCode={6002}
              activeCode={activeCode}
              setActiveCode={setActiveCode}
            />
            <EventPoint
              topView="73"
              leftView="82"
              slideContainerRef={slideContainerRef}
              code={findCode(6003)}
              productCode={6003}
              activeCode={activeCode}
              setActiveCode={setActiveCode}
            />
          </div>
        </div>
      </Slider>
      <ul className="custom_arrows">
        <li onClick={previous}>
          <img src={EventSliderBtn} alt="arr_prev" />
        </li>
        <li onClick={next}>
          <img src={EventSliderBtn} alt="arr_next" />
        </li>
      </ul>
    </div>
  );
};

export default EventSlide;
