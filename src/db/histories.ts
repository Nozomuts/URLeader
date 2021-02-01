import { historiesTable } from "./index";
import { IHistory } from "../util/types";

/** データを保存 */
export const createHistory = async (
  url: string,
  id: string,
  memo: string,
  date: string
): Promise<void> => {
  await historiesTable.put({ id, memo, url, date }); // テーブルに追加
};

/** データを取得 */
export const readHistories = (): Promise<IHistory[]> => {
  return historiesTable.toArray();
};

/** データを変更 */
export const updateHistory = (id: string, history: Partial<IHistory>): void => {
  historiesTable.update(id, history);
};

/** データを削除 */
export const deleteHistory = (id: string): void => {
  historiesTable.delete(id);
};
