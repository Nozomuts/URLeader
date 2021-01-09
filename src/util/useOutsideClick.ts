import { MutableRefObject } from "react";
import { useEffect } from "react";

/**
 * @param ref useRefで作成した定数
 * @param callback 外側クリック時のイベント
 */
const useOutsideClick = (
  ref: MutableRefObject<any>,
  callback: () => void
): void => {
  const handler = (e: any) => {
    if (ref.current && !ref.current.contains(e.target)) {
      callback();
    }
  };

  useEffect(() => {
    document.addEventListener("click", handler);

    return () => {
      document.removeEventListener("click", handler);
    };
  });
};

export default useOutsideClick;
