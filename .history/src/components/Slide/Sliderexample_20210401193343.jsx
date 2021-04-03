import React, { Component } from "react";
import { useDispatch, useSelector } from "react-redux";

import Slider from "react-slick";
import "../Slide/Slide.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";



function Sliderexample(props) {
  const dispatch = useDispatch();

  return (
    <div>
      <Slider>
      </Slider>
    </div>
  );
}

export default Sliderexample;