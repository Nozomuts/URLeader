import { ActionTypes } from "./types";
import { ISchedule } from "./../../util/types";
import { Dispatch } from "redux";
import { scheduleTable } from "../../db";
import dayjs from "dayjs";

export const createSchedule = ({
  ...schedule
}: Omit<ISchedule, "id">) => async (dispatch: Dispatch) => {
  const id = dayjs().toString();
  await scheduleTable.put({ id, ...schedule });
  dispatch({
    type: ActionTypes.CREATE_SCHEDULE,
    payload: { id, ...schedule },
  });
};

export const readSchedule = () => async (dispatch: Dispatch) => {
  const schedule = await scheduleTable.toArray();
  dispatch({
    type: ActionTypes.READ_SCHEDULE,
    payload: schedule,
  });
};

export const updateSchedule = (
  id: string,
  { ...schedule }: Partial<Omit<ISchedule, "id">>
) => async (dispatch: Dispatch) => {
  await scheduleTable.update(id, schedule);
  dispatch({
    type: ActionTypes.UPDATE_SCHEDULE,
    payload: { id, ...schedule },
  });
};

export const deleteSchedule = (id: string) => async (dispatch: Dispatch) => {
  await scheduleTable.delete(id);
  return dispatch({
    type: ActionTypes.DELETE_SCHEDULE,
    payload: id,
  });
};
