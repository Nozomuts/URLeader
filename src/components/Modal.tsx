import { Dispatch, useRef } from "react";
import { SetStateAction } from "react";
import { FC } from "react";
import { RiCloseLine } from "react-icons/ri";
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
      className="absolute -translate-y-1/2 -translate-x-1/2 bg-white top-1/2 left-1/2 transform border-gray-200 border p-4 md:rounded-md shadow-md max-w-2xl w-full h-full md:w-4/5 md:h-120 z-20"
      ref={ref as any}
    >
      <div className="flex justify-between items-center h-12 pb-4">
        <h1 className="font-bold">取得リスト</h1>
        <button className="" aria-label="閉じる" onClick={() => setOpen(false)}>
          <RiCloseLine size={20} />
        </button>
      </div>
      <div className="modal-content overflow-y-auto">{children}</div>
    </div>
  );
};
