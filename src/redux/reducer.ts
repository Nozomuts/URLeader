import { initialState } from ".";
import { ActionTypes, IState, IAction } from "./types";

export const reducer = (state: IState = initialState, action: IAction) => {
  switch (action.type) {
    // schedule
    case ActionTypes.CREATE_SCHEDULE:
      return {
        ...state,
      };
    case ActionTypes.READ_SCHEDULE:
      return {
        ...state,
      };
    case ActionTypes.UPDATE_SCHEDULE:
      return {
        ...state,
      };
    case ActionTypes.DELETE_SCHEDULE:
      return {
        ...state,
      };
    // record
    case ActionTypes.CREATE_RECORD:
      return {
        ...state,
      };
    case ActionTypes.READ_RECORDS:
      return {
        ...state,
      };
    case ActionTypes.UPDATE_RECORD:
      return {
        ...state,
      };
    case ActionTypes.DELETE_RECORD:
      return {
        ...state,
      };
    default:
      return state;
  }
};
