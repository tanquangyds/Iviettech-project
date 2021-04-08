import React, { useEffect, useState, Component } from "react";

import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getProduct } from "../../redux/actions/Products";

import Slider from "react-slick";
import "../Slide/Slide.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";



function Slide(props) {
  const dispatch = useDispatch();
  const { id } = useParams();
  useEffect(() => {
    dispatch(getProduct(id));
  }, []);
  const { product} = useSelector((state) => state.products);
  const settings= {
    customPaging: function(i) {
      return (
        <a >
          <img src={product.poster[i].url} />
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
  // console.log("🚀 ~ file: Slide.jsx ~ line 60 ~ Slide ~ product", product)

  return (
    <div className="group-image-detail">
       {product.poster ? 
     <Slider {...settings}>
        <div>
            <img src={product.poster[0].url} />
          </div>
          <div>
            <img src={product.poster[1].url} />
          </div>
          <div>
            <img src={product.poster[2].url} />
          </div>
          <div>
            <img src={product.poster[3].url} />
          </div>
         
        
        </Slider> : null}
    </div>
  );
}

export default Slide;