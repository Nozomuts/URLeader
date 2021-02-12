import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { recordsReducer } from "./records/reducers";
import { scheduleReducer } from "./schedule/reducers";
import { filterReducer } from "./filter/reducers";

export type IStore = ReturnType<typeof rootReducer>;

const rootReducer = combineReducers({
  schedule: scheduleReducer,
  records: recordsReducer,
  filter: filterReducer,
});

export const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);
