import dayjs from "dayjs";
import { SetStateAction, Dispatch, FC, useContext } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { Context } from "../redux";
import { operations } from "../redux/operations";
import { ISchedule } from "../util/types";
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
  const { dispatch } = useContext(Context);
  const resetFilter = useResetRecoilState(filterState);

  const submit = ({ date, url, memo }: IForm) => {
    const formatDate = dayjs(date.valueOf())
      .format("YYYY/MM/DD H:mm")
      .toString();
    if (name === "履歴") {
      dispatch(operations.createSchedule({ url, memo, date: formatDate }));
      resetFilter();
      toast("追加しました");
    } else {
      dispatch(
        operations.updateSchedule(schedule.id, { url, memo, date: formatDate })
      );
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
