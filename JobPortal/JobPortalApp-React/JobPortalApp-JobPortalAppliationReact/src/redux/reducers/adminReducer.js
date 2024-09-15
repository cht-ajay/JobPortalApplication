import { actionType } from "../actionTypes";

const initialState = {
  job: null,
  jobs: [],
  resumes: [],
  userDetails: null,
  loading: false,
  error: null,
};

export const adminReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.CREATE_JOB_REQUEST:
    case actionType.GET_JOB_REQUEST:
    case actionType.GET_ALL_RESUMES_REQUEST:

    case actionType.GET_USER_DETAILS_REQUEST:
      return { ...state, loading: true, error: null };

    case actionType.CREATE_JOB_SUCCESS:
      return { ...state, loading: false, job: action.payload };

    case actionType.GET_JOB_SUCCESS:
      return { ...state, loading: false, job: action.payload };

    case actionType.GET_ALL_RESUMES_SUCCESS:
      return { ...state, loading: false, resumes: action.payload };

    case actionType.GET_USER_DETAILS_SUCCESS:
      return { ...state, loading: false, userDetails: action.payload };

    case actionType.CREATE_JOB_FAILURE:
    case actionType.GET_JOB_FAILURE:
    case actionType.GET_ALL_RESUMES_FAILURE:
    case actionType.GET_USER_DETAILS_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
