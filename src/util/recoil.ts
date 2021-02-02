import { atom } from "recoil";
import { menus } from ".";
import { IFilter, ISchedule } from "./types";

export const scheduleState = atom<ISchedule[]>({
  key: "scheduleState",
  default: [],
});

export const filterState = atom<IFilter>({
  key: "filterState",
  default: menus[0],
});
