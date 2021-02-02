import dayjs from "dayjs";
import { useRecoilState } from "recoil";
import { historiesTable } from "../db";
import { historyState } from "./recoil";
import { IHistory } from "./types";

const useHistories = () => {
  const [histories, setHistories] = useRecoilState(historyState);

  const createHistory = (url: string, memo: string, date: string) => {
    const id = dayjs().toString();
    historiesTable.put({ id, memo, url, date });
    setHistories((prev) => [...prev, { id, url, memo, date }]);
  };

  const readHistories = () => {
    historiesTable.toArray().then(setHistories);
  };

  const updateHistory = (id: string, History: Partial<IHistory>) => {
    setHistories((prev) => [
      ...prev.map((el) => (el.id === History.id ? { ...el, ...History } : el)),
    ]);
    historiesTable.update(id, History);
  };

  const deleteHistory = (id: string) => {
    historiesTable.delete(id);
    setHistories((prev) => prev.filter((el) => el.id !== id));
  };

  return {
    histories,
    setHistories,
    createHistory,
    readHistories,
    updateHistory,
    deleteHistory,
  };
};

export default useHistories;
