import { ActionTypes, IFilter } from "./types";

export const setFilter = (filter: IFilter) => ({
  type: ActionTypes.SET_FILTER,
  payload: filter,
});
