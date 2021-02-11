import { ActionTypes, IFilter } from "./types";

export const setRecord = (filter: IFilter) => ({
  type: ActionTypes.SET_FILTER,
  payload: filter,
});
