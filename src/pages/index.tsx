import dayjs from "dayjs";
import { useEffect, useRef, useState } from "react";
import { AddScheduleForm } from "../components/AddScheduleForm";
import { readSchedules, deleteSchedule } from "../db/schedules";
import { IFilter, ISchedule } from "../util/types";
import {
  RiArrowDownSLine,
  RiArrowUpSLine,
  RiDeleteBinLine,
  RiEdit2Line,
} from "react-icons/ri";
import { EditScheduleForm } from "../components/EditScheduleForm";
import useOutsideClick from "../util/useOutsideClick";
import { GoogleAuthButton } from "../components/GoogleAuthButton";
import { menus } from "../util";

export default function index() {
  const [filter, setFilter] = useState<IFilter>(menus[0]);
  const [schedules, setSchedules] = useState<ISchedule[]>([]);
  const [edit, setEdit] = useState("");
  const [dropdown, setDropdown] = useState(false);

  useEffect(() => {
    readSchedules().then(setSchedules);
  }, []);

  useEffect(() => {
    schedules.forEach(({ url, date, id }) => {
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
          setSchedules((prev) => prev.filter((el) => el.id !== id));
        }
      }, setTime);
    });
  }, [schedules]);

  const removeSchedule = (id: string) => {
    if (confirm("本当に削除しますか？")) {
      deleteSchedule(id);
      setSchedules((prev) => prev.filter((el) => el.id !== id));
    }
  };

  const ref = useRef<HTMLDivElement>();

  useOutsideClick(ref, () => {
    if (dropdown) {
      setDropdown(false);
    }
  });

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
          <h1 className="title flex">
            {filter.name}
            <button
              type="button"
              className="text-gray-500 focus:outline-none md:hidden"
              aria-label="trigger"
            >
              {dropdown ? (
                <RiArrowUpSLine onClick={() => setDropdown(false)} />
              ) : (
                <RiArrowDownSLine onClick={() => setDropdown(true)} />
              )}
            </button>
            <div className="relative text-left" ref={ref as any}>
              {dropdown && (
                <div className="absolute -left-6 top-6 mt-2 shadow-md rounded-md overflow-hidden border border-gray-200 bg-white">
                  {menus.map((menu) => (
                    <button
                      key={menu.name}
                      className={`hover:bg-gray-200 p-4 text-sm duration-300 focus:outline-none w-40 text-left ${
                        menu.name === filter.name ? "text-main" : ""
                      }`}
                      onClick={() => {
                        setFilter(menu);
                        setDropdown(false);
                      }}
                    >
                      {menu.name}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </h1>
          <GoogleAuthButton />
        </div>

        <div className="h-content overflow-y-auto">
          <AddScheduleForm
            setSchedules={setSchedules}
            dir="up"
            schedulesLength={
              schedules.filter(({ date }) =>
                filter.func ? filter.func(date) : true
              ).length
            }
          />
          {schedules
            .filter(({ date }) => (filter.func ? filter.func(date) : true))
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
          <AddScheduleForm
            setSchedules={setSchedules}
            dir="down"
            schedulesLength={
              schedules.filter(({ date }) =>
                filter.func ? filter.func(date) : true
              ).length
            }
          />
        </div>
      </div>
    </div>
  );
}
