import {
  ADD_PRODUCT,
  EDIT_PRODUCT,
  GET_ALL_PRODUCTS,
} from "../actions/products";

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
      const newProducts = state.products.map((prod) => {
        if (prod._id === action.data._id) {
          return action.data;
        } else {
          return prod;
        }
      });
      return {
        products: newProducts,
      };
    }
    case ADD_PRODUCT: {
      const newProducts = state.products.push(action.data);
      return {
        products: newProducts,
      };
    }
    default: {
      return state;
    }
  }
};
