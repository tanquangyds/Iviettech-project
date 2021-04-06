import { combineReducers } from 'redux';
import ProductsReducer from './ProductsReducer';
import CartReducer from './CartReducer';

const rootReducer = combineReducers({
    products: ProductsReducer,
    cart: CartReducer,
});
export default rootReducer;