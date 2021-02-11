export type IFilter = {
  name: string;
  func?: (date: string) => boolean;
};

export const ActionTypes = {
  SET_FILTER: "SET_FILTER",
} as const;

export type IFilterAction = {
  type: typeof ActionTypes.SET_FILTER;
  payload: IFilter;
};
