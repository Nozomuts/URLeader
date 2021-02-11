import { IRecord } from "./../util/types";
import { ISchedule } from "../util/types";
import { ActionTypes } from "./types";

export const actions = {
  // Schedule
  createSchedule: ({ ...schedule }: ISchedule) => ({
    type: ActionTypes.CREATE_SCHEDULE,
    payload: schedule,
  }),
  readSchedule: (schedule: ISchedule[]) => ({
    type: ActionTypes.READ_SCHEDULE,
    payload: schedule,
  }),
  updateSchedule: (
    id: string,
    { ...schedule }: Partial<Omit<ISchedule, "id">>
  ) => ({
    type: ActionTypes.UPDATE_SCHEDULE,
    payload: { id, ...schedule },
  }),
  deleteSchedule: (id: string) => ({
    type: ActionTypes.DELETE_SCHEDULE,
    payload: id,
  }),

  // Record
  createRecord: ({ ...record }: IRecord) => ({
    type: ActionTypes.CREATE_RECORD,
    payload: record,
  }),
  readRecords: (records: IRecord[]) => ({
    type: ActionTypes.READ_RECORDS,
    payload: records,
  }),
  updateRecord: (
    id: string,
    { ...record }: Partial<Omit<ISchedule, "id">>
  ) => ({
    type: ActionTypes.UPDATE_RECORD,
    payload: { id, ...record },
  }),
  deleteRecord: (id: string) => ({
    type: ActionTypes.DELETE_RECORD,
    payload: id,
  }),
};
