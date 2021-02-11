import { Dispatch, SetStateAction } from "react";

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
