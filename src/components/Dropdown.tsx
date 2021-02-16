import { FC, RefObject, useState } from "react";
import { RiArrowDownSLine, RiArrowUpSLine } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { filters } from "../redux/filter/reducers";
import { setFilter } from "../redux/filter/actions";
import useOutsideClick from "../hooks/useOutsideClick";
import { IStore } from "../redux";

export const Dropdown: FC = () => {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const { name } = useSelector((state: IStore) => state.filter);

  const ref = useOutsideClick(() => {
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
        onClick={() => setOpen((prev) => !prev)}
      >
        {open ? <RiArrowUpSLine /> : <RiArrowDownSLine />}
      </button>
      <div
        className="relative text-left"
        ref={ref as RefObject<HTMLDivElement>}
      >
        {open && (
          <div className="absolute -left-24 top-6 mt-2 shadow-md rounded-md overflow-hidden border z-20 border-gray-200 bg-white">
            {filters.map((filter) => (
              <button
                key={filter.name}
                className={`hover:bg-gray-200 p-4 text-sm duration-300 focus:outline-none w-40 text-left ${
                  filter.name === name ? "text-main" : ""
                }`}
                onClick={() => {
                  dispatch(setFilter(filter));
                  setOpen(false);
                }}
                aria-label={filter.name}
              >
                {filter.name}
              </button>
            ))}
          </div>
        )}
      </div>
    </>
  );
};
