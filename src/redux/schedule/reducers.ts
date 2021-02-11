import { ActionTypes, IScheduleAction } from "./types";
import { ISchedule } from "../../util/types";

const initialState: ISchedule[] = [];

export const scheduleReducer = (
  state: ISchedule[] = initialState,
  action: IScheduleAction
) => {
  switch (action.type) {
    case ActionTypes.CREATE_SCHEDULE:
      return [...state, action.payload];
    case ActionTypes.READ_SCHEDULE:
      return action.payload;
    case ActionTypes.UPDATE_SCHEDULE:
      return [
        ...state.map((schedule) => {
          if (schedule.id === action.payload.id) {
            return { ...schedule, ...action.payload };
          }
          return schedule;
        }),
      ];
    case ActionTypes.DELETE_SCHEDULE:
      return [...state.filter((schedule) => schedule.id === action.payload)];
    default:
      return state;
  }
};
