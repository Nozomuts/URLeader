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
  const handleClick = (e: any) => {
    if (ref.current && !ref.current.contains(e.target)) {
      callback();
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  });
};

export default useOutsideClick;
