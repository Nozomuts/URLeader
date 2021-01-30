import dayjs from "dayjs";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { deleteSchedule, readSchedule } from "../db/schedule";
import { ISchedule } from "./types";

const useTimerNotif = (
  schedule: ISchedule[],
  setSchedule: Dispatch<SetStateAction<ISchedule[]>>
) => {
  const [timer, setTimer] = useState<NodeJS.Timeout[]>([]);

  useEffect(() => {
    if ("Notification" in window) {
      // 通知の許可を求める
      const permission = Notification.permission;
      if (permission === "denied" || permission === "granted") {
        return;
      }
      Notification.requestPermission().then(() => new Notification("テスト"));
    }
    // indexedDBから読み込む
    readSchedule().then(setSchedule);
  }, [setSchedule]);

  useEffect(() => {
    // scheduleが変更されたら初期化
    timer.forEach((el) => clearTimeout(el));
    schedule.forEach(({ url, date, id }) => {
      const datetime = dayjs(date).valueOf();
      const now = dayjs().valueOf();
      const ONE_MIN = 60000;

      // 1分前に通知
      const setTimeBefore = datetime - now - ONE_MIN;
      setTimer((prev) => [
        ...prev,
        setTimeout(() => {
          if ("Notification" in window) {
            const notif = new Notification("間も無く遷移します");
            notif.addEventListener("show", () => {
              new Audio("./push.wav").play();
            });
          }
        }, setTimeBefore),
      ]);

      /** 予定時間と現在時刻の差 */
      const setTime = datetime - now;
      setTimer((prev) => [
        ...prev,
        setTimeout(() => {
          if (window) {
            window.open(url, "_blank");
            deleteSchedule(id);
            setSchedule((prev) => prev.filter((el) => el.id !== id));
          }
        }, setTime),
      ]);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [schedule]);
};

export default useTimerNotif;
