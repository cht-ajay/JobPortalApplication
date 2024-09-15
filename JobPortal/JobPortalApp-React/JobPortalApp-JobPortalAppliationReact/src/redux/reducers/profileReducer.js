// src/redux/reducers/profileReducer.js
import { actionType } from "../actionTypes";
const initialState = {
  loading: false,
  profile: null,
  error: null,
};

export const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.FETCH_PROFILE_REQUEST:
      return { ...state, loading: true, error: null };
    case actionType.FETCH_PROFILE_SUCCESS:
      return { ...state, loading: false, profile: action.payload, error: null };
    case actionType.FETCH_PROFILE_FAILURE:
      return { ...state, loading: false, profile: null, error: action.payload };
    default:
      return state;
  }
};
