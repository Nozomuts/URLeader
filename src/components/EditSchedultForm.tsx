import dayjs from "dayjs";
import React, { SetStateAction, Dispatch, FC, useRef } from "react";
import { useForm } from "react-hook-form";
import { updateSchedule } from "../db/schedules";
import { ISchedule } from "../util/types";
import useOutsideClick from "../util/useOutsideClick";

type IProps = {
  setSchedules: Dispatch<SetStateAction<ISchedule[]>>;
  setEdit: Dispatch<SetStateAction<string>>;
  schedule: ISchedule;
  edit: string;
};

type IForm = {
  url: string;
  date: Date;
  memo: string;
};

export const EditScheduleForm: FC<IProps> = ({
  setSchedules,
  setEdit,
  schedule,
  edit,
}): JSX.Element => {
  const ref = useRef<HTMLFormElement>();
  const { register, handleSubmit } = useForm<IForm>();
  const submit = ({ date, url, memo }: IForm) => {
    const format = dayjs(date.valueOf()).format("YYYY/MM/DD H:mm").toString();
    updateSchedule(schedule.id, { url, memo, date: format });
    setSchedules((prev) => [
      ...prev.map((el) =>
        el.id === schedule.id
          ? { url, id: schedule.id, memo, date: format }
          : el
      ),
    ]);
    setEdit("");
  };
  useOutsideClick(ref, () => {
    if (edit) {
      setEdit("");
    }
  });

  return (
    <form
      className="flex flex-col mb-4 max-w-2xl"
      onSubmit={handleSubmit(submit)}
      ref={ref as any}
    >
      <label
        htmlFor="label"
        className="border border-gray-200 rounded-md flex-col flex p-2 focus-within:border-gray-500 mb-2"
      >
        <input
          type="url"
          id="label"
          className="p-2 focus:outline-none h-10 rounded-md"
          placeholder="URLを入力"
          name="url"
          defaultValue={schedule.url}
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
            defaultValue={dayjs(schedule.date)
              .format("YYYY-MM-DDTHH:mm")
              .toString()}
            className="border border-gray-200 m-2 p-2 focus:outline-none focus:bg-gray-100 focus:border-gray-500 rounded-md h-10 w-60 cursor-pointer"
          />
          <input
            type="text"
            name="memo"
            defaultValue={schedule.memo}
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
          変更
        </button>
        <button
          className={`px-6 py-2 text-xs font-medium leading-6 text-center duration-200 rounded shadow hover:opacity-70 focus:outline-none w-auto`}
          type="button"
          onClick={() => setEdit("")}
        >
          キャンセル
        </button>
      </div>
    </form>
  );
};
