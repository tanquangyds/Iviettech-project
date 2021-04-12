import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import currencyFormatter from "currency-formatter";
import { BsDash, BsPlus } from "react-icons/bs";
import { getProduct } from "../../redux/actions/Products";
import "../Details/Details.css";
import Slide from "../../components/Slide/Slide";
import { AiOutlineShoppingCart } from "react-icons/ai";
import Comment from "../../components/comment/Comment"
import ReactHtmlParser from "react-html-parser";
import { Empty, Tooltip, message, Drawer, Button, Form, Input, Select, InputNumber } from 'antd';

import Button from '@material-ui/core/Button';




const Details = () => {
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);



//----------------------------------
  const { id } = useParams();
  useEffect(() => {
    dispatch(getProduct(id));
  }, []);
  const { product, loading, error } = useSelector((state) => state.products);
  console.log(product.size);
  //add discount
  const discount = 0.1;
  product.discountPrice = product.price * (1 - discount);

  const decQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };
  return (
    <div className="container mt-100">
      <div className="row detail__container">
        <div className="col-6">
          <div className="details__image">
            <Slide />
          </div>
        </div>
        <div className="col-6">
          <div className="details__name">{product.name}</div>
          <div className="details__p">
            <h4>Thông tin sản phẩm</h4>
            <p>
              mã sản phẩm: <span>{product.id}</span>
            </p>
            <p>
              nhà xản xuất: <span>{product.key}</span>
            </p>
            <p>
              bộ sưu tập: <span>{product.collections}</span>
            </p>
            <p>
              loại sản phẩm: <span>{product.productType}</span>
            </p>
            <p>
              dòng sản phẩm: <span>{product.NSX}</span>
            </p>
            <p>
              màu sắc: <span>{product.color}</span>
            </p>
            <p>
              giới tính: <span>{product.sex}</span>
            </p>
          </div>
          <div className="details__freeship">
            <img
              src="https://shopbongda.vn/wp-content/uploads/2020/02/freeship-1.png"
              alt="free-ship"
            />
            <p>
              Miễn phí giao hàng (tối đa 30k)cho đơn hàng từ 249k Xem chi tiết
            </p>
          </div>
         
          <div className="details__prices">
            <span className="details__actaul">
              {currencyFormatter.format(product.price, { code: "VND" })}
            </span>
            <span className="details__discount">
              {currencyFormatter.format(product.discountPrice, { code: "VND" })}
            </span>
          </div>
          <div className="details__info">
            <div className="details__incDec">
              <span className="dec" onClick={decQuantity}>
                <BsDash />
              </span>
              <span className="quantity">{quantity}</span>
              <span className="inc" onClick={() => setQuantity(quantity + 1)}>
                <BsPlus />
              </span>
              <button
                className="btn-default"
                onClick={() =>
                  dispatch({
                    type: "ADD_TO_CART",
                    payload: { product, quantity },
                  })
                }
              >
                <AiOutlineShoppingCart />
                chọn mua hàng
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="product__description">
          <h2>Mô tả sản phẩm</h2>
          {ReactHtmlParser(product.description)}
        </div>
      </div>
      <div className="row">
        <Comment/>
      </div>
 
 
    </div>
  );
};

export default Details;
