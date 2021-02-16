import { useEffect, useRef } from "react";

/**
 * @param callback 外側クリック時のイベント
 */
const useOutsideClick = (callback: () => void) => {
  const ref = useRef<HTMLDivElement | HTMLFormElement>(null);
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

  return ref;
};

export default useOutsideClick;
