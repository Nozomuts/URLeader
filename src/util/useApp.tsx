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

  // 定数
  const FIVE_SEC = 5000;
  const FIVE_MIN = 300000;
  const NOW = dayjs().valueOf();

  useEffect(() => {
    // indexedDBから読み込む
    dispatch(readSchedule());
    dispatch(readRecords());

    if ("Notification" in window) {
      const permission = Notification.permission;

      // 通知が許可されていたら早期リターン
      if (permission === "denied" || permission === "granted") {
        return;
      }
      // 通知の許可を求める
      Notification.requestPermission().then(() => new Notification("テスト"));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    // scheduleが変更されたら初期化
    timer.forEach((el) => clearTimeout(el));
    schedule.forEach(({ url, date, id, memo }) => {
      const datetime = dayjs(date).valueOf();
      // 5秒前に通知
      const setTimeBefore = datetime - NOW - FIVE_SEC;
      // 5分以上たっている場合は通知および遷移を行わない
      if (setTimeBefore > -FIVE_MIN) {
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
        const setTime = datetime - NOW;
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
      } else {
        dispatch(deleteSchedule(id));
        dispatch(createRecord({ id, url, memo, date }));
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [schedule, hasSound]);
};

export default useApp;
