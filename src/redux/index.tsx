import { createContext, FC, useReducer } from "react";
import { reducer } from "./reducer";
import { IAction, IReducer, IState, IStore } from "./types";

export const initialState: IState = {
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
