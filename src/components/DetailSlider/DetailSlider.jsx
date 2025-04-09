import React, { Component } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./DetailSlider.scss";

function CustomPaging() {
  const settings = {
    customPaging: function (i) {
      return (
        <a className="DetailPaging">
          <img src="https://image.ohousecdn.com/i/bucketplace-v2-development/uploads/productions/168076369463245589.jpg?w=1280&h=1280&c=c&webp=1jpg" />
        </a>
      );
    },
    dots: true,
    dotsClass: "slick-dots slick-thumb",
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <div className="Detailslider-container">
      <Slider {...settings}>
        <div className="item">
          <img src="https://image.ohousecdn.com/i/bucketplace-v2-development/uploads/productions/168076369463245589.jpg?w=1280&h=1280&c=c&webp=1" />
        </div>
        <div className="item">
          <img src="https://image.ohousecdn.com/i/bucketplace-v2-development/uploads/productions/168076369463245589.jpg?w=1280&h=1280&c=c&webp=1" />
        </div>
        <div className="item">
          <img src="https://image.ohousecdn.com/i/bucketplace-v2-development/uploads/productions/168076369463245589.jpg?w=1280&h=1280&c=c&webp=1" />
        </div>
        <div className="item">
          <img src="https://image.ohousecdn.com/i/bucketplace-v2-development/uploads/productions/168076369463245589.jpg?w=1280&h=1280&c=c&webp=1" />
        </div>
      </Slider>
    </div>
  );
}

export default CustomPaging;
