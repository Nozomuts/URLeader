import { ActionTypes, IRecord } from "./types";
import { recordsTable } from "../../db";
import { Dispatch } from "redux";
import { toast } from "react-toastify";

export const createRecord = ({ ...record }: IRecord) => async (
  dispatch: Dispatch
) => {
  try {
    await recordsTable.put({ ...record });
    dispatch({
      type: ActionTypes.CREATE_RECORD,
      payload: record,
    });
    toast("追加しました");
  } catch {
    toast.error("追加に失敗しました");
  }
};

export const readRecords = () => async (dispatch: Dispatch) => {
  try {
    const records = await recordsTable.toArray();
    dispatch({
      type: ActionTypes.READ_RECORDS,
      payload: records,
    });
  } catch {
    toast.error("データの読み込みに失敗しました");
  }
};

export const updateRecord = (
  id: string,
  { ...record }: Partial<Omit<IRecord, "id">>
) => async (dispatch: Dispatch) => {
  try {
    await recordsTable.update(id, record);
    dispatch({
      type: ActionTypes.UPDATE_RECORD,
      payload: { id, ...record },
    });
    toast("変更しました");
  } catch {
    toast.error("変更に失敗しました");
  }
};

export const deleteRecord = (id: string) => async (dispatch: Dispatch) => {
  try {
    await recordsTable.delete(id);
    dispatch({
      type: ActionTypes.DELETE_RECORD,
      payload: id,
    });
    toast("削除しました");
  } catch {
    toast.error("削除に失敗しました");
  }
};
