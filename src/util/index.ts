import dayjs from "dayjs";

export const menus = [
  {
    name: "すべて",
  },
  {
    name: "今日",
    func: (date: string) =>
      dayjs(date).startOf("date").valueOf() < dayjs().endOf("date").valueOf(),
  },
  {
    name: "今週",
    func: (date: string) =>
      dayjs(date).startOf("date").valueOf() < dayjs().endOf("week").valueOf(),
  },
] as const;

let is_sp_cache: boolean | null = null;

/** 画面サイズがSPサイズかどうか */
export const is_sp = () => {
  if (is_sp_cache === null) {
    if (process.browser) {
      is_sp_cache = window.innerWidth <= 560;
    }
  }
  return is_sp_cache;
};
