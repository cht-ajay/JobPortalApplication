import { combineReducers } from "redux";
import { loginReducer } from "./loginReducer";
import { profileReducer } from "./profileReducer";
import { jobsReducer } from "./jobReducer";
import { adminReducer } from "./adminReducer";

const rootReducer = combineReducers({
  login: loginReducer,
  profile: profileReducer,
  jobs: jobsReducer,
  admin: adminReducer,
});

export default rootReducer;
