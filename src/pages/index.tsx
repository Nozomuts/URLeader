import { useState } from "react";
import { AddScheduleForm } from "../components/AddScheduleForm";
import { IFilter, ISchedule } from "../util/types";
import { GAPI } from "../components/GAPI";
import { menus } from "../util";
import { Dropdown } from "../components/Dropdown";
import { ScheduleList } from "../components/ScheduleList";
import { SideMenu } from "../components/SideMenu";
import useTimerNotif from "../util/useTimerNotif";

export default function Index() {
  const [filter, setFilter] = useState<IFilter>(menus[0]);
  const [schedule, setSchedule] = useState<ISchedule[]>([]);
  const { histories, setHistories } = useTimerNotif(schedule, setSchedule);

  /** 条件を満たす予定の数 */
  const scheduleLength = schedule.filter(({ date }) =>
    filter.func ? filter.func(date) : true
  ).length;

  return (
    <div className="flex">
      <SideMenu filter={filter} setFilter={setFilter} />
      <div className="bg-white w-full px-6 md:px-12">
        <div className="flex justify-between items-start py-5 md:py-10 max-w-2xl">
          <div className="title flex">
            {filter.name}
            <Dropdown filter={filter} setFilter={setFilter} />
          </div>
          {/* デスクトップ版は対応できてないのでビルドするときはコメントアウトする */}
          <GAPI setSchedule={setSchedule} />
        </div>
        <div className="h-content md:h-content-md overflow-y-auto max-w-2xl">
          {filter.name === "履歴" ? (
            <ScheduleList
              filter={filter}
              schedule={histories}
              setSchedule={setHistories}
            />
          ) : (
            <>
              <AddScheduleForm setSchedule={setSchedule} />
              <ScheduleList
                filter={filter}
                schedule={schedule}
                setSchedule={setSchedule}
              />
              {scheduleLength > 3 && (
                <AddScheduleForm setSchedule={setSchedule} />
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
