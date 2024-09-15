// src/redux/reducers/loginReducer.js
import { actionType } from "../actionTypes";

const initialState = {
  loading: false,
  token: null,
  isAuthenticated: false,
  userType: null,
  error: null,
};

export const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.FETCH_LOGIN_REQUEST:
      return { ...state, loading: true, isAuthenticated: false, error: null };
    case actionType.FETCH_LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        token: action.payload,
        isAuthenticated: true,
        userType: action.payload.userType,
        error: null,
      };
    case actionType.FETCH_LOGIN_FAILURE:
      return {
        ...state,
        loading: false,
        token: null,
        isAuthenticated: false,
        userType: null,
        error: action.payload,
      };
    case actionType.RESET_STORE:
      return {
        ...state,
        loading: false,
        token: null,
        isAuthenticated: false,
        userType: null,
        error: null,
      };
    default:
      return state;
  }
};
