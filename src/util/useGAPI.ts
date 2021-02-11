import dayjs from "dayjs";
import { Dispatch, SetStateAction, useState } from "react";
import { toast } from "react-toastify";
import { ISchedule } from "../redux/schedule/types";

const useGAPI = (
  setOpen: Dispatch<SetStateAction<boolean>>,
  setEvent: Dispatch<SetStateAction<Omit<ISchedule, "id">[]>>
) => {
  const [auth, setAuth] = useState(false);
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

  const fetch = async () => {
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
  const signout = async () => {
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

  return { auth, isFetch, fetch, signout };
};

export default useGAPI;
