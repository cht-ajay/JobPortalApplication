import axiosInstance from "../../axiosConfig";
import { actionType } from "../actionTypes";
// Create Job
export const createJob = (job) => async (dispatch) => {
  dispatch({ type: actionType.CREATE_JOB_REQUEST });
  try {
    const response = await axiosInstance.post("/admin/job", job);
    dispatch({ type: actionType.CREATE_JOB_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({
      type: actionType.CREATE_JOB_FAILURE,
      payload: error.response.data,
    });
  }
};

export const getJob = (jobId) => async (dispatch) => {
  dispatch({ type: actionType.GET_JOB_REQUEST });

  try {
    const response = await axiosInstance.get(`/admin/job/${jobId}`);
    const { job, applicants } = response.data;

    dispatch({
      type: actionType.GET_JOB_SUCCESS,
      payload: { ...job, applicants },
    });
  } catch (error) {
    dispatch({
      type: actionType.GET_JOB_FAILURE,
      payload: error.response ? error.response.data : error.message,
    });
  }
};

// Get All Resumes
export const getAllResumes = () => async (dispatch) => {
  dispatch({ type: actionType.GET_ALL_RESUMES_REQUEST });
  try {
    const response = await axiosInstance.get("/admin/resumes");
    dispatch({
      type: actionType.GET_ALL_RESUMES_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: actionType.GET_ALL_RESUMES_FAILURE,
      payload: error.response.data,
    });
  }
};

// Get User Details
export const getUserDetails = (userId) => async (dispatch) => {
  dispatch({ type: actionType.GET_USER_DETAILS_REQUEST });
  try {
    const response = await axiosInstance.get(`/admin/user/${userId}`);
    dispatch({
      type: actionType.GET_USER_DETAILS_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: actionType.GET_USER_DETAILS_FAILURE,
      payload: error.response.data,
    });
  }
};
