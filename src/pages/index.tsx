import { AddScheduleForm } from "../components/AddScheduleForm";
// import { GAPI } from "../components/GAPI";
import { Dropdown } from "../components/Dropdown";
import { ScheduleList } from "../components/ScheduleList";
import { SideMenu } from "../components/SideMenu";
import useTimerNotif from "../util/useTimerNotif";
import { useRecoilValue } from "recoil";
import { filterState } from "../util/recoil";
import useSchedule from "../util/useSchedule";

export default function Index() {
  useTimerNotif();
  const { name } = useRecoilValue(filterState);
  const { scheduleLength } = useSchedule();

  return (
    <div className="flex">
      <SideMenu />
      <div className="bg-white w-full px-6 md:px-12">
        <div className="flex justify-between items-start py-5 md:py-10 max-w-2xl">
          <div className="title flex">
            {name}
            <Dropdown />
          </div>
          {/* デスクトップ版は対応できてないのでビルドするときはコメントアウトする */}
          {/* <GAPI /> */}
        </div>
        <div className="h-content md:h-content-md overflow-y-auto max-w-2xl">
          {name === "履歴" ? (
            <div className="pt-4">
              <ScheduleList />
            </div>
          ) : (
            <>
              <AddScheduleForm />
              <ScheduleList />
              {scheduleLength > 3 && <AddScheduleForm />}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
