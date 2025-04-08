import React, { useRef, useCallback } from "react";
import EventPoint from "./EventPoint";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Eventslide.scss";
import EventSliderBtn from "../../assets/icons/event_slide_arr.svg";

const EventSlidePaging = ["serenity", "embrace", "momentum"];

const EventSlide = () => {
  const slickRef = useRef(null);
  const slideContainerRef = useRef(null);

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

  const previous = useCallback(() => slickRef.current.slickPrev(), []);
  const next = useCallback(() => slickRef.current.slickNext(), []);

  return (
    <div className="eventslides" ref={slideContainerRef}>
      <Slider {...settings} ref={slickRef} className="eventslide">
        <div>
          <div className="item bg3">
            <EventPoint
              topView="41"
              leftView="20"
              slideContainerRef={slideContainerRef}
            />
            <EventPoint
              topView="64"
              leftView="50"
              slideContainerRef={slideContainerRef}
            />
          </div>
        </div>
        <div>
          <div className="item bg2"></div>
        </div>
        <div>
          <div className="item bg1"></div>
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
