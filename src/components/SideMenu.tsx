import { FC } from "react";
import { useRecoilState } from "recoil";
import { menus } from "../util";
import { filterState } from "../util/recoil";

export const SideMenu: FC = () => {
  const [filter, setFilter] = useRecoilState(filterState);

  return (
    <div className="hidden px-6 md:px-12 min-w-80 text-left pt-10 md:block">
      {menus.map((menu) => (
        <button
          key={menu.name}
          className={`hover:bg-white cursor-pointer rounded-md pl-6 py-4 mb-4 duration-300 block w-56 text-left ${
            menu.name === filter.name ? "bg-white" : ""
          }`}
          onClick={() => setFilter(menu)}
          aria-label={menu.name}
        >
          {menu.name}
        </button>
      ))}
    </div>
  );
};
