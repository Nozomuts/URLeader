import dayjs from "dayjs";

export const menus = [
  {
    name: "すべて",
  },
  {
    name: "今日",
    func: (date: string) =>
      dayjs(date).startOf("date").valueOf() <
      dayjs().startOf("date").add(1, "day").valueOf(),
  },
  {
    name: "1週間",
    func: (date: string) =>
      dayjs(date).startOf("date").valueOf() <
      dayjs().startOf("date").add(7, "day").valueOf(),
  },
] as const;
