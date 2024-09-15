// src/redux/actions/loginActions.js
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { actionType } from "../actionTypes"; // Define your action types

export const loginUser = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: actionType.FETCH_LOGIN_REQUEST });

    // API call for login
    const response = await axios.post(
      process.env.REACT_APP_API_BASE_URL + "/User/login",
      {
        email,
        password,
      }
    );

    const token = response.data.token;
    localStorage.setItem("token", token); // Store the token in localStorage
    const decodedToken = jwtDecode(token);
    const userType = decodedToken.role;
    dispatch({
      type: actionType.FETCH_LOGIN_SUCCESS,
      payload: { token, userType },
    });
  } catch (error) {
    dispatch({
      type: actionType.FETCH_LOGIN_FAILURE,
      payload: error.response ? error.response.data.message : error.message,
    });
  }
};

export const resetStore = () => async (dispatch) => {
  dispatch({ type: actionType.RESET_STORE });
};
