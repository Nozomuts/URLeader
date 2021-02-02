import { FC } from "react";
import { useRecoilValue } from "recoil";
import { filterState } from "../util/recoil";
import useHistories from "../util/useHistories";
import useSchedule from "../util/useSchedule";
import { ScheduleItem } from "./ScheduleItem";

export const ScheduleList: FC = () => {
  const filter = useRecoilValue(filterState);
  const { histories } = useHistories();
  const { schedule } = useSchedule();
  const list = filter.name === "履歴" ? histories : schedule;

  return (
    <>
      {filter.name === "履歴" && histories.length === 0 && (
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
