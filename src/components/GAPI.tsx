import { useState, FC, Dispatch, SetStateAction } from "react";
import { SiGooglecalendar } from "react-icons/si";
import { RiLogoutBoxRLine } from "react-icons/ri";
import dayjs from "dayjs";
import { ISchedule } from "../util/types";
import { createSchedule } from "../db/schedule";
import { Modal } from "./Modal";
import { toast } from "react-toastify";

type IProps = {
  setSchedule: Dispatch<SetStateAction<ISchedule[]>>;
};

export const GAPI: FC<IProps> = ({ setSchedule }) => {
  const [auth, setAuth] = useState(false);
  const [event, setEvent] = useState<Omit<ISchedule, "id">[]>([]);
  const [open, setOpen] = useState(false);
  const [isFetch, setIsFetch] = useState(false);

  /** Googleからデータ取得 */
  const getData = async () => {
    const res = await (window as any).gapi.client.calendar.events.list({
      calendarId: "primary",
      timeMin: new Date().toISOString(),
      showDeleted: false,
      singleEvents: true,
      maxResults: 30,
      orderBy: "startTime",
    });
    const arr: Omit<ISchedule, "id">[] = [];
    const events = res.result.items;
    events.forEach((event: any) => {
      if ("conferenceData" in event || "hangoutLink" in event) {
        arr.push({
          memo: event.summary || "",
          url:
            event.hangoutLink || event.conferenceData.entryPoints[0].uri || "",
          date:
            dayjs(event.start.dateTime).format("YYYY/MM/DD H:mm").toString() ||
            "",
        });
      }
    });
    setEvent(arr);
    setOpen(true);
  };

  const handleFetch = async () => {
    if (!confirm("Googleカレンダーから予定を取得しますか？")) {
      return;
    }
    try {
      setIsFetch(true);
      const gapi = (window as any).gapi;
      await gapi.load("client:auth2", async () => {
        await gapi.client.init({
          apiKey: process.env.API_KEY,
          clientId: process.env.CLIENT_ID,
          discoveryDocs: process.env.DISCOVERY_DOCS,
          scope: process.env.SCOPES,
        });
        const isLogin = await gapi.auth2.getAuthInstance().isSignedIn.get();
        // Loginしてなかったら、ログインを求める
        if (!isLogin) {
          await gapi.auth2.getAuthInstance().signIn();
        }
        setAuth(true);
        getData();
        toast("予定を取得しました");
      });
    } catch {
      toast("エラーが発生しました");
    } finally {
      setIsFetch(false);
    }
  };

  /** サインアウト */
  const handleSignout = async () => {
    if (!confirm("Googleからサインアウトしますか？")) {
      return;
    }
    try {
      await (window as any).gapi.auth2.getAuthInstance().signOut();
      setAuth(false);
      toast("サインアウトしました");
    } catch {
      toast("エラーが発生しました");
    }
  };

  return (
    <div>
      <p className="text-xs font-bold">Googleカレンダー連携</p>
      <button
        className={`button mb-4 ${
          auth ? "" : "opacity-30 hover:opacity-30 cursor-not-allowed"
        }`}
        onClick={handleSignout}
        aria-label="Googleからログアウト"
        disabled={!auth}
      >
        <RiLogoutBoxRLine size="20" className="text-red-500" />
      </button>
      <button
        className={`button mb-4 ${
          isFetch ? "opacity-30 hover:opacity-30 cursor-not-allowed" : ""
        }`}
        onClick={handleFetch}
        aria-label="Googleカレンダーから取得"
        disabled={isFetch}
      >
        <SiGooglecalendar size="20" className="text-blue-500" />
      </button>
      {open && (
        <Modal setOpen={setOpen}>
          {event.length > 0 ? (
            event.map(({ memo, url, date }, i) => (
              <div key={i} className="bg-white rounded-md p-4 my-4">
                <ul>
                  <li>URL： {url}</li>
                  <li>時刻： {date}</li>
                  <li>メモ： {memo}</li>
                </ul>
                <button
                  className="button text-white bg-black mt-4"
                  onClick={() => {
                    const id = dayjs().toString();
                    createSchedule(url, id, memo, date);
                    setSchedule((prev) => [...prev, { url, id, memo, date }]);
                    setEvent((prev) => prev.filter((el) => el.date !== date));
                  }}
                  aria-label="追加"
                >
                  追加
                </button>
              </div>
            ))
          ) : (
            <div className="py-4">URLの設定された予定はありませんでした</div>
          )}
        </Modal>
      )}
    </div>
  );
};
