import React, { Component } from "react";
import Slider from "react-slick";
import "../Slide/Slide.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default class CenterMode extends Component {
  render() {
    const settings = {
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
        <h2>Custom Paging</h2>
        <Slider {...settings}>
          <div>
            <img src="" />
          </div>
          <div>
            <img src="" />
          </div>
          <div>
            <img src="" />
          </div>
          <div>
            <img src="" />
          </div>
        </Slider>
      </div>
    );
  }
}