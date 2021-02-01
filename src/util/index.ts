import dayjs from "dayjs";
import { Dispatch, SetStateAction } from "react";

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
  {
    name: "履歴",
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

export const urlValidate = {
  required: "入力してください",
  pattern: {
    // eslint-disable-next-line no-useless-escape
    value: /https?:\/\/[\w!\?/\+\-_~=;\.,\*&@#\$%\(\)'\[\]]+/,
    message: "無効なURLです",
  },
};

export const confirmClose = (
  open: boolean,
  isDirty: boolean,
  setOpen: Dispatch<SetStateAction<boolean>>
) => {
  if (open && !isDirty) {
    setOpen(false);
  } else if (open && isDirty) {
    if (confirm("入力内容が消えてしまいますが、本当に閉じますか？")) {
      setOpen(false);
    }
  }
};
