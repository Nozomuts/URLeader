import React, { FC, useState } from "react";

type Props = {
  filterName: string;
};

export const SideMenu: FC<Props> = ({ filterName }): JSX.Element => {
  const [menu, setMenu] = useState([
    { name: "すべて" },
    { name: "今日" },
    { name: "近日" },
  ]);
  return (
    <div className="mx-12 w-60 text-left">
      {menu.map(({ name }) => (
        <div
          key={name}
          className={`text-gray-500 hover:bg-white cursor-pointer  rounded-md pl-6 py-4 mb-4 ${
            name === filterName ? "bg-white" : ""
          }`}
        >
          {name}
        </div>
      ))}
      <a className="text-main block pl-4 mt-4 cursor-pointer rounded-md py-4 w-full hover:bg-gray-200">
        ＋ フィルターを追加
      </a>
    </div>
  );
};
