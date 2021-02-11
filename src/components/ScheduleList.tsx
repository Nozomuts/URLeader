import { FC, useContext } from "react";
import { Context } from "../redux";
import { ScheduleItem } from "./ScheduleItem";

export const ScheduleList: FC = () => {
  const filter = useRecoilValue(filterState);
  const {
    state: { schedule, records },
  } = useContext(Context);

  const list = filter.name === "履歴" ? records : schedule;

  return (
    <>
      {filter.name === "履歴" && records.length === 0 && (
        <h1>履歴がありません</h1>
      )}
      {list
        .filter(({ date }) => (filter.func ? filter.func(date) : true))
        .map((props) => (
          <ScheduleItem key={props.id} {...props} name={filter.name} />
        ))}
    </>
  );
};
