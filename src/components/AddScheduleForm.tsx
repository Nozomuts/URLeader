import dayjs from "dayjs";
import { useState, SetStateAction, Dispatch, FC, useRef } from "react";
import { useForm } from "react-hook-form";
import { createSchedule } from "../db/schedules";
import { ISchedule } from "../util/types";
import useOutsideClick from "../util/useOutsideClick";

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
}) => {
  const { register, handleSubmit } = useForm<IForm>();
  const ref = useRef<HTMLFormElement>();
  const [open, setOpen] = useState<{
    isOpen: boolean;
    dir?: "up" | "down";
  }>({
    isOpen: false,
  });
  const submit = ({ date, url, memo }: IForm) => {
    const format = dayjs(date.valueOf()).format("YYYY/MM/DD H:mm").toString();
    createSchedule(url, dayjs().toString(), memo, format);
    setSchedules((prev) => [
      ...prev,
      { url, id: dayjs().toString(), memo, date: format },
    ]);
    setOpen({ isOpen: false });
  };
  const display = () => (dir === "down" ? schedulesLength >= 3 : true);
  useOutsideClick(ref, () => {
    if (open.isOpen) {
      setOpen({ isOpen: false });
    }
  });

  return (
    <>
      {!open.isOpen && display() && (
        <button
          className={`add-button ${dir === "down" ? "mb-10" : ""}`}
          onClick={() => setOpen({ isOpen: true, dir })}
        >
          ＋ 予定を追加
        </button>
      )}
      {open.isOpen && open.dir === dir && (
        <form
          className={`flex flex-col mb-4 max-w-2xl ${
            dir === "down" ? "mb-10" : ""
          }`}
          ref={ref as any}
          onSubmit={handleSubmit(submit)}
        >
          <label
            htmlFor="label"
            className="border border-gray-200 rounded-md flex-col flex p-2 focus-within:border-gray-500 mb-2"
          >
            <input
              type="url"
              id="label"
              className="px-2 pt-2  pb-4 focus:outline-none h-10 rounded-md"
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
                min={dayjs().format("YYYY-MM-DDTHH:mm").toString()}
                ref={register({ required: "日付を選択してください" })}
                className="input mr-3 h-10 w-60 cursor-pointer focus:bg-gray-100"
              />
              <input
                type="text"
                name="memo"
                className="input h-10"
                placeholder="メモ"
                ref={register}
              />
            </div>
          </label>
          <div className="flex w-48 justify-between">
            <button className="button text-white bg-black" type="submit">
              追加
            </button>
            <button
              className="button"
              type="button"
              onClick={() => setOpen({ isOpen: false })}
            >
              キャンセル
            </button>
          </div>
        </form>
      )}
    </>
  );
};
