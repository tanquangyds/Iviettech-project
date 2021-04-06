const initState = JSON.parse(localStorage.getItem("cart")) || {
  products: [],
  totalPrice: 0,
  totalQuantities: 0,
};

const CartReducer = (state = initState, action) => {
  let findPro;
  let index;
  switch (action.type) {
    case "ADD_TO_CART":
      const { product, quantity } = action.payload;
      const check = state.products.find((pr) => pr.id === product.id);
      if (check) {
        return state;
      } else {
        const Tprice = state.totalPrice + product.discountPrice * quantity;
        const Tquantities = state.totalQuantities + quantity;
        product.quantity = quantity;
        let newState = {
          ...state,
          products: [...state.products, product],
          totalPrice: Tprice,
          totalQuantities: Tquantities,
        };
        localStorage.setItem("cart", JSON.stringify(newState));
        return newState;
      }
    case "INC":
      findPro = state.products.find((product) => product.id === action.payload);
      index = state.products.findIndex(
        (product) => product.id === action.payload
      );
      findPro.quantity += 1;
      state.products[index] = findPro;
      let newState = {
        ...state,
        totalPrice: state.totalPrice + findPro.discountPrice,
        totalQuantities: state.totalQuantities + 1,
      };
      localStorage.setItem("cart", JSON.stringify(state));
      return newState;
    case "DEC":
      findPro = state.products.find((product) => product.id === action.payload);
      index = state.products.findIndex(
        (product) => product.id === action.payload
      );
      if (findPro.quantity > 1) {
        findPro.quantity -= 1;
        state.products[index] = findPro;
        let newState = {
          ...state,
          totalPrice: state.totalPrice - findPro.discountPrice,
          totalQuantities: state.totalQuantities - 1,
        };
        localStorage.setItem("cart", JSON.stringify(state));
        return newState;
      } else {
        return state;
      }
    case "REMOVE":
      findPro = state.products.find((product) => product.id === action.payload);
      const filtered = state.products.filter(
        (product) => product.id !== action.payload
      );
      let abcState = {
        ...state,
        products: filtered,
        totalPrice: state.totalPrice - findPro.discountPrice * findPro.quantity,
        totalQuantities: state.totalQuantities - findPro.quantity,
      };
      return newState;
    default:
      return state;
  }
};
export default CartReducer;
