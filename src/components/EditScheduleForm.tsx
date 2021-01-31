import dayjs from "dayjs";
import { SetStateAction, Dispatch, FC, useRef } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { updateSchedule } from "../db/schedule";
import { confirmClose } from "../util";
import { ISchedule } from "../util/types";
import useOutsideClick from "../util/useOutsideClick";
import { ScheduleForm } from "./ScheduleForm";

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
    <ScheduleForm
      onSubmit={handleSubmit(submit)}
      register={register}
      schedule={schedule}
      open={open}
      setOpen={setOpen}
      isDirty={isDirty}
      ref={ref}
    />
  );
};
