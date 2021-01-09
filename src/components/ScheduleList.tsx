import { Dispatch } from "react";
import { SetStateAction } from "react";
import { FC } from "react";
import { useState } from "react";
import { RiDeleteBinLine, RiEdit2Line } from "react-icons/ri";
import { deleteSchedule } from "../db/schedule";
import { IFilter, ISchedule } from "../util/types";
import { EditScheduleForm } from "./EditScheduleForm";

type IProps = {
  schedule: ISchedule[];
  setSchedule: Dispatch<SetStateAction<ISchedule[]>>;
  filter: IFilter;
};

export const ScheduleList: FC<IProps> = ({ schedule, setSchedule, filter }) => {
  const [edit, setEdit] = useState("");

  const removeSchedule = (id: string) => {
    if (confirm("本当に削除しますか？")) {
      deleteSchedule(id);
      setSchedule((prev) => prev.filter((el) => el.id !== id));
    }
  };

  return (
    <>
      {schedule
        .filter(({ date }) => (filter.func ? filter.func(date) : true))
        .map(({ id, url, date, memo }) =>
          edit === id ? (
            <EditScheduleForm
              key={id}
              schedule={{ id, url, date, memo }}
              setEdit={setEdit}
              setSchedule={setSchedule}
              edit={edit}
            />
          ) : (
            <div
              key={id}
              className="p-4 rounded-md mb-4 border max-w-2xl w-full flex flex-col"
            >
              <div className="overflow-ellipsis mb-2 flex items-center group relative z-10">
                <div className="hidden absolute bottom-6 group-hover:inline-block">
                  <div className="bg-black text-white text-xs rounded py-2 px-2 flex items-center max-w-xss lg:max-w-3xl">
                    <span>URL: </span>
                    <a
                      href={url}
                      className="underline hover:text-main overflow-ellipsis w-auto overflow-x-hidden"
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
                    onClick={() => setEdit(id)}
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
          )
        )}
    </>
  );
};
