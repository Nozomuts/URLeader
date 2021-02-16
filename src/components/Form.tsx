import dayjs from "dayjs";
import { Dispatch, FC, FormEvent, RefObject, SetStateAction } from "react";
import { IRecord } from "../redux/records/types";
import { ISchedule } from "../redux/schedule/types";
import { confirmClose, urlValidate } from "../util";
import useOutsideClick from "../hooks/useOutsideClick";

type IProps = {
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  isDirty: boolean;
  data?: ISchedule | IRecord;
  register: any;
};

export const Form: FC<IProps> = ({
  onSubmit,
  open,
  setOpen,
  isDirty,
  data,
  register,
}) => {
  const ref = useOutsideClick(() => {
    confirmClose(open, isDirty, setOpen);
  });

  return (
    <form
      className="flex flex-col mb-4 max-w-2xl"
      onSubmit={onSubmit}
      ref={ref as RefObject<HTMLFormElement>}
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
          defaultValue={data ? data.url : "https://"}
          ref={register(urlValidate)}
          aria-label="URL"
        />
        <div>
          <input
            type="datetime-local"
            name="date"
            min={dayjs().format("YYYY-MM-DDTHH:mm").toString()}
            ref={register({ required: "日付を選択してください" })}
            defaultValue={
              data
                ? dayjs(data.date).format("YYYY-MM-DDTHH:mm").toString()
                : dayjs().add(1, "h").format("YYYY-MM-DDTHH:mm").toString()
            }
            className="input mb-2 sm:mb-0 mr-2 h-10 w-52 cursor-pointer bg-white focus:bg-gray-100"
            aria-label="日付"
          />
          <input
            type="text"
            name="memo"
            defaultValue={data?.memo}
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
          aria-label="保存"
        >
          保存
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
