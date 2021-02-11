import { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IStore } from "../redux";
import { setFilter } from "../redux/filter/actions";
import { filters } from "../redux/filter/reducers";

export const SideMenu: FC = () => {
  const { name } = useSelector((state: IStore) => state.filter);
  const dispatch = useDispatch();

  return (
    <div className="hidden px-6 md:px-12 min-w-80 text-left pt-10 md:block">
      {filters.map((menu) => (
        <button
          key={menu.name}
          className={`hover:bg-white cursor-pointer rounded-md pl-6 py-4 mb-4 duration-300 block w-56 text-left ${
            menu.name === name ? "bg-white" : ""
          }`}
          onClick={() => dispatch(setFilter(menu))}
          aria-label={menu.name}
        >
          {menu.name}
        </button>
      ))}
    </div>
  );
};
