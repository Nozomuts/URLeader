import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { AddScheduleForm } from "../components/AddScheduleForm";
import { readSchedule, deleteSchedule } from "../db/schedule";
import { IFilter, ISchedule } from "../util/types";
import { GoogleAuthButton } from "../components/GoogleAuthButton";
import { menus } from "../util";
import { Dropdown } from "../components/Dropdown";
import { ScheduleList } from "../components/ScheduleList";

export default function index() {
  const [filter, setFilter] = useState<IFilter>(menus[0]);
  const [schedule, setSchedule] = useState<ISchedule[]>([]);

  useEffect(() => {
    readSchedule().then(setSchedule);
  }, []);

  useEffect(() => {
    schedule.forEach(({ url, date, id }) => {
      const datetime = dayjs(date).valueOf();
      const now = dayjs().valueOf();
      // 1分前に通知
      const setTimeBefore = datetime - now - 60000;
      setTimeout(() => {
        if ("Notification" in window) {
          new Notification("間も無く遷移します");
        }
      }, setTimeBefore);
      // 読み込み時と出力時の差分のミリ秒を計算。
      const setTime = datetime - now;
      setTimeout(() => {
        if (window) {
          window.open(url, "_blank");
          deleteSchedule(id);
          setSchedule((prev) => prev.filter((el) => el.id !== id));
        }
      }, setTime);
    });
  }, [schedule]);

  const scheduleLength = schedule.filter(({ date }) =>
    filter.func ? filter.func(date) : true
  ).length;

  return (
    <div className="flex">
      <div className="hidden px-12 mw-80 text-left pt-10 md:block">
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
      </div>
      <div className="bg-white w-full px-12">
        <div className="flex justify-between pt-10">
          <h1 className="title flex">{filter.name}</h1>
          <Dropdown filter={filter} setFilter={setFilter} />
          <GoogleAuthButton />
        </div>
        <div className="h-content overflow-y-auto">
          <AddScheduleForm
            setSchedule={setSchedule}
            dir="up"
            scheduleLength={scheduleLength}
          />
          <ScheduleList
            filter={filter}
            schedule={schedule}
            setSchedule={setSchedule}
          />
          <AddScheduleForm
            setSchedule={setSchedule}
            dir="down"
            scheduleLength={scheduleLength}
          />
        </div>
      </div>
    </div>
  );
}
