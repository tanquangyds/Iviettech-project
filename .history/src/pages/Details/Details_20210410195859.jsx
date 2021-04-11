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


const Details = () => {
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);


//modal__payment
const [city, setCity] = useState('');
const [district, setDistrict] = useState('');
const [visible, setVisible] = useState(false);

const onClose = () => {
  setVisible(false);
};
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
      <div className="modal__payment">
      <div className="group-check-out">

<Drawer
    title="Thông tin nhận hàng"
    width={500}
    onClose={onClose}
    visible={visible}
    className="container-checkout"
>
    <Form
        {...formItemLayout}
        form={form}
        onFinish={onFinish}
    >
        <Form.Item
            name="city"
            label="Tỉnh/Thành phố"
            hasFeedback
            rules={[
                {
                    required: true,
                    message: 'Vui lòng chọn tỉnh hoặc thành phố bạn ở !',
                },
            ]}
        >
            <Select
                showSearch
                placeholder="Tỉnh/Thành phố"
                optionFilterProp="children"
                onChange={onChangeCity}
                filterOption={(input, option) =>
                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
            >
                {
                    dataCity.map((city, index) => (
                        <Option value={city.name} key={index}>{city.name}</Option>
                    ))
                }
            </Select >
        </Form.Item>

        <Form.Item
            name="district"
            label="Quận/Huyện"
            hasFeedback
            rules={[
                {
                    required: true,
                    message: 'Vui lòng chọn quận hoặc huyện nơi bạn !',
                },
            ]}
        >
            <Select
                showSearch
                placeholder="Quận/Huyện"
                optionFilterProp="children"
                onChange={onChangeDistrict}
                filterOption={(input, option) =>
                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
            >
                {
                    dataCity.map((itemCity, index) => itemCity.name === city && (
                        itemCity.huyen.map((huyen) => (
                            <Option value={huyen.name} key={index}>{huyen.name}</Option>
                        ))
                    ))
                }
            </Select >
        </Form.Item>
        <Form.Item
            name="commune"
            label="Xã/Thị Trấn"
            hasFeedback
            rules={[
                {
                    required: true,
                    message: 'Vui lòng chọn xã bạn ở !',
                },
            ]}
        >
            <Select
                showSearch
                placeholder="Xã/Thị Trấn"
                optionFilterProp="children"
                filterOption={(input, option) =>
                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
            >
                {
                    dataCity.map(itemCity => itemCity.name === city && (
                        itemCity.huyen.map(huyen => huyen.name === district && (
                            huyen.xa.sort().map((xa, index) => (
                                <Option value={xa.name} key={index}>{xa.name}</Option>
                            ))
                        ))
                    ))
                }
            </Select >
        </Form.Item>
        <Form.Item
            name="incubation"
            label="Ấp/Số Nhà/Tên Đường"
            rules={[
                {
                    required: true,
                    message: 'Địa chỉ cụ thể !',
                }
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
                    message: 'Vui lòng nhập đúng số điện thoại !',
                }
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
                    message: 'Vui lòng chọn phuong thức thanh toán',
                },
            ]}
        >
            <Select
                placeholder="Thanh toán khi nhận hàng"
            >
                <Option value="Thanh toán khi nhận hàng">Thanh toán khi nhận hàng</Option>
            </Select >
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
  );
};

export default Details;
