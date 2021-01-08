import { Dispatch, useRef } from "react";
import { SetStateAction } from "react";
import { FC } from "react";
import useOutsideClick from "../util/useOutsideClick";

type IProps = {
  setOpen: Dispatch<SetStateAction<boolean>>;
};

export const Modal: FC<IProps> = ({ children, setOpen }) => {
  const ref = useRef<HTMLDivElement>();
  useOutsideClick(ref, () => {
    setOpen(false);
  });

  return (
    <div
      className="absolute -translate-y-1/2 -translate-x-1/2 bg-white top-1/2 left-1/2 transform border-gray-200 border p-4 md:rounded-md shadow-md max-w-2xl w-full md:w-4/5 h-full md:h-120"
      ref={ref as any}
    >
      <div className="max-h-content overflow-y-auto">{children}</div>
      <button className="button w-full" onClick={() => setOpen(false)}>
        閉じる
      </button>
    </div>
  );
};
