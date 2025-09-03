import { combineReducers } from "redux";
import taskReducer from "./utils/taskSlice";

const rootReducer = combineReducers({
  tasks: taskReducer,
});

export default rootReducer;
