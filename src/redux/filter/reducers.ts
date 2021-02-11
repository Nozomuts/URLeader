import dayjs from "dayjs";
import { ActionTypes, IFilter, IFilterAction } from "./types";

export const filters = [
  {
    name: "すべて",
  },
  {
    name: "今日",
    func: (date: string) =>
      dayjs(date).startOf("date").valueOf() < dayjs().endOf("date").valueOf(),
  },
  {
    name: "今週",
    func: (date: string) =>
      dayjs(date).startOf("date").valueOf() < dayjs().endOf("week").valueOf(),
  },
  {
    name: "履歴",
  },
] as const;

const initialState: IFilter = filters[0];

export const filterReducer = (
  state: IFilter = initialState,
  action: IFilterAction
) => {
  switch (action.type) {
    case ActionTypes.SET_FILTER:
      return action.payload;
    default:
      return state;
  }
};
