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
      className="absolute -translate-y-1/2 -translate-x-1/2 bg-white top-1/2 left-1/2 transform border-gray-200 border p-10 rounded-md shadow-md max-h-4/5"
      ref={ref as any}
    >
      <div className="h-full overflow-y-auto">{children}</div>
      <button className="button" onClick={() => setOpen(false)}>
        閉じる
      </button>
    </div>
  );
};
