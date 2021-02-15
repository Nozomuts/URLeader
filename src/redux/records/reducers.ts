import { ActionTypes, IRecord, IRecordAction } from "./types";

const initialState: IRecord[] = [];

export const recordsReducer = (
  state: IRecord[] = initialState,
  action: IRecordAction
) => {
  switch (action.type) {
    case ActionTypes.CREATE_RECORD:
      return [...state, action.payload];
    case ActionTypes.READ_RECORDS:
      return action.payload;
    case ActionTypes.DELETE_RECORD:
      return [...state.filter((record) => record.id !== action.payload)];
    case ActionTypes.DELETE_ALL_RECORD:
      return [];
    default:
      return state;
  }
};
