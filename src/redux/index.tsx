import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";
import { recordsReducer } from "./records/reducers";
import { scheduleReducer } from "./schedule/reducers";

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION__: any;
  }
}

const rootReducer = combineReducers({
  schedule: scheduleReducer,
  records: recordsReducer,
});

export const store = createStore(
  rootReducer,
  applyMiddleware(
    thunk,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);
