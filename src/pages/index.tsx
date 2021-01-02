import React, { useEffect, useState } from "react";
import { AddScheduleForm } from "../components/AddScheduleForm";
import { getSchedules } from "../db/schedules";
import { ISchedule } from "../util/types";

export default function index(): JSX.Element {
  const [filter, setFilter] = useState({
    name: "すべて",
  });
  const [menu] = useState([
    { name: "すべて" },
    { name: "今日" },
    { name: "近日" },
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

  return (
    <div className="flex pt-28 h-screen">
      <div className="px-12 mw-80 text-left pt-10 overflow-y-auto">
        {menu.map(({ name }) => (
          <button
            key={name}
            className={`hover:bg-white cursor-pointer rounded-md pl-6 py-4 mb-4 duration-300 focus:outline-none block w-56 text-left ${
              name === filter.name ? "bg-white" : ""
            }`}
            onClick={() => setFilter({ name })}
          >
            {name}
          </button>
        ))}
        <button className="text-main block pl-4 my-4 cursor-pointer rounded-md py-4 w-full hover:bg-gray-200 duration-300 focus:outline-none text-left">
          ＋ フィルターを追加
        </button>
      </div>

      <div className="bg-white w-full px-12 overflow-y-auto">
        <h1 className="text-3xl font-bold pt-10">{filter.name}</h1>
        <AddScheduleForm dir="up" schedulesLength={schedules.length} />
        <div>
          {schedules.map(({ id, url, date, memo }) => (
            <div key={id} className="p-4 rounded-md mt-4 border max-w-2xl">
              <a
                href={url}
                target="_blank"
                rel="noreferrer"
                className="text-main underline hover:bg-gray-200 group"
              >
                <span className="group-hover:hidden">{memo || url}</span>
                <span className="hidden group-hover:inline-block">{url}</span>
              </a>
              <div>{date}</div>
            </div>
          ))}
        </div>
        <AddScheduleForm dir="down" schedulesLength={schedules.length} />
      </div>
    </div>
  );
}
