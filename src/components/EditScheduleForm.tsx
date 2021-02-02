import dayjs from "dayjs";
import { useRouter } from "next/dist/client/router";
import { SetStateAction, Dispatch, FC } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { ISchedule } from "../util/types";
import { ScheduleForm } from "./ScheduleForm";

type IProps = {
  setSchedule: Dispatch<SetStateAction<ISchedule[]>>;
  setOpen: Dispatch<SetStateAction<boolean>>;
  schedule: ISchedule;
  open: boolean;
  name: string;
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
  name,
}) => {
  const {
    register,
    handleSubmit,
    formState: { isDirty },
  } = useForm<IForm>();

  const { push } = useRouter();

  const submit = ({ date, url, memo }: IForm) => {
    const format = dayjs(date.valueOf()).format("YYYY/MM/DD H:mm").toString();
    if (name === "履歴") {
      createSchedule(schedule.id, url, memo, format);
      toast("追加しました");
      push("/");
    } else {
      setSchedule((prev) => [
        ...prev.map((el) =>
          el.id === schedule.id
            ? { url, id: schedule.id, memo, date: format }
            : el
        ),
      ]);
      updateSchedule(schedule.id, { url, memo, date: format });
      toast("変更しました");
    }
    setOpen(false);
  };

  return (
    <ScheduleForm
      onSubmit={handleSubmit(submit)}
      register={register}
      schedule={schedule}
      open={open}
      setOpen={setOpen}
      isDirty={isDirty}
    />
  );
};
