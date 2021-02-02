import dayjs from "dayjs";
import { useState, FC } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import useSchedule from "../util/useSchedule";
import { ScheduleForm } from "./ScheduleForm";

type IForm = {
  url: string;
  date: Date;
  memo: string;
};

export const AddScheduleForm: FC = () => {
  const {
    register,
    handleSubmit,
    formState: { isDirty },
  } = useForm<IForm>();
  const [open, setOpen] = useState(false);
  const { createSchedule } = useSchedule();

  const submit = ({ date, url, memo }: IForm) => {
    const format = dayjs(date.valueOf()).format("YYYY/MM/DD H:mm").toString();
    createSchedule(url, memo, format);
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
