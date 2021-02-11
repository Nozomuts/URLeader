import { IRecord } from "./../util/types";
import { ISchedule } from "../util/types";
import { ActionTypes } from "./types";

export const action = {
  createSchedule: ({ ...schedule }: ISchedule) => ({
    type: ActionTypes.CREATE_SCHEDULE,
    payload: schedule,
  }),
  readSchedule: ({ ...schedule }: ISchedule[]) => ({
    type: ActionTypes.READ_SCHEDULE,
    payload: schedule,
  }),
  updateSchedule: ({ ...schedule }: Partial<ISchedule>) => ({
    type: ActionTypes.UPDATE_SCHEDULE,
    payload: schedule,
  }),
  deleteSchedule: (id: string) => ({
    type: ActionTypes.DELETE_SCHEDULE,
    payload: id,
  }),
  createRecord: ({ ...record }: IRecord) => ({
    type: ActionTypes.CREATE_RECORD,
    payload: record,
  }),
  readRecords: ({ ...record }: IRecord[]) => ({
    type: ActionTypes.READ_RECORDS,
    payload: record,
  }),
  updateRecord: ({ ...record }: Partial<IRecord>) => ({
    type: ActionTypes.UPDATE_RECORD,
    payload: record,
  }),
  deleteRecord: (id: string) => ({
    type: ActionTypes.DELETE_RECORD,
    payload: id,
  }),
};
