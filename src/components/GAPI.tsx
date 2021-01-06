import { useEffect, useState, FC, Dispatch, SetStateAction } from "react";
import { SiGooglecalendar } from "react-icons/si";
import { RiLogoutBoxRLine } from "react-icons/ri";
import dayjs from "dayjs";
import { ISchedule } from "../util/types";
import { createSchedule } from "../db/schedule";

type IProps = {
  setSchedule: Dispatch<SetStateAction<ISchedule[]>>;
};

export const GAPI: FC<IProps> = ({ setSchedule }) => {
  const [auth, setAuth] = useState(false);
  const [event, setEvent] = useState<ISchedule[]>();

  useEffect(() => {
    const CLIENT_ID =
      "840951746882-ksrhra0q5ikp5mt2se38aifbpmidmi2i.apps.googleusercontent.com";
    const API_KEY = "AIzaSyDyDNlcwP4TRieJ7UUktzq2RB0EuGQ8V1s";
    const DISCOVERY_DOCS = [
      "https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest",
    ];
    const SCOPES = "https://www.googleapis.com/auth/calendar.events";
    const gapi = (window as any).gapi;
    gapi.load("client:auth2", async () => {
      await gapi.client.init({
        apiKey: API_KEY,
        clientId: CLIENT_ID,
        discoveryDocs: DISCOVERY_DOCS,
        scope: SCOPES,
      });
      setAuth(await gapi.auth2.getAuthInstance().isSignedIn.get());
    });
  }, []);

  const handleClick = () => {
    const gapi = (window as any).gapi;
    gapi.load("client:auth2", async () => {
      if (!auth) {
        await gapi.auth2.getAuthInstance().signIn();
        setAuth(true);
      }
      const res = await gapi.client.calendar.events.list({
        calendarId: "primary",
        timeMin: new Date().toISOString(),
        showDeleted: false,
        singleEvents: true,
        maxResults: 10,
        orderBy: "startTime",
      });
      const arr: ISchedule[] = [];
      const events = res.result.items;
      events.forEach((event: any) => {
        if ("conferenceData" in event || "hangoutLink" in event) {
          arr.push({
            id: dayjs().toString(),
            memo: event.summary || "",
            url:
              event.hangoutLink ||
              event.conferenceData.entryPoints[0].uri ||
              "",
            date:
              dayjs(event.start.dateTime)
                .format("YYYY/MM/DD H:mm")
                .toString() || "",
          });
        }
      });
      setEvent(arr);
    });
  };

  function handleSignoutClick() {
    (window as any).gapi.auth2.getAuthInstance().signOut();
  }

  return (
    <div>
      {auth && (
        <button
          className="button mb-4"
          onClick={handleSignoutClick}
          aria-label="logout"
        >
          <RiLogoutBoxRLine size="20" className="text-red-500" />
        </button>
      )}
      <button className="button mb-4" onClick={handleClick} aria-label="auth">
        <SiGooglecalendar size="20" className="text-blue-500" />
      </button>
      {event?.map(({ id, memo, url, date }) => (
        <div key={id}>
          <ul>
            <li>URL： {url}</li>
            <li>時刻： {date}</li>
            <li>メモ： {memo}</li>
          </ul>
          <button
            className="button text-white bg-black"
            onClick={() => {
              createSchedule(url, id, memo, date);
              setSchedule((prev) => [...prev, { url, id, memo, date }]);
            }}
          >
            追加
          </button>
        </div>
      ))}
    </div>
  );
};
