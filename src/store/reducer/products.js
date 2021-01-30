import { EDIT_PRODUCT, GET_ALL_PRODUCTS } from "../actions/products";

const initialState = {
  products: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_PRODUCTS: {
      return {
        products: action.data,
      };
    }
    case EDIT_PRODUCT: {
      const newProducts = state.products.filter(
        (prod) => prod._id !== action.data
      );
      return {
        products: newProducts,
      };
    }
    default: {
      return state;
    }
  }
};
