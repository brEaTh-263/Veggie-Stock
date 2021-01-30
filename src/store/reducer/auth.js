import { LOG_IN_AS_ADMIN } from "../actions/auth";

const initialState = {
  token: "",
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOG_IN_AS_ADMIN: {
      return {
        token: action.token,
      };
    }
    default: {
      return state;
    }
  }
};
