import { FC } from "react";
import { useSelector } from "react-redux";
import { IStore } from "../redux";
import { Item } from "./Item";

export const List: FC = () => {
  const filter = useSelector((state: IStore) => state.filter);
  const records = useSelector((state: IStore) => state.records);
  const schedule = useSelector((state: IStore) => state.schedule);

  const list = filter.name === "履歴" ? records : schedule;

  return (
    <>
      {filter.name === "履歴" && records.length === 0 && (
        <h1>履歴がありません</h1>
      )}
      {list
        .filter(({ date }) => (filter.func ? filter.func(date) : true))
        .map((props) => (
          <Item key={props.id} {...props} name={filter.name} />
        ))}
    </>
  );
};
