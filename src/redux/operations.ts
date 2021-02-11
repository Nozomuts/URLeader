import { actions } from "./actions";
import dayjs from "dayjs";
import { Dispatch } from "react";
import { recordsTable, scheduleTable } from "../db";
import { IRecord, ISchedule } from "./../util/types";
import { IAction } from "./types";

export const operations = {
  // Schedule
  createSchedule: ({ ...schedule }: Omit<ISchedule, "id">) => async (
    dispatch: Dispatch<IAction>
  ) => {
    const id = dayjs().toString();
    await scheduleTable.put({ id, ...schedule });
    dispatch(actions.createSchedule({ id, ...schedule }));
  },
  readSchedule: () => async (dispatch: Dispatch<IAction>) => {
    const schedule = await scheduleTable.toArray();
    dispatch(actions.readSchedule(schedule));
  },
  updateSchedule: (
    id: string,
    { ...schedule }: Partial<Omit<ISchedule, "id">>
  ) => async (dispatch: Dispatch<IAction>) => {
    await scheduleTable.update(id, schedule);
    dispatch(actions.updateSchedule(id, schedule));
  },
  deleteSchedule: (id: string) => async (dispatch: Dispatch<IAction>) => {
    await scheduleTable.delete(id);
    dispatch(actions.deleteSchedule(id));
  },

  // Record
  createRecord: ({ ...record }: IRecord) => async (
    dispatch: Dispatch<IAction>
  ) => {
    await recordsTable.put({ ...record });
    dispatch(actions.createRecord({ ...record }));
  },
  readRecords: () => async (dispatch: Dispatch<IAction>) => {
    const records = await recordsTable.toArray();
    dispatch(actions.readRecords(records));
  },
  updateRecord: (
    id: string,
    { ...record }: Partial<Omit<IRecord, "id">>
  ) => async (dispatch: Dispatch<IAction>) => {
    await recordsTable.update(id, record);
    dispatch(actions.updateRecord(id, record));
  },
  deleteRecord: (id: string) => async (dispatch: Dispatch<IAction>) => {
    await recordsTable.delete(id);
    dispatch(actions.deleteRecord(id));
  },
};
