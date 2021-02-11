import { ActionTypes, IRecord } from "./types";
import { recordsTable } from "../../db";
import { Dispatch } from "redux";

export const createRecord = ({ ...record }: IRecord) => async (
  dispatch: Dispatch
) => {
  await recordsTable.put({ ...record });
  dispatch({
    type: ActionTypes.CREATE_RECORD,
    payload: record,
  });
};

export const readRecords = () => async (dispatch: Dispatch) => {
  const records = await recordsTable.toArray();
  dispatch({
    type: ActionTypes.READ_RECORDS,
    payload: records,
  });
};

export const updateRecord = (
  id: string,
  { ...record }: Partial<Omit<IRecord, "id">>
) => async (dispatch: Dispatch) => {
  await recordsTable.update(id, record);
  dispatch({
    type: ActionTypes.UPDATE_RECORD,
    payload: { id, ...record },
  });
};

export const deleteRecord = (id: string) => async (dispatch: Dispatch) => {
  await recordsTable.delete(id);
  dispatch({
    type: ActionTypes.DELETE_RECORD,
    payload: id,
  });
};
