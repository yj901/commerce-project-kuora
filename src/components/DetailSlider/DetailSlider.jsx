import React, { Component } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./DetailSlider.scss";
import {resolveImage} from "../../utils/resolveImg";




const CustomPaging = ({ product }) => {
  const images = product.img.thumbnailImg;

  const settings = {

    customPaging: i => (
      <a className="DetailPaging">
        <img
          src={resolveImage(images[i])}
          alt={`${product.title} thumbnail ${i + 1}`}
        />
      </a>
    ),
    dots: true,
    dotsClass: "slick-dots slick-thumb",
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div className="Detailslider-container">
      {images.length > 1 ? (
        <Slider {...settings}>
          {images.map((thumb, index) => (
            <div className="item" key={index}>
              <img
                src={resolveImage(thumb)}
                alt={`${product.title} ${index + 1}`}
              />
            </div>
          ))}
        </Slider>
      ) : (
        <div className="item">
          <img
            src={resolveImage(images[0])}
            alt={`${product.title} 1`}
          />
        </div>
      )}
    </div>
  );
};

export default CustomPaging



