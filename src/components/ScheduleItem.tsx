import React, { Dispatch, FC, SetStateAction, useState } from "react";
import { RiDeleteBinLine, RiEdit2Line } from "react-icons/ri";
import { toast } from "react-toastify";
import { deleteSchedule } from "../db/schedule";
import { ISchedule } from "../util/types";
import { EditScheduleForm } from "./EditScheduleForm";

type IProps = {
  setSchedule: Dispatch<SetStateAction<ISchedule[]>>;
} & ISchedule;

export const ScheduleItem: FC<IProps> = ({
  id,
  url,
  date,
  memo,
  setSchedule,
}) => {
  const [open, setOpen] = useState(false);
  const removeSchedule = (id: string) => {
    if (confirm("本当に削除しますか？")) {
      deleteSchedule(id);
      setSchedule((prev) => prev.filter((el) => el.id !== id));
      toast("削除しました");
    }
  };

  return open ? (
    <EditScheduleForm
      key={id}
      schedule={{ id, url, date, memo }}
      setOpen={setOpen}
      setSchedule={setSchedule}
      open={open}
    />
  ) : (
    <div
      key={id}
      className="p-4 rounded-md mb-4 border max-w-2xl w-full flex flex-col"
    >
      <div className="overflow-ellipsis mb-2 flex items-center group relative z-10 mr-auto">
        <div className="hidden absolute bottom-6 group-hover:inline-block">
          <div className="bg-black text-white text-xs rounded py-2 px-2 flex items-center max-w-xss lg:max-w-3xl">
            <span>URL: </span>
            <a
              href={url}
              className="underline hover:text-main overflow-ellipsis w-auto overflow-x-hidden whitespace-nowrap"
              target="_blank"
              rel="noopener noreferrer"
            >
              {url}
            </a>
            <svg
              className="absolute text-black h-2 left-0 ml-3 top-full"
              x="0px"
              y="0px"
              viewBox="0 0 255 255"
            >
              <polygon
                className="fill-current"
                points="0,0 127.5,127.5 255,0"
              />
            </svg>
          </div>
        </div>
        <span className="underline">{memo || url}</span>
      </div>
      <div className="flex justify-between">
        <div>{date}</div>
        <div className="flex">
          <button
            className="mr-2 icon-button"
            aria-label="編集"
            onClick={() => setOpen(true)}
          >
            <RiEdit2Line size={25} />
          </button>
          <button
            className="icon-button"
            aria-label="削除"
            onClick={() => removeSchedule(id)}
          >
            <RiDeleteBinLine size={25} />
          </button>
        </div>
      </div>
    </div>
  );
};
