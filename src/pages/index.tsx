import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { AddScheduleForm } from "../components/AddScheduleForm";
import { getSchedules, removeSchedule } from "../db/schedules";
import { ISchedule } from "../util/types";
import { RiDeleteBinLine, RiEdit2Line } from "react-icons/ri";

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
        dayjs(date).valueOf() < dayjs().add(1, "day").valueOf(),
    },
    {
      name: "近日",
      description: "5日以内の予定を表示します",
      filter: (date: string) =>
        dayjs(date).valueOf() < dayjs().add(5, "day").valueOf(),
    },
  ]);
  const [schedules, setSchedules] = useState<ISchedule[]>([]);

  useEffect(() => {
    getSchedules().then(setSchedules); // () =>
  }, []);

  // schedules.forEach(({ url, date }) => {
  //   const dateTime = dayjs(date).get("second");
  //   const setTime = dayjs().get("second");
  //   //読み込み時と出力時の差分のミリ秒を計算します。
  //   const tweetTime = setTime - dateTime + 1000;
  //   setTimeout(() => {
  //     if (process.browser) {
  //       window.open(url, "_blank");
  //     }
  //   }, tweetTime);
  // });

  const deleteSchedule = (id: string) => {
    if (confirm("本当に削除しますか？")) {
      removeSchedule(id);
      setSchedules((prev) => prev.filter((el) => el.id !== id));
    }
  };

  return (
    <div className="flex h-screen">
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

      <div className="bg-white w-full px-12 h-full">
        <h1 className="text-3xl font-bold pt-10 bg-white">{filter.name}</h1>
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
          .map(({ id, url, date, memo }) => (
            <div
              key={id}
              className="p-4 rounded-md mt-4 border max-w-2xl flex justify-between group"
            >
              <div>
                <a
                  href={url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-main underline hover:bg-gray-200"
                >
                  <span className="group-hover:hidden">{memo || url}</span>
                  <span className="hidden group-hover:inline-block">{url}</span>
                </a>
                <div>{date}</div>
              </div>
              <div className="flex">
                <RiEdit2Line
                  className="mr-2 cursor-pointer hidden group-hover:inline-block hover:bg-gray-200 rounded-md"
                  size={25}
                />
                <RiDeleteBinLine
                  className="cursor-pointer hidden group-hover:inline-block hover:bg-gray-200 rounded-md"
                  size={25}
                  onClick={() => deleteSchedule(id)}
                />
              </div>
            </div>
          ))}
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
  );
}
