import { SetStateAction, Dispatch, FC } from "react";

export type ISchedule = {
  id: string;
  url: string;
  date: string;
  memo: string;
};

export type IFilter = {
  name: string;
  func?: (date: string) => boolean;
};

export type IPropsFilter = FC<{
  filter: IFilter;
  setFilter: Dispatch<SetStateAction<IFilter>>;
}>;
