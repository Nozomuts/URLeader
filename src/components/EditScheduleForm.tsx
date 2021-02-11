import dayjs from "dayjs";
import { SetStateAction, Dispatch, FC } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { setFilter } from "../redux/filter/actions";
import { filters } from "../redux/filter/reducers";
import { createSchedule, updateSchedule } from "../redux/schedule/actions";
import { ISchedule } from "../redux/schedule/types";
import { ScheduleForm } from "./ScheduleForm";

type IProps = {
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
  const dispatch = useDispatch();

  const submit = ({ date, url, memo }: IForm) => {
    const formatDate = dayjs(date.valueOf())
      .format("YYYY/MM/DD H:mm")
      .toString();
    if (name === "履歴") {
      dispatch(createSchedule({ url, memo, date: formatDate }));
      dispatch(setFilter(filters[0]));
      toast("追加しました");
    } else {
      dispatch(updateSchedule(schedule.id, { url, memo, date: formatDate }));
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
