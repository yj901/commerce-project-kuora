import React from "react";
import { useRef, useCallback, useState } from "react";
import Slider from "react-slick";
import "./Slider.scss";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function AppendDots() {
  const slickRef = useRef(null);

  const previous = useCallback(() => slickRef.current.slickPrev(), []);
  const next = useCallback(() => slickRef.current.slickNext(), []);
  const [slideState, setSlideState] = useState({
    activeSlide: 0,
    activeSlide2: 0,
  });

  const settings = {
    dots: false,
    infinite: true,
    fade: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    beforeChange: (current, next) =>
      setSlideState({ activeSlide: next, activeSlide2: current }),
    appendDots: (dots) => (
      <div>
        <ul style={{ margin: "0px" }}> {dots} </ul>
      </div>
    ),
  };
  return (
    <div className="slider-container">
      <Slider {...settings} ref={slickRef}>
        <div>
          <p className="slider_comments">Lorem ipsum dolor sit</p>
          <p className="slider_comments_2">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            Voluptatum, eius.
          </p>
          <div className="slider_number">
            {slideState.activeSlide + 1} <p>/ </p>
            <p>3</p>
          </div>
          <img
            src="/assets/Main_SliderIMG1.png"
            className="sliderImg1"
            alt="sliderImg1"
          />
          <div className="arrow_class">
            <div onClick={previous} className="prev">
              <img src="/assets/icons/slider_arrow.svg" alt="next-arrow" />
            </div>
            <div onClick={next} className="next">
              <img src="/assets/icons/slider_arrow.svg" alt="next-arrow" />
            </div>
          </div>
        </div>

        <div>
          <p className="slider_comments">Lorem ipsum dolor sit</p>
          <p className="slider_comments_2">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            Voluptatum, eius.
          </p>
          <div className="slider_number">
            {slideState.activeSlide + 1} <p>/ </p>
            <p>3</p>
          </div>
          <img
            src="/assets/Main_SliderIMG2.png"
            className="sliderImg2"
            alt="sliderImg2"
          />
          <div className="arrow_class">
            <div onClick={previous} className="prev">
              <img src="/assets/icons/slider_arrow.svg" alt="next-arrow" />
            </div>
            <div onClick={next} className="next">
              <img src="/assets/icons/slider_arrow.svg" alt="next-arrow" />
            </div>
          </div>
        </div>
        <div>
          <div className="slider_number">
            {slideState.activeSlide + 1} <p>/ </p>
            <p>3</p>
          </div>
          <div className="arrow_class">
            <div onClick={previous} className="prev">
              <img src="/assets/icons/slider_arrow.svg" alt="next-arrow" />
            </div>
            <div onClick={next}>
              <img src="/assets/icons/slider_arrow.svg" alt="next-arrow" />
            </div>
          </div>
        </div>
      </Slider>
    </div>
  );
}
export default AppendDots;
