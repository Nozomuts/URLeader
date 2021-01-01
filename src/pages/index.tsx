import dayjs from "dayjs";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

type IForm = {
  url: string;
  date: Date;
  memo: string;
};

export default function index(): JSX.Element {
  const [filter, setFilter] = useState({
    name: "すべて",
  });
  const { register, handleSubmit } = useForm<IForm>();
  const [menu, setMenu] = useState([
    { name: "すべて" },
    { name: "今日" },
    { name: "近日" },
  ]);
  const [schedules, setSchedules] = useState<
    {
      id: string;
      url: string;
      date: string;
      memo: string;
    }[]
  >([
    {
      id: "https://github.com/2020/12/31 23:30",
      url: "https://github.com/",
      date: dayjs().add(1, "minute").format("YYYY/MM/DD H:mm").toString(),
      memo: "面接",
    },
  ]);
  const [open, setOpen] = useState<{
    isOpen: boolean;
    dir?: "up" | "down";
  }>({
    isOpen: false,
  });

  // schedules.forEach(({ url, date }) => {
  //   const dateTime = dayjs(date).get("second");
  //   const setTime = dayjs().get("second");
  //   //読み込み時と出力時の差分のミリ秒を計算します。
  //   const tweetTime = setTime - dateTime + 1000;
  //   setTimeout(() => {
  //     if (process.browser) {
  //       window.open(url, "_blank");
  //     }
  //   }, tweetTime);
  // });

  const submit = ({ date, url, memo }: IForm) => {
    const format = dayjs(date.valueOf()).format("YYYY/MM/DD H:mm").toString();

    setSchedules((prev) => [
      ...prev,
      { id: url + format, url, date: format, memo },
    ]);
    setOpen({ isOpen: false });
  };

  return (
    <div className="flex pt-28 h-screen">
      <div className="px-12 mw-80 text-left pt-10 overflow-y-auto">
        {menu.map(({ name }) => (
          <button
            key={name}
            className={`hover:bg-white cursor-pointer rounded-md pl-6 py-4 mb-4 duration-300 focus:outline-none block w-56 text-left ${
              name === filter.name ? "bg-white" : ""
            }`}
            onClick={() => setFilter({ name })}
          >
            {name}
          </button>
        ))}
        <button className="text-main block pl-4 my-4 cursor-pointer rounded-md py-4 w-full hover:bg-gray-200 duration-300 focus:outline-none text-left">
          ＋ フィルターを追加
        </button>
      </div>

      <div className="bg-white w-full px-12 overflow-y-auto">
        <h1 className="text-3xl font-bold pt-10">{filter.name}</h1>
        {!open.isOpen && (
          <button
            className="text-main block pl-4 mt-4 cursor-pointer rounded-md py-4 w-full max-w-2xl hover:bg-gray-200 duration-300 focus:outline-none text-left"
            onClick={() => setOpen({ isOpen: true, dir: "up" })}
          >
            ＋ 予定を追加
          </button>
        )}
        {open.isOpen && open.dir === "up" && (
          <form
            className="flex flex-col mt-4 mb-10 max-w-2xl"
            onSubmit={handleSubmit(submit)}
          >
            <label
              htmlFor="label"
              className="border border-gray-200 rounded-md flex-col flex p-2 focus-within:border-gray-500 mb-2"
            >
              <input
                type="text"
                id="label"
                className="p-2 focus:outline-none h-10 rounded-md"
                placeholder="URLを入力"
                name="url"
                ref={register({
                  required: "入力してください",
                  pattern: {
                    // eslint-disable-next-line no-useless-escape
                    value: /https?:\/\/[\w!\?/\+\-_~=;\.,\*&@#\$%\(\)'\[\]]+/,
                    message: "無効なURLです",
                  },
                })}
              />
              <div>
                <input
                  type="datetime-local"
                  name="date"
                  ref={register({ required: "日付を選択してください" })}
                  className="border border-gray-200 m-2 p-2 focus:outline-none focus:bg-gray-100 focus:border-gray-500 rounded-md h-10 w-60 cursor-pointer"
                />
                <input
                  type="text"
                  name="memo"
                  className="border border-gray-200 p-2 focus:outline-none focus:border-gray-500 rounded-md h-10 mr-3"
                  placeholder="メモ"
                  ref={register}
                />
              </div>
            </label>
            <div className="flex w-48 justify-between">
              <button
                className={`px-6 py-2 text-xs font-medium leading-6 text-center text-white duration-200 bg-black rounded shadow hover:opacity-70 focus:outline-none w-auto`}
                type="submit"
              >
                追加
              </button>
              <button
                className={`px-6 py-2 text-xs font-medium leading-6 text-center duration-200 rounded shadow hover:opacity-70 focus:outline-none w-auto`}
                type="button"
                onClick={() => setOpen({ isOpen: false })}
              >
                キャンセル
              </button>
            </div>
          </form>
        )}
        <div>
          {schedules.map(({ id, url, date, memo }) => (
            <div key={id} className="p-4 rounded-md mt-4 border max-w-2xl">
              <a
                href={url}
                target="_blank"
                rel="noreferrer"
                className="text-main underline hover:bg-gray-200 group"
              >
                <span className="group-hover:hidden">{memo || url}</span>
                <span className="hidden group-hover:inline-block">{url}</span>
              </a>
              <div>{date}</div>
            </div>
          ))}
        </div>
        {!open.isOpen && schedules.length >= 3 && (
          <button
            className="text-main block pl-4 mt-4 cursor-pointer rounded-md py-4 w-full max-w-2xl hover:bg-gray-200 duration-300 focus:outline-none text-left"
            onClick={() => setOpen({ isOpen: true, dir: "down" })}
          >
            ＋ 予定を追加
          </button>
        )}
        {open.isOpen && open.dir === "down" && (
          <form
            className="flex flex-col mt-4 max-w-2xl"
            onSubmit={handleSubmit(submit)}
          >
            <label
              htmlFor="label"
              className="border border-gray-200 rounded-md flex-col flex p-2 focus-within:border-gray-500 mb-2"
            >
              <input
                type="text"
                id="label"
                className="p-2 focus:outline-none h-10 rounded-md"
                placeholder="URLを入力"
                name="url"
                ref={register({
                  required: "入力してください",
                  pattern: {
                    // eslint-disable-next-line no-useless-escape
                    value: /https?:\/\/[\w!\?/\+\-_~=;\.,\*&@#\$%\(\)'\[\]]+/,
                    message: "無効なURLです",
                  },
                })}
              />
              <div>
                <input
                  type="datetime-local"
                  name="date"
                  ref={register({ required: "日付を選択してください" })}
                  className="border border-gray-200 m-2 p-2 focus:outline-none focus:bg-gray-100 focus:border-gray-500 rounded-md h-10 w-60 cursor-pointer"
                />
                <input
                  type="text"
                  name="memo"
                  className="border border-gray-200 p-2 focus:outline-none focus:border-gray-500 rounded-md h-10 mr-3"
                  placeholder="メモ"
                  ref={register}
                />
              </div>
            </label>
            <div className="flex w-48 justify-between">
              <button
                className={`px-6 py-2 text-xs font-medium leading-6 text-center text-white duration-200 bg-black rounded shadow hover:opacity-70 focus:outline-none w-auto`}
                type="submit"
              >
                追加
              </button>
              <button
                className={`px-6 py-2 text-xs font-medium leading-6 text-center duration-200 rounded shadow hover:opacity-70 focus:outline-none w-auto`}
                type="button"
                onClick={() => setOpen({ isOpen: false })}
              >
                キャンセル
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
