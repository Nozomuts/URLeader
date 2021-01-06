import dayjs from "dayjs";

export const menus = [
  {
    name: "すべて",
    description: "すべての予定を表示します",
  },
  {
    name: "今日",
    description: "今日の予定を表示します",
    func: (date: string) =>
      dayjs(date).startOf("date").valueOf() <
      dayjs().startOf("date").add(1, "day").valueOf(),
  },
  {
    name: "近日",
    description: "5日以内の予定を表示します",
    func: (date: string) =>
      dayjs(date).startOf("date").valueOf() <
      dayjs().startOf("date").add(5, "day").valueOf(),
  },
] as const;
