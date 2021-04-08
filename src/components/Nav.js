import React from 'react'
import { useHistory } from "react-router-dom";
import {useSelector} from "react-redux";
import { BsFillBagFill } from "react-icons/bs";
import { ROUTES } from '../common/constants/routes';
const Nav = () => {
    const {totalQuantities} = useSelector(state => state.cart)
    const history = useHistory();
    return (
        <div className="nav">
            <div className="container">
                <div className="nav__container">
                    <div className="nav__left">
                        <div onClick={() => history.push(ROUTES.HOME)}><img src="/images/logo.webp" alt="logo"/></div>
                    </div>
                    <div className="nav__right">
                        <div onClick={() => history.push(ROUTES.CART)}>
                            <div className="basket">
                                <BsFillBagFill className="cart-icon" />
                                <span>{totalQuantities}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Nav
