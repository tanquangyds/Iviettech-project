// import React from "react";
import { useSelector, useDispatch } from "react-redux";
import currencyFormatter from "currency-formatter";
import { BsDash, BsPlus } from "react-icons/bs";
import { BsReverseBackspaceReverse } from "react-icons/bs";
import React, { useState } from "react";

import ReactDOM from "react-dom";
import "antd/dist/antd.css";
import "./index.css";

import Modal from "./Modal";
import TransitionsModal from "../../components/payment/payment";
import {
  Empty,
  Tooltip,
  message,
  Drawer,
  Button,
  Form,
  Input,
  Select,
  InputNumber,
} from "antd";

const Cart = () => {
  const { products, totalQuantities, totalPrice } = useSelector(
    (state) => state.cart
  );
  const dispatch = useDispatch();
  //drawer

  const { Option } = Select;
  const { TextArea } = Input;
  const [form] = Form.useForm();

  const dataCity = ["Hà Nội", "Đà Nẵng", "TP HCM"];
  const [visible, setVisible] = useState(false);
  const showDrawer = () => {
    setVisible(true);
  };
  const [city, setCity] = useState("");

  const [district, setDistrict] = useState("");
  const onFinish = (values) => {
    const {
      city,
      district,
      commune,
      incubation,
      numberPhome,
      payment,
    } = values;
    console.log(values);
  };
  const onClose = () => {
    setVisible(false);
  };
  const onChangeCity = (City) => {
    setCity(City);
  };
  const onChangeDistrict = (District) => {
    setDistrict(District);
  };
  //-----------------------------
  return (
    <div className="cart">
      <div className="container">
        <h3>Your cart</h3>
        {products.length > 0 ? (
          <>
            <div className="row">
              <div className="col-9">
                <div className="cart__heading">
                  <div className="row">
                    <div className="col-2">Picture</div>
                    <div className="col-2">Name</div>
                    <div className="col-2">Price</div>
                    <div className="col-2">Inc/Dec</div>
                    <div className="col-2">Total Price</div>
                    <div className="col-2">Remove</div>
                  </div>
                </div>
                {products.map((product) => (
                  <div className="row verticalAlign" key={product.id}>
                    <div className="col-2">
                      <div className="cart__image">
                        <img src={product.poster[0].url} alt="" />
                      </div>
                    </div>
                    <div className="col-2">
                      <div className="cart__name">{product.name}</div>
                    </div>
                    <div className="col-2">
                      <div className="cart__price">
                        {currencyFormatter.format(product.discountPrice, {
                          code: "USD",
                        })}
                      </div>
                    </div>
                    <div className="col-2">
                      <div className="details__info cart__incDec">
                        <div className="details__incDec">
                          <span
                            className="dec"
                            onClick={() =>
                              dispatch({ type: "DEC", payload: product.id })
                            }
                          >
                            <BsDash />
                          </span>
                          <span className="quantity">{product.quantity}</span>
                          <span
                            className="inc"
                            onClick={() =>
                              dispatch({ type: "INC", payload: product.id })
                            }
                          >
                            <BsPlus />
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="col-2">
                      <div className="cart__total text-center">
                        {currencyFormatter.format(
                          product.discountPrice * product.quantity,
                          { code: "USD" }
                        )}
                      </div>
                    </div>
                    <div className="col-2">
                      <div
                        className="cart__remove"
                        onClick={() =>
                          dispatch({ type: "REMOVE", payload: product.id })
                        }
                      >
                        <BsReverseBackspaceReverse />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="col-3 summary-col">
                <div className="summary">
                  <div className="summary__heading">Summary</div>
                  <div className="summary__details">
                    <div className="row mb-10">
                      <div className="col-6">Total Items:</div>
                      <div className="col-6">{totalQuantities}</div>
                    </div>
                    <div className="row mb-10">
                      <div className="col-6">Total Price</div>
                      <div className="col-6">
                        {currencyFormatter.format(totalPrice, { code: "USD" })}
                      </div>
                    </div>
                    <button
                      type="button"
                      className="checkout"
                      onClick={showDrawer}
                    >
                      check out
                      <div></div>
                    </button>
                    <div className="group-check-out">
                      <Modal checkclose={false} checkvisible={false} />
                      <Drawer
                        title="Thông tin nhận hàng"
                        width={600}
                        placement="right"
                        closable={false}
                        onClose={onClose}
                        visible={visible}
                        className="container-checkout"
                      >
                        <Form form={form} onFinish={onFinish}>
                          <Form.Item
                            name="city"
                            label="Tỉnh/Thành phố"
                            hasFeedback
                            rules={[
                              {
                                required: true,
                                message:
                                  "Vui lòng chọn tỉnh hoặc thành phố bạn ở !",
                              },
                            ]}
                          >
                            <Select
                              showSearch
                              placeholder="Tỉnh/Thành phố"
                              optionFilterProp="children"
                              onChange={onChangeCity}
                              filterOption={(input, option) =>
                                option.children
                                  .toLowerCase()
                                  .indexOf(input.toLowerCase()) >= 0
                              }
                            >
                              {dataCity.map((city, index) => (
                                <Option value={city.name} key={index}>
                                  {city.name}
                                </Option>
                              ))}
                            </Select>
                          </Form.Item>
                          <Form.Item
                            name="district"
                            label="Quận/Huyện"
                            hasFeedback
                            rules={[
                              {
                                required: true,
                                message:
                                  "Vui lòng chọn quận hoặc huyện nơi bạn !",
                              },
                            ]}
                          >
                            <Select
                              showSearch
                              placeholder="Quận/Huyện"
                              optionFilterProp="children"
                              onChange={onChangeDistrict}
                              filterOption={(input, option) =>
                                option.children
                                  .toLowerCase()
                                  .indexOf(input.toLowerCase()) >= 0
                              }
                            >
                              {dataCity.map(
                                (city, index) => (
                                  <Option value={city} key={index}>
                                    {city}
                                  </Option>
                                )
                                // (itemCity, index) =>
                                //   itemCity.name === city &&
                                //   itemCity.huyen.map((huyen) => (
                                //     <Option value={huyen.name} key={index}>
                                //       {huyen.name}
                                //     </Option>
                                //   ))
                              )}
                            </Select>
                          </Form.Item>
                          <Form.Item
                            name="commune"
                            label="Xã/Thị Trấn"
                            hasFeedback
                            rules={[
                              {
                                required: true,
                                message: "Vui lòng chọn xã bạn ở !",
                              },
                            ]}
                          >
                            <Select
                              showSearch
                              placeholder="Xã/Thị Trấn"
                              optionFilterProp="children"
                              filterOption={(input, option) =>
                                option.children
                                  .toLowerCase()
                                  .indexOf(input.toLowerCase()) >= 0
                              }
                            >
                              {dataCity.map(
                                (city, index) => (
                                  <Option value={city} key={index}>
                                    {city}
                                  </Option>
                                )
                                // (itemCity) =>
                                //   itemCity.name === city &&
                                //   itemCity.huyen.map(
                                //     (huyen) =>
                                //       huyen.name === district &&
                                //       huyen.xa.sort().map((xa, index) => (
                                //         <Option value={xa.name} key={index}>
                                //           {xa.name}
                                //         </Option>
                                //       ))
                                //   )
                              )}
                            </Select>
                          </Form.Item>
                          <Form.Item
                            name="incubation"
                            label="Ấp/Số Nhà/Tên Đường"
                            rules={[
                              {
                                required: true,
                                message: "Địa chỉ cụ thể !",
                              },
                            ]}
                          >
                            <TextArea
                              placeholder="địa chỉ cụ thể: ấp, số nhà, tên đường..."
                              rows={4}
                            />
                          </Form.Item>
                          <Form.Item
                            name="numberPhome"
                            label="Số Điện Thoại"
                            className="group-phone"
                            hasFeedback
                            rules={[
                              {
                                required: true,
                                message: "Vui lòng nhập đúng số điện thoại !",
                              },
                            ]}
                          >
                            <InputNumber type="number" />
                          </Form.Item>
                          <Form.Item
                            name="payment"
                            label="Thanh toán"
                            hasFeedback
                            rules={[
                              {
                                required: true,
                                message: "Vui lòng chọn phuong thức thanh toán",
                              },
                            ]}
                          >
                            <Select placeholder="Thanh toán khi nhận hàng">
                              <Option value="Thanh toán khi nhận hàng">
                                Thanh toán khi nhận hàng
                              </Option>
                            </Select>
                          </Form.Item>
                          <Form.Item>
                            <Button
                              type="primary"
                              htmlType="submit"
                              className="btn-register"
                            >
                              Hoàn tất
                            </Button>
                          </Form.Item>
                        </Form>
                      </Drawer>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          "Your cart is empty!"
        )}
      </div>
    </div>
  );
};

export default Cart;
