import { atom } from "recoil";
import { menus } from ".";
import { IFilter, IHistory, ISchedule } from "./types";

export const scheduleState = atom<ISchedule[]>({
  key: "scheduleState",
  default: [],
});

export const filterState = atom<IFilter>({
  key: "filterState",
  default: menus[0],
});

export const historyState = atom<IHistory[]>({
  key: "historyState",
  default: [],
});
