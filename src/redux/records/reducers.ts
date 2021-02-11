import { ActionTypes, IRecordAction } from "./types";
import { IRecord } from "../../util/types";

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
    case ActionTypes.UPDATE_RECORD:
      return [
        ...state.map((record) => {
          if (record.id === action.payload.id) {
            return { ...record, ...action.payload };
          }
          return record;
        }),
      ];
    case ActionTypes.DELETE_RECORD:
      return [...state.filter((record) => record.id === action.payload)];
    default:
      return state;
  }
};
