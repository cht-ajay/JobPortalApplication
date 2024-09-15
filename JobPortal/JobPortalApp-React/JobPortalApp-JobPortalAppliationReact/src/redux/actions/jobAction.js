import axiosInstance from "../../axiosConfig";
import { actionType } from "../actionTypes";

export const fetchJobs = () => async (dispatch) => {
  dispatch({ type: actionType.FETCH_JOBS_REQUEST });

  // const token = localStorage.getItem("token");
  try {
    const response = await axiosInstance.get("/Job/jobs", {
      // headers: {
      //   Authorization: `Bearer ${token}`, // Send the JWT token in the Authorization header
      // },
    });

    dispatch({
      type: actionType.FETCH_JOBS_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: actionType.FETCH_JOBS_FAILURE,
      payload: "Failed to fetch Jobs",
    });
  }
};

export const applyForJobs = (jobId) => async (dispatch) => {
  try {
    await axiosInstance.post(`/Job/jobs/apply?job_id=${jobId}`);
    dispatch({
      type: actionType.APPLY_FOR_JOB_SUCCESS,
      payload: jobId,
    });
    dispatch(fetchJobs());
  } catch (error) {
    console.error("Error applying for job", error);
  }
};
