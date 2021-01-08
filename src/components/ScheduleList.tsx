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
              className="p-4 rounded-md mb-4 border max-w-2xl w-full flex flex-col group"
            >
              <div className="overflow-ellipsis mb-2 flex items-center">
                <span className="group-hover:hidden underline">
                  {memo || url}
                </span>
                <span className="hidden group-hover:inline-block">
                  URL: {url}
                </span>
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
