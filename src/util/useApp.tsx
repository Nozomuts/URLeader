import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IStore } from "../redux";
import { createRecord, readRecords } from "../redux/records/actions";
import { deleteSchedule, readSchedule } from "../redux/schedule/actions";

const useApp = (hasSound?: string) => {
  const [timer, setTimer] = useState<NodeJS.Timeout[]>([]);
  const dispatch = useDispatch();
  const schedule = useSelector((state: IStore) => state.schedule);

  useEffect(() => {
    // indexedDBから読み込む
    dispatch(readSchedule());
    dispatch(readRecords());
    if ("Notification" in window) {
      // 通知の許可を求める
      const permission = Notification.permission;
      if (permission === "denied" || permission === "granted") {
        return;
      }
      Notification.requestPermission().then(() => new Notification("テスト"));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    // scheduleが変更されたら初期化
    timer.forEach((el) => clearTimeout(el));
    const now = dayjs().valueOf();
    const FIVE_MIN = 5000;
    schedule.forEach(({ url, date, id, memo }) => {
      const datetime = dayjs(date).valueOf();
      // 5秒前に通知
      const setTimeBefore = datetime - now - FIVE_MIN;
      setTimer((prev) => [
        ...prev,
        setTimeout(() => {
          if ("Notification" in window) {
            const notif = new Notification("間も無く遷移します");
            if (hasSound === "on") {
              notif.addEventListener("show", () => {
                new Audio("./push.wav").play();
              });
            }
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
            dispatch(deleteSchedule(id));
            dispatch(createRecord({ id, url, memo, date }));
          }
        }, setTime),
      ]);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [schedule, hasSound]);
};

export default useApp;
