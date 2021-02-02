import { FC } from "react";
import { useRecoilValue } from "recoil";
import { filterState } from "../util/recoil";
import useSchedule from "../util/useSchedule";
import { ScheduleItem } from "./ScheduleItem";

export const ScheduleList: FC = () => {
  const filter = useRecoilValue(filterState);
  const { schedule } = useSchedule();
  return (
    <>
      {filter.name === "履歴" && schedule.length === 0 && (
        <h1>履歴がありません</h1>
      )}
      {schedule
        .filter(({ date }) => (filter.func ? filter.func(date) : true))
        .map((props) => (
          <ScheduleItem key={props.id} {...props} name={filter.name} />
        ))}
    </>
  );
};
