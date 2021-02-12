import dayjs from "dayjs";
import { ActionTypes, IFilter, IFilterAction } from "./types";

export const filters = [
  {
    name: "すべて",
    description: "すべての予定を表示します",
  },
  {
    name: "今日",
    func: (date: string) =>
      dayjs(date).startOf("date").valueOf() < dayjs().endOf("date").valueOf(),
    description: "今日の予定を表示します",
  },
  {
    name: "今週",
    func: (date: string) =>
      dayjs(date).startOf("date").valueOf() < dayjs().endOf("week").valueOf(),
    description: "今週の予定を表示します",
  },
  {
    name: "履歴",
    description: "過去に登録した予定の日時を変更して復元できます",
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
