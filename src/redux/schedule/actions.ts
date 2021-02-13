import { ActionTypes, ISchedule } from "./types";
import { Dispatch } from "redux";
import { scheduleTable } from "../../db";
import dayjs from "dayjs";
import { toast } from "react-toastify";

export const createSchedule = ({
  ...schedule
}: Omit<ISchedule, "id">) => async (dispatch: Dispatch) => {
  try {
    const id = dayjs().toString();
    await scheduleTable.put({ id, ...schedule });
    dispatch({
      type: ActionTypes.CREATE_SCHEDULE,
      payload: { id, ...schedule },
    });
    toast("追加しました");
  } catch {
    toast.error("追加に失敗しました");
  }
};

export const readSchedule = () => async (dispatch: Dispatch) => {
  try {
    const schedule = await scheduleTable.toArray();
    dispatch({
      type: ActionTypes.READ_SCHEDULE,
      payload: schedule,
    });
  } catch {
    toast.error("データの読み込みに失敗しました");
  }
};

export const updateSchedule = (
  id: string,
  { ...schedule }: Partial<Omit<ISchedule, "id">>
) => async (dispatch: Dispatch) => {
  try {
    await scheduleTable.update(id, schedule);
    dispatch({
      type: ActionTypes.UPDATE_SCHEDULE,
      payload: { id, ...schedule },
    });
    toast("変更しました");
  } catch {
    toast.error("変更に失敗しました");
  }
};

export const deleteSchedule = (id: string) => async (dispatch: Dispatch) => {
  try {
    await scheduleTable.delete(id);
    dispatch({
      type: ActionTypes.DELETE_SCHEDULE,
      payload: id,
    });
    toast("削除しました");
  } catch {
    toast.error("削除に失敗しました");
  }
};
