import { Dispatch } from "react";
import { SetStateAction } from "react";
import { FC } from "react";
import { IFilter, ISchedule } from "../util/types";
import { ScheduleItem } from "./ScheduleItem";

type IProps = {
  schedule: ISchedule[];
  setSchedule: Dispatch<SetStateAction<ISchedule[]>>;
  filter: IFilter;
};

export const ScheduleList: FC<IProps> = ({ schedule, setSchedule, filter }) => {
  return (
    <>
      {filter.name === "履歴" && schedule.length === 0 && (
        <h1>履歴がありません</h1>
      )}
      {schedule
        .filter(({ date }) => (filter.func ? filter.func(date) : true))
        .map((props) => (
          <ScheduleItem
            key={props.id}
            {...props}
            setSchedule={setSchedule}
            name={filter.name}
          />
        ))}
    </>
  );
};
