import { FC, useContext, useState } from "react";
import { SiGooglecalendar } from "react-icons/si";
import { RiLogoutBoxRLine } from "react-icons/ri";
import { ISchedule } from "../util/types";
import { Modal } from "./Modal";
import useGAPI from "../util/useGAPI";
import { Context } from "../redux";
import { actions } from "../redux/actions";

export const GAPI: FC = () => {
  const [open, setOpen] = useState(false);
  const [event, setEvent] = useState<Omit<ISchedule, "id">[]>([]);
  const { auth, isFetch, signout, fetch } = useGAPI(setOpen, setEvent);
  const { dispatch } = useContext(Context);

  return (
    <div>
      <button
        className={`button ${
          auth ? "" : "opacity-30 hover:opacity-30 cursor-not-allowed"
        }`}
        onClick={signout}
        aria-label="Googleからログアウト"
        disabled={!auth}
      >
        <RiLogoutBoxRLine size="20" className="text-red-500" />
      </button>
      <button
        className={`button ${
          isFetch ? "opacity-30 hover:opacity-30 cursor-not-allowed" : ""
        }`}
        onClick={fetch}
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
                    dispatch(actions.createSchedule({ url, memo, date }));
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
