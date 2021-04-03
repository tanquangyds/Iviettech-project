import React, { useEffect } from "react";
import Header from "../../components/Header";
import { useSelector, useDispatch } from "react-redux";
import currencyFormatter from "currency-formatter";
import { Link } from "react-router-dom";
import { getProducts } from "../../redux/actions/Products";
const Home = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProducts());
  }, []);
  const { products } = useSelector((state) => state.products);
  console.log(products);
  return (
    <div>
      <Header />
      <div className="container">
        <div className="row">
          {products.map((product) => (
            <div className="col-3" key={product.id}>
              <div className="product">
                <div className="product__img">
                  <Link to={`/details/${product.id}`}>
                    <img src={product.poster[0].url} alt="image name" />
                  </Link>
                </div>
                <div className="product__name">{product.name}</div>
                <div className="row">
                  <div className="col-6">
                    <div className="product__price">
                      <span className="actualPrice">
                        {currencyFormatter.format(product.price, {
                          code: "USD",
                        })}
                      </span>{" "}
                      <span className="discount">{product.discount}%</span>
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="product__discount__price">
                      {currencyFormatter.format(product.discountPrice, {
                        code: "USD",
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
