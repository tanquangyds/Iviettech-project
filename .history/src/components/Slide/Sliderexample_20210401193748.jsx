import React, { useEffect, useState, Component } from "react";

import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getProduct } from "../../redux/actions/Products";

import Slider from "react-slick";
import "../Slide/Slide.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";



function Sliderexample(props) {
  const dispatch = useDispatch();
  const { id } = useParams();
  useEffect(() => {
    dispatch(getProduct(id));
  }, []);
  const { product} = useSelector((state) => state.products);
  const setting= {
    customPaging: function(i) {
      return (
        <a>
          <img src={`${baseUrl}/abstract0${i + 1}.jpg`} />
        </a>
      );
    },
    dots: true,
    dotsClass: "slick-dots slick-thumb",
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };
  
  return (
    <div>
     <Slider {...settings}>
          <div>
            <img src={product.poster[0].url} />
          </div>
        
        </Slider>
    </div>
  );
}

export default Sliderexample;