export type ISchedule = {
  id: string;
  url: string;
  date: string;
  memo?: string;
};

export const ActionTypes = {
  CREATE_SCHEDULE: "CREATE_SCHEDULE",
  READ_SCHEDULE: "READ_SCHEDULE",
  UPDATE_SCHEDULE: "UPDATE_SCHEDULE",
  DELETE_SCHEDULE: "DELETE_SCHEDULE",
} as const;

export type IScheduleAction =
  | { type: typeof ActionTypes.CREATE_SCHEDULE; payload: ISchedule }
  | { type: typeof ActionTypes.READ_SCHEDULE; payload: ISchedule[] }
  | {
      type: typeof ActionTypes.UPDATE_SCHEDULE;
      payload: { id: string; url?: string; date?: string; memo?: string };
    }
  | { type: typeof ActionTypes.DELETE_SCHEDULE; payload: string };
