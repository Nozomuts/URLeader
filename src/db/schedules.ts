import { ISchedule } from "./../util/types";
import Dexie from "dexie";

const database = new Dexie("u-reserve"); // データベース名 データベース接続
database.version(1).stores({ schedules: "&id" }); // データベースのバージョン、テーブル名とインデックスとなるデータ名
const schedules: Dexie.Table<ISchedule, string> = database.table("schedules"); // データの型、キーとなるデータの型 テーブル作成

/** データを保存 */
export const putSchedule = async (
  url: string,
  id: string,
  memo: string,
  date: string
): Promise<void> => {
  await schedules.put({ id, memo, url, date }); // テーブルに追加
};

/** データを取得 */
export const getSchedules = (): Promise<ISchedule[]> => {
  return schedules.toArray();
};

/** データを削除 */
export const deleteSchedule = (id: string): void => {
  schedules.delete(id);
};
