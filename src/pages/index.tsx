import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { AddScheduleForm } from "../components/AddScheduleForm";
import { readSchedule, deleteSchedule } from "../db/schedule";
import { IFilter, ISchedule } from "../util/types";
import { GAPI } from "../components/GAPI";
import { menus } from "../util";
import { Dropdown } from "../components/Dropdown";
import { ScheduleList } from "../components/ScheduleList";

export default function index() {
  const [filter, setFilter] = useState<IFilter>(menus[0]);
  const [schedule, setSchedule] = useState<ISchedule[]>([]);
  const [timer, setTimer] = useState<NodeJS.Timeout[]>([]);

  useEffect(() => {
    // indexedDBから読み込む
    readSchedule().then(setSchedule);
  }, []);

  useEffect(() => {
    // scheduleが変更されたら初期化
    timer.forEach((el) => clearTimeout(el));
    schedule.forEach(({ url, date, id }) => {
      const datetime = dayjs(date).valueOf();
      const now = dayjs().valueOf();
      const ONE_MIN = 60000;

      // 1分前に通知
      const setTimeBefore = datetime - now - ONE_MIN;
      setTimer((prev) => [
        ...prev,
        setTimeout(() => {
          if ("Notification" in window) {
            new Notification("間も無く遷移します");
          }
        }, setTimeBefore),
      ]);

      /** 予定時間と現在時刻の差 */
      const setTime = datetime - now;
      setTimer((prev) => [
        ...prev,
        setTimeout(() => {
          if (window) {
            window.open(url, "_blank");
            deleteSchedule(id);
            setSchedule((prev) => prev.filter((el) => el.id !== id));
          }
        }, setTime),
      ]);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [schedule]);

  /** 条件を満たす予定の数 */
  const scheduleLength = schedule.filter(({ date }) =>
    filter.func ? filter.func(date) : true
  ).length;

  return (
    <div className="flex">
      <div className="hidden px-6 md:px-12 min-w-80 text-left pt-10 md:block">
        {menus.map((menu) => (
          <button
            key={menu.name}
            className={`hover:bg-white cursor-pointer rounded-md pl-6 py-4 mb-4 duration-300 block w-56 text-left ${
              menu.name === filter.name ? "bg-white" : ""
            }`}
            onClick={() => setFilter(menu)}
            aria-label={menu.name}
          >
            {menu.name}
          </button>
        ))}
      </div>
      <div className="bg-white w-full px-6 md:px-12">
        <div className="flex justify-between items-start pt-10 max-w-2xl">
          <div className="title flex">
            {filter.name}
            <Dropdown filter={filter} setFilter={setFilter} />
          </div>
          {/* デスクトップ版は対応できてないのでビルドするときはコメントアウトする */}
          <GAPI setSchedule={setSchedule} />
        </div>
        <div className="h-content overflow-y-auto max-w-2xl">
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
