import { useSelector } from "react-redux";
import { AddScheduleForm } from "../components/AddScheduleForm";
// import { GAPI } from "../components/GAPI";
import { Dropdown } from "../components/Dropdown";
import { ScheduleList } from "../components/ScheduleList";
import { SideMenu } from "../components/SideMenu";
import { IStore } from "../redux";
import useIndexPage from "../util/useApp";

export default function Index() {
  const filter = useSelector((state: IStore) => state.filter);
  const schedule = useSelector((state: IStore) => state.schedule);
  useIndexPage();

  const scheduleLength = schedule.filter((schedule) =>
    filter.func ? filter.func(schedule.date) : true
  ).length;

  return (
    <div className="flex">
      <SideMenu />
      <div className="bg-white w-full px-6 md:px-12">
        <div className="items-start py-5 md:py-10 max-w-2xl">
          <div className="title flex mb-4">
            {filter.name}
            <Dropdown />
          </div>
          {filter.description}
          {/* Googleの審査通っていないのでコメントアウト */}
          {/* <GAPI /> */}
        </div>
        <div className="h-content md:h-content-md overflow-y-auto max-w-2xl">
          {filter.name === "履歴" ? (
            <ScheduleList />
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
