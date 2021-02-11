import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";
import { recordsReducer } from "./records/reducers";
import { scheduleReducer } from "./schedule/reducers";
import { filterReducer } from "./filter/reducers";

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION__: any;
  }
}

const rootReducer = combineReducers({
  schedule: scheduleReducer,
  records: recordsReducer,
  filter: filterReducer,
});

export type IStore = ReturnType<typeof rootReducer>;

export const store = createStore(rootReducer, applyMiddleware(thunk));
