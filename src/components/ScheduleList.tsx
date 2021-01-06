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
              className="p-4 rounded-md mb-4 border max-w-2xl flex justify-between group"
            >
              <div>
                <a
                  href={url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-main underline"
                >
                  <span className="group-hover:hidden">{memo || url}</span>
                  <span className="hidden group-hover:inline-block hover:bg-gray-200">
                    {url}
                  </span>
                </a>
                <div>{date}</div>
              </div>
              <div className="flex">
                <RiEdit2Line
                  className="mr-2 icon-button"
                  size={25}
                  onClick={() => setEdit(id)}
                />
                <RiDeleteBinLine
                  className="icon-button"
                  size={25}
                  onClick={() => removeSchedule(id)}
                />
              </div>
            </div>
          )
        )}
    </>
  );
};
