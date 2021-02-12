import dayjs from "dayjs";
import { useState, FC } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { createSchedule } from "../redux/schedule/actions";
import { Form } from "./Form";

type IForm = {
  url: string;
  date: Date;
  memo: string;
};

export const AddForm: FC = () => {
  const {
    register,
    handleSubmit,
    formState: { isDirty },
  } = useForm<IForm>();
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  const submit = ({ date, url, memo }: IForm) => {
    const format = dayjs(date.valueOf()).format("YYYY/MM/DD H:mm").toString();
    dispatch(createSchedule({ url, memo, date: format }));
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
        <Form
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
