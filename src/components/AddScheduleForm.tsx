import dayjs from "dayjs";
import React, { useState, SetStateAction, Dispatch, FC } from "react";
import { useForm } from "react-hook-form";
import { putSchedule } from "../db/schedules";
import { ISchedule } from "../util/types";

type IProps = {
  dir: "up" | "down";
  schedulesLength: number;
  setSchedules: Dispatch<SetStateAction<ISchedule[]>>;
};

type IForm = {
  url: string;
  date: Date;
  memo: string;
};

export const AddScheduleForm: FC<IProps> = ({
  dir,
  schedulesLength,
  setSchedules,
}): JSX.Element => {
  const { register, handleSubmit } = useForm<IForm>();
  const [open, setOpen] = useState<{
    isOpen: boolean;
    dir?: "up" | "down";
  }>({
    isOpen: false,
  });
  const submit = ({ date, url, memo }: IForm) => {
    const format = dayjs(date.valueOf()).format("YYYY/MM/DD H:mm").toString();
    putSchedule(url, dayjs().toString(), memo, format);
    setSchedules((prev) => [
      ...prev,
      { url, id: dayjs().toString(), memo, date: format },
    ]);
    setOpen({ isOpen: false });
  };
  const display = () => (dir === "down" ? schedulesLength >= 3 : true);

  return (
    <div>
      {!open.isOpen && display() && (
        <button
          className="text-main block pl-4 mt-4 cursor-pointer rounded-md py-4 w-full max-w-2xl hover:bg-gray-200 duration-300 focus:outline-none text-left"
          onClick={() => setOpen({ isOpen: true, dir })}
        >
          ＋ 予定を追加
        </button>
      )}
      {open.isOpen && open.dir === dir && (
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
  );
};
