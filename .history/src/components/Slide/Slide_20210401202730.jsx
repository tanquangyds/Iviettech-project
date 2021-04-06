import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { getProduct } from "../../redux/actions/Products";
import "../Slide/Slide.css"

import Slider from "react-slick";

// import "~slick-carousel/slick/slick.css"; 
// import "~slick-carousel/slick/slick-theme.css";

import { AiFillCaretLeft, AiFillCaretRight } from "react-icons/ai";
function Slide(props) {
    const dispatch = useDispatch();
    const [Imagemaster, setImagemaster] = useState(0);

    const handleImagemaster = (id)=>{
        setImagemaster(id)
    }
    const moveLeftImg = ()=>{
        if (Imagemaster >0){
            setImagemaster(Imagemaster-1)
        } else  setImagemaster(3)

    }
    const moveRightImg = ()=>{
        if (Imagemaster <3){
            setImagemaster(Imagemaster+1)
        } else  setImagemaster(0)

    }
    const { id } = useParams();
  useEffect(() => {
    dispatch(getProduct(id));
  }, []);

  const { product} = useSelector((state) => state.products);
  console.log(product)
  
    return (
        <div className="slide__container">
            <div className="slide__image-master">
            <div className="slide__control">
                <div className="slide__iconwrapper" id="moveLeft" onClick={moveLeftImg} >
                    <AiFillCaretLeft className="slide__icon"  size={50}/>
                </div>
                <div className="slide__iconwrapper" id="moveRight"  onClick={moveRightImg}>
                    <AiFillCaretRight className="slide__icon"  size={50}/>
                </div>
            </div>
            <Slider>
                <img src="https://i.pinimg.com/564x/49/78/21/497821b9f1c2ca692e696affb475fd84.jpg" alt=""/>
                <img src="https://media3.scdn.vn/img3/2019/9_30/09Eu7x_simg_de2fe0_500x500_maxb.jpg" alt=""/>
                <img src="https://static.toiimg.com/thumb/msid-76940605,imgsize-758247,width-800,height-600,resizemode-75/76940605.jpg" alt=""/>
            </Slider>
            {/* <img src={product.poster[Imagemaster].url} alt="imgmaster"/> */}
            </div>
            <div className="slide__images">
                <div className="slide__image" onClick={()=>{handleImagemaster(0)}}>
                    <img src={product.poster[0].url} alt=""/>
                </div>
                <div className="slide__image" onClick={()=>{handleImagemaster(1)}}>
                    <img src={product.poster[1].url} alt=""/>
                </div>
                <div className="slide__image" onClick={()=>{handleImagemaster(2)}}>
                    <img src={product.poster[2].url} alt=""/>
                </div>
                <div className="slide__image" onClick={()=>{handleImagemaster(3)}}>
                    <img src={product.poster[3].url} alt=""/>
                </div>      
            </div>
        </div>
    );
}

export default Slide;