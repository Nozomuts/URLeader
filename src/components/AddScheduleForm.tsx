import dayjs from "dayjs";
import { useState, SetStateAction, Dispatch, FC, useRef } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { createSchedule } from "../db/schedule";
import { confirmClose } from "../util";
import { ISchedule } from "../util/types";
import useOutsideClick from "../util/useOutsideClick";
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
  const ref = useRef<HTMLFormElement>();
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

  useOutsideClick(ref, () => {
    confirmClose(open, isDirty, setOpen);
  });

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
          ref={ref}
        />
      )}
    </>
  );
};
