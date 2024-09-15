import { actionType } from "../actionTypes";

// Initial State
const initialState = {
  jobs: [],
  status: "idle",
  error: null,
};

// Reducer
export const jobsReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.FETCH_JOBS_REQUEST:
      return { ...state, status: "loading" };
    case actionType.FETCH_JOBS_SUCCESS:
      return { ...state, status: "succeeded", jobs: action.payload };
    case actionType.FETCH_JOBS_FAILURE:
      return { ...state, status: "failed", error: action.payload };

    case actionType.APPLY_FOR_JOB_SUCCESS:
      return {
        ...state,
        jobs: state.jobs.map((job) =>
          job.Id === action.payload
            ? { ...job, TotalApplications: job.TotalApplications + 1 }
            : job
        ),
      };
    default:
      return state;
  }
};
