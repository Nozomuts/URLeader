import { Dispatch, Reducer } from "react";
import { ISchedule, IRecord } from "../util/types";

export type IState = { schedule: ISchedule[]; records: IRecord[] };

export type IAction =
  //schedule
  | { type: typeof ActionTypes.CREATE_SCHEDULE; payload: ISchedule }
  | { type: typeof ActionTypes.READ_SCHEDULE; payload: ISchedule[] }
  | {
      type: typeof ActionTypes.UPDATE_SCHEDULE;
      payload: Partial<Omit<ISchedule, "id">> & { id: string };
    }
  | { type: typeof ActionTypes.DELETE_SCHEDULE; payload: string }
  //record
  | { type: typeof ActionTypes.CREATE_RECORD; payload: IRecord }
  | { type: typeof ActionTypes.READ_RECORDS; payload: IRecord[] }
  | {
      type: typeof ActionTypes.UPDATE_RECORD;
      payload: Partial<Omit<IRecord, "id">> & { id: string };
    }
  | { type: typeof ActionTypes.DELETE_RECORD; payload: string };

export type IStore = { state: IState; dispatch: Dispatch<IAction> };

export type IReducer = Reducer<IState, IAction>;

export const ActionTypes = {
  //schedule
  CREATE_SCHEDULE: "CREATE_SCHEDULE",
  READ_SCHEDULE: "READ_SCHEDULE",
  UPDATE_SCHEDULE: "UPDATE_SCHEDULE",
  DELETE_SCHEDULE: "DELETE_SCHEDULE",
  //record
  CREATE_RECORD: "CREATE_RECORD",
  READ_RECORDS: "READ_RECORDS",
  UPDATE_RECORD: "UPDATE_RECORD",
  DELETE_RECORD: "DELETE_RECORD",
} as const;
