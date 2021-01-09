import { ISchedule } from "../util/types";
import Dexie from "dexie";

const database = new Dexie("u-reserve"); // データベース名 データベース接続
database.version(1).stores({ schedule: "&id" }); // データベースのバージョン、テーブル名とインデックスとなるデータ名
const scheduleTable: Dexie.Table<ISchedule, string> = database.table(
  "schedule"
); // データの型、キーとなるデータの型 テーブル作成

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

/** データを削除 */
export const deleteSchedule = (id: string): void => {
  scheduleTable.delete(id);
};

/** データを変更 */
export const updateSchedule = (
  id: string,
  schedule: Partial<ISchedule>
): void => {
  scheduleTable.update(id, schedule);
};
