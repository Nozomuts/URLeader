import Dexie from "dexie";
import { IHistory, ISchedule } from "../util/types";

const database = new Dexie("u-reserve"); // データベース名 データベース接続
database.version(1).stores({ schedule: "&id", histories: "&id" }); // データベースのバージョン、テーブル名とインデックスとなるデータ名

export const historiesTable: Dexie.Table<IHistory, string> = database.table(
  "histories"
); // データの型、キーとなるデータの型 テーブル作成

export const scheduleTable: Dexie.Table<ISchedule, string> = database.table(
  "schedule"
); // データの型、キーとなるデータの型 テーブル作成
