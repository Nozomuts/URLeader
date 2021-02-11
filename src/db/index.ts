import Dexie from "dexie";
import { IRecord, ISchedule } from "../util/types";

const database = new Dexie("u-reserve"); // データベース名 データベース接続
database.version(1).stores({ schedule: "&id", records: "&id" }); // データベースのバージョン、テーブル名とインデックスとなるデータ名

export const recordsTable: Dexie.Table<IRecord, string> = database.table(
  "records"
); // データの型、キーとなるデータの型 テーブル作成

export const scheduleTable: Dexie.Table<ISchedule, string> = database.table(
  "schedule"
); // データの型、キーとなるデータの型 テーブル作成
