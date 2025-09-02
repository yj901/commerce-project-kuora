import { useRef, useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";
import "./Slider.scss";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import SLIDER_ARROW from "../../assets/slider_arrow.svg";
import SLIDER_IMG1 from "../../assets/Main_SliderIMG1.png";
import SLIDER_IMG2 from "../../assets/Main_SliderIMG2.png";
import SLIDER_IMG3 from "../../assets/Main_SliderIMG3.jpg";

function AppendDots() {
  const slickRef = useRef(null);
  const navigate = useNavigate();
  const goEvent = useCallback(() => navigate("/event"), [navigate]);

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
      <div className="inner">
        <p className="category_font">PROMOTION</p>
      </div>
      <Slider {...settings} ref={slickRef}>
        <div className="slide_wrap slide1">
          <div>
            <div className="comments_group">
              <p className="slider_comments">ELIAS KLEMENS EXHIBITION</p>
              <p className="slider_comments_2">
                시간과 공간을 디자인하는 조형의 언어
                <br />
                일상을 예술로 완성하는 엘리어스 클레멘스의 하이엔드 가구
                컬렉션을 만나보세요.
              </p>
            </div>
            <div className="slider_number">
              <div className="eventgo_btn" onClick={goEvent}>
                View More
              </div>
              {slideState.activeSlide + 1} <p>/ </p>
              <p>3</p>
            </div>
            <div className="arrow_class">
              <div onClick={previous} className="prev">
                <img src={SLIDER_ARROW} alt="next-arrow" />
              </div>
              <div onClick={next} className="next">
                <img src={SLIDER_ARROW} alt="next-arrow" />
              </div>
            </div>
          </div>
          <img src={SLIDER_IMG1} className="sliderImg" alt="sliderImg1" />
        </div>

        <div className="slide_wrap lide2">
          <div>
            <div className="comments_group">
              <p className="slider_comments">STYLE YOUR SPACE</p>
              <p className="slider_comments_2">
                프리미엄 가구로 당신의 공간을 특별하게
                <br />단 7일간, 단독 특가 이벤트 진행 중
              </p>
            </div>
            <div className="slider_number">
              <div className="eventgo_btn" onClick={goEvent}>
                View More
              </div>
              {slideState.activeSlide + 1} <p>/ </p>
              <p>3</p>
            </div>
            <div className="arrow_class">
              <div onClick={previous} className="prev">
                <img src={SLIDER_ARROW} alt="next-arrow" />
              </div>
              <div onClick={next} className="next">
                <img src={SLIDER_ARROW} alt="next-arrow" />
              </div>
            </div>
          </div>
          <img src={SLIDER_IMG2} className="sliderImg" alt="sliderImg2" />
        </div>
        <div className="slide_wrap slide3">
          <div>
            <div className="comments_group">
              <p className="slider_comments">REFINED LIVING SPACES</p>
              <p className="slider_comments_2">
                미니멀한 세련됨, 일상에 스며드는 아름다움
                <br />
                지금 이 공간에서 실현하세요
              </p>
            </div>
            <div className="slider_number">
              <div className="eventgo_btn" onClick={goEvent}>
                View More
              </div>
              {slideState.activeSlide + 1} <p>/ </p>
              <p>3</p>
            </div>
            <div className="arrow_class">
              <div onClick={previous} className="prev">
                <img src={SLIDER_ARROW} alt="next-arrow" />
              </div>
              <div onClick={next} className="next">
                <img src={SLIDER_ARROW} alt="next-arrow" />
              </div>
            </div>
          </div>
          <img src={SLIDER_IMG3} className="sliderImg" alt="sliderImg3" />
        </div>
      </Slider>
    </div>
  );
}
export default AppendDots;
