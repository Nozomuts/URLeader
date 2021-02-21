import { useDispatch, useSelector } from "react-redux";
import { AddForm } from "../components/AddForm";
// import { GAPI } from "../components/GAPI";
import { Dropdown } from "../components/Dropdown";
import { List } from "../components/List";
import { SideMenu } from "../components/SideMenu";
import { IStore } from "../redux";
import { deleteAllRecord } from "../redux/records/actions";

export default function Index() {
  const dispatch = useDispatch();
  const filter = useSelector((state: IStore) => state.filter);
  const schedule = useSelector((state: IStore) => state.schedule);
  const records = useSelector((state: IStore) => state.records);

  const scheduleLength = schedule.filter((schedule) =>
    filter.func ? filter.func(schedule.date) : true
  ).length;

  return (
    <div className="flex">
      <SideMenu />
      <div className="bg-white w-full px-6 md:px-12 h-screen">
        <div className="items-start pt-5 md:pt-10 max-w-2xl">
          <div className="title flex justify-between items-center mb-4">
            <div className="flex items-center">
              {filter.name}
              <Dropdown />
            </div>
            {filter.name === "履歴" && (
              <button
                className={`button text-white bg-black text-right ${
                  records.length === 0 ? "opacity-70 cursor-not-allowed" : ""
                }`}
                onClick={() => {
                  if (confirm("本当に全ての履歴を削除しますか？")) {
                    dispatch(deleteAllRecord());
                  }
                }}
                disabled={records.length === 0}
              >
                全削除
              </button>
            )}
          </div>
          {filter.description}
          {/* Googleの審査通っていないのでコメントアウト */}
          {/* <GAPI /> */}
        </div>
        <div className="h-content md:h-content-md overflow-y-auto max-w-2xl pt-5 md:pt-10">
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
