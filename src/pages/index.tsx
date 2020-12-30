import React, { useState } from "react";

import "react-datepicker/dist/react-datepicker.css";

export default function index(): JSX.Element {
  const [filter, setFilter] = useState({
    name: "すべて",
    tag: null,
    date: null,
  });
  const [menu, setMenu] = useState([
    { name: "すべて" },
    { name: "今日" },
    { name: "近日" },
  ]);
  const [schedules, setSchedules] = useState([
    { id: 1, url: "https://github.com/", date: "2020/12/31 23:30" },
  ]);

  schedules.forEach(({ url }) => {
    // const date = new Date();
    // const dateTime = date.getTime();
    // const setTime = new Date().getTime();
    // //読み込み時と出力時の差分のミリ秒を計算します。
    // const tweetTime = setTime - dateTime + 5000;
    // setTimeout(() => {
    //   if (window) window.open(url, "_blank");
    // }, tweetTime);
  });

  return (
    <div className="flex pt-28 h-screen">
      <div className="px-12 mw-80 text-left pt-10 overflow-y-auto">
        {menu.map(({ name }) => (
          <div
            key={name}
            className={`hover:bg-white cursor-pointer rounded-md pl-6 py-4 mb-4 duration-300 ${
              name === filter.name ? "bg-white" : ""
            }`}
          >
            {name}
          </div>
        ))}
        <a className="text-main block pl-4 my-4 cursor-pointer rounded-md py-4 w-full hover:bg-gray-200 duration-300">
          ＋ フィルターを追加
        </a>
      </div>

      <div className="bg-white w-full px-12 overflow-y-auto">
        <h1 className="text-3xl font-bold py-10">{filter.name}</h1>
        <div>
          {schedules.map(({ id, url, date }) => (
            <div
              key={id}
              className="flex justify-between p-4 rounded-md cursor-pointer mb-4 border max-w-2xl"
            >
              <div>{url}</div>
              <div>{date}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
