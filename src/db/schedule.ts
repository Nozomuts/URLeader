import { scheduleTable } from "./index";
import { ISchedule } from "../util/types";

/** データを保存 */
export const createSchedule = async (
  url: string,
  id: string,
  memo: string,
  date: string
): Promise<void> => {
  await scheduleTable.put({ id, memo, url, date }); // テーブルに追加
};

/** データを取得 */
export const readSchedule = (): Promise<ISchedule[]> => {
  return scheduleTable.toArray();
};

/** データを変更 */
export const updateSchedule = (
  id: string,
  schedule: Partial<ISchedule>
): void => {
  scheduleTable.update(id, schedule);
};

/** データを削除 */
export const deleteSchedule = (id: string): void => {
  scheduleTable.delete(id);
};
