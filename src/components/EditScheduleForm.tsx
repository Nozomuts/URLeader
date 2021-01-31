import dayjs from "dayjs";
import { SetStateAction, Dispatch, FC, useRef } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { updateSchedule } from "../db/schedule";
import { confirmClose, urlValidate } from "../util";
import { ISchedule } from "../util/types";
import useOutsideClick from "../util/useOutsideClick";

type IProps = {
  setSchedule: Dispatch<SetStateAction<ISchedule[]>>;
  setOpen: Dispatch<SetStateAction<boolean>>;
  schedule: ISchedule;
  open: boolean;
};

type IForm = {
  url: string;
  date: Date;
  memo: string;
};

export const EditScheduleForm: FC<IProps> = ({
  setSchedule,
  setOpen,
  schedule,
  open,
}) => {
  const ref = useRef<HTMLFormElement>();
  const {
    register,
    handleSubmit,
    formState: { isDirty },
  } = useForm<IForm>();

  const submit = ({ date, url, memo }: IForm) => {
    const format = dayjs(date.valueOf()).format("YYYY/MM/DD H:mm").toString();
    updateSchedule(schedule.id, { url, memo, date: format });
    setSchedule((prev) => [
      ...prev.map((el) =>
        el.id === schedule.id
          ? { url, id: schedule.id, memo, date: format }
          : el
      ),
    ]);
    setOpen(false);
    toast("変更しました");
  };

  useOutsideClick(ref, () => {
    confirmClose(open, isDirty, setOpen);
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
          className="px-2  focus:outline-none h-10 rounded-md"
          placeholder="URLを入力"
          name="url"
          defaultValue={schedule.url}
          ref={register(urlValidate)}
          aria-label="URL"
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
            className="input mb-2 sm:mb-0 mr-2 h-10 w-52 cursor-pointer bg-white focus:bg-gray-100"
            aria-label="日付"
          />
          <input
            type="text"
            name="memo"
            defaultValue={schedule.memo}
            className="input h-10 w-52 md:w-64"
            placeholder="メモ"
            ref={register}
            aria-label="メモ"
          />
        </div>
      </label>
      <div className="flex w-48 justify-between">
        <button
          className="button text-white bg-black"
          type="submit"
          aria-label="変更"
        >
          変更
        </button>
        <button
          className="button"
          type="button"
          onClick={() => {
            confirmClose(open, isDirty, setOpen);
          }}
          aria-label="キャンセル"
        >
          キャンセル
        </button>
      </div>
    </form>
  );
};
