import dayjs from "dayjs";
import { SetStateAction, Dispatch, FC } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { setFilter } from "../redux/filter/actions";
import { filters } from "../redux/filter/reducers";
import { IRecord } from "../redux/records/types";
import { createSchedule, updateSchedule } from "../redux/schedule/actions";
import { ISchedule } from "../redux/schedule/types";
import { Form } from "./Form";

type IProps = {
  setOpen: Dispatch<SetStateAction<boolean>>;
  data: ISchedule | IRecord;
  open: boolean;
  name: string;
};

type IForm = {
  url: string;
  date: Date;
  memo: string;
};

export const EditForm: FC<IProps> = ({ setOpen, data, open, name }) => {
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
      dispatch(updateSchedule(data.id, { url, memo, date: formatDate }));
      toast("変更しました");
    }
    setOpen(false);
  };

  return (
    <Form
      onSubmit={handleSubmit(submit)}
      register={register}
      data={data}
      open={open}
      setOpen={setOpen}
      isDirty={isDirty}
    />
  );
};
