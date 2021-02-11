export type IRecord = {
  id: string;
  url: string;
  date: string;
  memo: string;
};

export const ActionTypes = {
  CREATE_RECORD: "CREATE_RECORD",
  READ_RECORDS: "READ_RECORDS",
  UPDATE_RECORD: "UPDATE_RECORD",
  DELETE_RECORD: "DELETE_RECORD",
} as const;

export type IRecordAction =
  | { type: typeof ActionTypes.CREATE_RECORD; payload: IRecord }
  | { type: typeof ActionTypes.READ_RECORDS; payload: IRecord[] }
  | {
      type: typeof ActionTypes.UPDATE_RECORD;
      payload: { id: string; url?: string; date?: string; memo?: string };
    }
  | { type: typeof ActionTypes.DELETE_RECORD; payload: string };
