export type IRecord = {
  id: string;
  url: string;
  date: string;
  memo?: string;
};

export const ActionTypes = {
  CREATE_RECORD: "CREATE_RECORD",
  READ_RECORDS: "READ_RECORDS",
  DELETE_RECORD: "DELETE_RECORD",
  DELETE_ALL_RECORD: "DELETE_ALL_RECORD",
} as const;

export type IRecordAction =
  | { type: typeof ActionTypes.CREATE_RECORD; payload: IRecord }
  | { type: typeof ActionTypes.READ_RECORDS; payload: IRecord[] }
  | { type: typeof ActionTypes.DELETE_RECORD; payload: string }
  | { type: typeof ActionTypes.DELETE_ALL_RECORD };
