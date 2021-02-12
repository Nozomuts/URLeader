import { useSelector } from "react-redux";
import { AddForm } from "../components/AddForm";
// import { GAPI } from "../components/GAPI";
import { Dropdown } from "../components/Dropdown";
import { List } from "../components/List";
import { SideMenu } from "../components/SideMenu";
import { IStore } from "../redux";

export default function Index() {
  const filter = useSelector((state: IStore) => state.filter);
  const schedule = useSelector((state: IStore) => state.schedule);

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
            <List />
          ) : (
            <>
              <AddForm />
              <List />
              {scheduleLength > 3 && <AddForm />}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
