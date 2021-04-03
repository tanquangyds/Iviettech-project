import React, { Component } from "react";
import Slider from "react-slick";
import "../Slide/Slide.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
export default class SimpleSlider extends Component {
  render() {
    const settings = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      arrow: true,
    };
    return (
      <div>
        <h2> Single Item</h2>
        <Slider {...settings}>
          <div className="image">
            <img
              src="https://i.pinimg.com/564x/49/78/21/497821b9f1c2ca692e696affb475fd84.jpg"
              alt=""
            />
          </div>
          <div className="image">
            <img
              src="https://media3.scdn.vn/img3/2019/9_30/09Eu7x_simg_de2fe0_500x500_maxb.jpg"
              alt=""
            />
          </div>
          <div className="image">
            <img
              src="https://static.toiimg.com/thumb/msid-76940605,imgsize-758247,width-800,height-600,resizemode-75/76940605.jpg"
              alt=""
            />
          </div>
          <div className="image">
            <img
              src="https://media3.scdn.vn/img3/2019/9_30/09Eu7x_simg_de2fe0_500x500_maxb.jpg"
              alt=""
            />
          </div>
          <div className="image">
            <img
              src="https://static.toiimg.com/thumb/msid-76940605,imgsize-758247,width-800,height-600,resizemode-75/76940605.jpg"
              alt=""
            />
          </div>
        </Slider>
      </div>
    );
  }
}
