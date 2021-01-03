import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { AddScheduleForm } from "../components/AddScheduleForm";
import { readSchedules, deleteSchedule } from "../db/schedules";
import { ISchedule } from "../util/types";
import { RiDeleteBinLine, RiEdit2Line } from "react-icons/ri";
import { EditScheduleForm } from "../components/EditSchedultForm";

export default function index(): JSX.Element {
  const [filter, setFilter] = useState<{
    name: string;
    description: string;
    filter?: (date: string) => boolean;
  }>({
    name: "すべて",
    description: "すべての予定を表示します",
  });
  const [menus] = useState([
    {
      name: "すべて",
      description: "すべての予定を表示します",
    },
    {
      name: "今日",
      description: "今日の予定を表示します",
      filter: (date: string) =>
        dayjs(date).startOf("date").valueOf() <
        dayjs().startOf("date").add(1, "day").valueOf(),
    },
    {
      name: "近日",
      description: "5日以内の予定を表示します",
      filter: (date: string) =>
        dayjs(date).startOf("date").valueOf() <
        dayjs().startOf("date").add(5, "day").valueOf(),
    },
  ]);
  const [schedules, setSchedules] = useState<ISchedule[]>([]);
  const [edit, setEdit] = useState("");

  useEffect(() => {
    readSchedules().then(setSchedules); // () =>
  }, []);

  useEffect(() => {
    schedules.forEach(({ url, date, id }) => {
      const datetime = dayjs(date).valueOf();
      const now = dayjs().valueOf();
      //読み込み時と出力時の差分のミリ秒を計算。
      const tweetTime = datetime - now + 1000;
      console.log(tweetTime);
      setTimeout(() => {
        if (process.browser) {
          window.open(url, "_blank");
          deleteSchedule(id);
          setSchedules((prev) => prev.filter((el) => el.id !== id));
        }
      }, tweetTime);
    });
  }, [schedules]);

  const removeSchedule = (id: string) => {
    if (confirm("本当に削除しますか？")) {
      deleteSchedule(id);
      setSchedules((prev) => prev.filter((el) => el.id !== id));
    }
  };

  return (
    <div className="flex">
      <div className="px-12 mw-80 text-left pt-10">
        {menus.map((menu) => (
          <button
            key={menu.name}
            className={`hover:bg-white cursor-pointer rounded-md pl-6 py-4 mb-4 duration-300 focus:outline-none block w-56 text-left ${
              menu.name === filter.name ? "bg-white" : ""
            }`}
            onClick={() => setFilter(menu)}
          >
            {menu.name}
          </button>
        ))}
        {/* <button className="text-main block pl-4 my-4 cursor-pointer rounded-md py-4 w-full hover:bg-gray-200 duration-300 focus:outline-none text-left">
          ＋ フィルターを追加
        </button> */}
      </div>

      <div className="bg-white w-full px-12">
        <h1 className="text-3xl font-bold pt-10 bg-white pb-4">
          {filter.name}
        </h1>
        <div className="h-content overflow-y-auto">
          <AddScheduleForm
            setSchedules={setSchedules}
            dir="up"
            schedulesLength={
              schedules.filter(({ date }) =>
                filter.filter ? filter.filter(date) : true
              ).length
            }
          />
          {schedules
            .filter(({ date }) => (filter.filter ? filter.filter(date) : true))
            .map(({ id, url, date, memo }) =>
              edit === id ? (
                <EditScheduleForm
                  key={id}
                  schedule={{ id, url, date, memo }}
                  setEdit={setEdit}
                  setSchedules={setSchedules}
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
                      className="text-main underline hover:bg-gray-200"
                    >
                      <span className="group-hover:hidden">{memo || url}</span>
                      <span className="hidden group-hover:inline-block">
                        {url}
                      </span>
                    </a>
                    <div>{date}</div>
                  </div>
                  <div className="flex">
                    <RiEdit2Line
                      className="mr-2 cursor-pointer hidden group-hover:inline-block hover:bg-gray-200 rounded-md"
                      size={25}
                      onClick={() => setEdit(id)}
                    />
                    <RiDeleteBinLine
                      className="cursor-pointer hidden group-hover:inline-block hover:bg-gray-200 rounded-md"
                      size={25}
                      onClick={() => removeSchedule(id)}
                    />
                  </div>
                </div>
              )
            )}
          <AddScheduleForm
            setSchedules={setSchedules}
            dir="down"
            schedulesLength={
              schedules.filter(({ date }) =>
                filter.filter ? filter.filter(date) : true
              ).length
            }
          />
        </div>
      </div>
    </div>
  );
}
