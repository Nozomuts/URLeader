import dayjs from "dayjs";
import { useRecoilValue } from "recoil";
import { useRecoilState } from "recoil";
import { scheduleTable } from "../db";
import { filterState, scheduleState } from "./recoil";
import { ISchedule } from "./types";

const useSchedule = () => {
  const [schedule, setSchedule] = useRecoilState(scheduleState);
  const { func } = useRecoilValue(filterState);
  const scheduleLength = schedule.filter(({ date }) =>
    func ? func(date) : true
  ).length;

  const createSchedule = (url: string, memo: string, date: string) => {
    const id = dayjs().toString();
    scheduleTable.put({ id, memo, url, date });
    setSchedule((prev) => [...prev, { id, url, memo, date }]);
  };

  const readSchedule = () => {
    scheduleTable.toArray().then(setSchedule);
  };

  const updateSchedule = (id: string, schedule: Partial<ISchedule>) => {
    setSchedule((prev) => [
      ...prev.map((el) =>
        el.id === schedule.id ? { ...el, ...schedule } : el
      ),
    ]);
    scheduleTable.update(id, schedule);
  };

  const deleteSchedule = (id: string) => {
    scheduleTable.delete(id);
    setSchedule((prev) => prev.filter((el) => el.id !== id));
  };

  return {
    schedule,
    setSchedule,
    createSchedule,
    readSchedule,
    updateSchedule,
    deleteSchedule,
    scheduleLength,
  };
};

export default useSchedule;
