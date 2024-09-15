// src/redux/actions/profileActions.js
import axiosInstance from "../../axiosConfig";
import { actionType } from "../actionTypes";

export const fetchProfile = () => async (dispatch) => {
  dispatch({ type: actionType.FETCH_PROFILE_REQUEST });

  const token = localStorage.getItem("token");

  if (!token) {
    dispatch({
      type: actionType.FETCH_PROFILE_FAILURE,
      payload: "No token found",
    });
    return;
  }

  try {
    const response = await axiosInstance.get("/User/profile", {
      headers: {
        Authorization: `Bearer ${token}`, // Send the JWT token in the Authorization header
      },
    });

    dispatch({
      type: actionType.FETCH_PROFILE_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: actionType.FETCH_PROFILE_FAILURE,
      payload: "Failed to fetch profile",
    });
  }
};
