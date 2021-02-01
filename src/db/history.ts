import Dexie from "dexie";
import { IHistory } from "../util/types";

const database = new Dexie("u-reserve"); // データベース名 データベース接続
database.version(1).stores({ schedule: "&id" }); // データベースのバージョン、テーブル名とインデックスとなるデータ名
const historyTable: Dexie.Table<IHistory, string> = database.table("history"); // データの型、キーとなるデータの型 テーブル作成

/** データを保存 */
export const createHistory = async (
  url: string,
  id: string,
  memo: string,
  date: string
): Promise<void> => {
  await historyTable.put({ id, memo, url, date }); // テーブルに追加
};

/** データを取得 */
export const readhistory = (): Promise<IHistory[]> => {
  return historyTable.toArray();
};

/** データを削除 */
export const deletehistory = (id: string): void => {
  historyTable.delete(id);
};

/** データを変更 */
export const updatehistory = (id: string, history: Partial<IHistory>): void => {
  historyTable.update(id, history);
};
