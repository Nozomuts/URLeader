import { useRef, useState, Dispatch, SetStateAction, FC } from "react";
import { RiArrowDownSLine, RiArrowUpSLine } from "react-icons/ri";
import { menus } from "../util";
import { IFilter } from "../util/types";
import useOutsideClick from "../util/useOutsideClick";

type IProps = {
  filter: IFilter;
  setFilter: Dispatch<SetStateAction<IFilter>>;
};

export const Dropdown: FC<IProps> = ({ filter, setFilter }) => {
  const [dropdown, setDropdown] = useState(false);
  const ref = useRef<HTMLDivElement>();
  useOutsideClick(ref, () => {
    if (dropdown) {
      setDropdown(false);
    }
  });

  return (
    <>
      <button
        type="button"
        className="text-gray-500 focus:outline-none md:hidden"
        aria-label="trigger"
      >
        {dropdown ? (
          <RiArrowUpSLine onClick={() => setDropdown(false)} />
        ) : (
          <RiArrowDownSLine onClick={() => setDropdown(true)} />
        )}
      </button>
      <div className="relative text-left" ref={ref as any}>
        {dropdown && (
          <div className="absolute -left-24 top-6 mt-2 shadow-md rounded-md overflow-hidden border z-10 border-gray-200 bg-white">
            {menus.map((menu) => (
              <button
                key={menu.name}
                className={`hover:bg-gray-200 p-4 text-sm duration-300 focus:outline-none w-40 text-left ${
                  menu.name === filter.name ? "text-main" : ""
                }`}
                onClick={() => {
                  setFilter(menu);
                  setDropdown(false);
                }}
              >
                {menu.name}
              </button>
            ))}
          </div>
        )}
      </div>
    </>
  );
};
