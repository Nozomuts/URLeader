import { createContext, Dispatch, FC, Reducer, useReducer } from "react";
import { ISchedule, IRecord } from "../util/types";

type IState = { schedule: ISchedule[]; records: IRecord[] };
type IAction =
  | { type: typeof ActionTypes.CREATE_SCHEDULE; payload: ISchedule }
  | { type: typeof ActionTypes.READ_SCHEDULE; payload: ISchedule[] }
  | { type: typeof ActionTypes.UPDATE_SCHEDULE; payload: Partial<ISchedule> }
  | { type: typeof ActionTypes.DELETE_SCHEDULE; payload: string }
  | { type: typeof ActionTypes.CREATE_RECORD; payload: IRecord }
  | { type: typeof ActionTypes.READ_RECORDS; payload: IRecord[] }
  | { type: typeof ActionTypes.UPDATE_RECORD; payload: Partial<IRecord> }
  | { type: typeof ActionTypes.DELETE_RECORD; payload: string };
type IStore = { state: IState; dispatch: Dispatch<IAction> };
type IReducer = Reducer<IState, IAction>;

const ActionTypes = {
  CREATE_SCHEDULE: "CREATE_SCHEDULE",
  READ_SCHEDULE: "READ_SCHEDULE",
  UPDATE_SCHEDULE: "UPDATE_SCHEDULE",
  DELETE_SCHEDULE: "DELETE_SCHEDULE",
  CREATE_RECORD: "CREATE_RECORD",
  READ_RECORDS: "READ_RECORDS",
  UPDATE_RECORD: "UPDATE_RECORD",
  DELETE_RECORD: "DELETE_RECORD",
} as const;

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

const initialState: IState = {
  schedule: [],
  records: [],
};

const defaultStore: IStore = {
  state: initialState,
  // eslint-disable-next-line
  dispatch: (_: IAction): void => {},
};

const Store = createContext<IStore>(defaultStore);

export const Provider: FC = ({ children }) => {
  const [state, dispatch] = useReducer<IReducer>(reducer, initialState);
  return (
    <Store.Provider value={{ state, dispatch }}>{children}</Store.Provider>
  );
};

const reducer = (state: IState = initialState, action: IAction) => {
  switch (action.type) {
    case ActionTypes.CREATE_SCHEDULE:
      return {
        ...state,
      };
    case ActionTypes.READ_SCHEDULE:
      return {
        ...state,
      };
    case ActionTypes.UPDATE_SCHEDULE:
      return {
        ...state,
      };
    case ActionTypes.DELETE_SCHEDULE:
      return {
        ...state,
      };
    case ActionTypes.CREATE_RECORD:
      return {
        ...state,
      };
    case ActionTypes.READ_RECORDS:
      return {
        ...state,
      };
    case ActionTypes.UPDATE_RECORD:
      return {
        ...state,
      };
    case ActionTypes.DELETE_RECORD:
      return {
        ...state,
      };
    default:
      return state;
  }
};
