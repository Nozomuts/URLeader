import { FC, useRef, useState } from "react";
import { RiArrowDownSLine, RiArrowUpSLine } from "react-icons/ri";
import { menus } from "../util";
import useOutsideClick from "../util/useOutsideClick";

export const Dropdown: FC = () => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>();
  const [filter, setFilter] = useRecoilState(filterState);

  useOutsideClick(ref, () => {
    if (open) {
      setOpen(false);
    }
  });

  return (
    <>
      <button
        type="button"
        className="text-gray-500 focus:outline-none md:hidden"
        aria-label="ドロップダウンを開閉"
      >
        {open ? (
          <RiArrowUpSLine onClick={() => setOpen(false)} />
        ) : (
          <RiArrowDownSLine onClick={() => setOpen(true)} />
        )}
      </button>
      <div className="relative text-left" ref={ref as any}>
        {open && (
          <div className="absolute -left-24 top-6 mt-2 shadow-md rounded-md overflow-hidden border z-20 border-gray-200 bg-white">
            {menus.map((menu) => (
              <button
                key={menu.name}
                className={`hover:bg-gray-200 p-4 text-sm duration-300 focus:outline-none w-40 text-left ${
                  menu.name === filter.name ? "text-main" : ""
                }`}
                onClick={() => {
                  setFilter(menu);
                  setOpen(false);
                }}
                aria-label={menu.name}
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
