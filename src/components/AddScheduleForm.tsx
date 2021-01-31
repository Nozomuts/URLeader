import dayjs from "dayjs";
import { useState, SetStateAction, Dispatch, FC } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { createSchedule } from "../db/schedule";
import { ISchedule } from "../util/types";
import { ScheduleForm } from "./ScheduleForm";

type IProps = {
  setSchedule: Dispatch<SetStateAction<ISchedule[]>>;
};

type IForm = {
  url: string;
  date: Date;
  memo: string;
};

export const AddScheduleForm: FC<IProps> = ({ setSchedule }) => {
  const {
    register,
    handleSubmit,
    formState: { isDirty },
  } = useForm<IForm>();
  const [open, setOpen] = useState(false);

  const submit = ({ date, url, memo }: IForm) => {
    const format = dayjs(date.valueOf()).format("YYYY/MM/DD H:mm").toString();
    createSchedule(url, dayjs().toString(), memo, format);
    setSchedule((prev) => [
      ...prev,
      { url, id: dayjs().toString(), memo, date: format },
    ]);
    setOpen(false);
    toast("追加しました");
  };

  return (
    <>
      {!open && (
        <button
          className="add-button"
          onClick={() => setOpen(true)}
          aria-label="予定追加"
        >
          ＋ 予定を追加
        </button>
      )}
      {open && (
        <ScheduleForm
          onSubmit={handleSubmit(submit)}
          register={register}
          open={open}
          setOpen={setOpen}
          isDirty={isDirty}
        />
      )}
    </>
  );
};
