import React from "react";
import { FC } from "react";

export const Modal: FC = ({ children }): JSX.Element => {
  return (
    <div className="absolute -translate-y-1/2 -translate-x-1/2 bg-white top-1/2 left-1/2 transform  border-gray-200 border p-10 rounded-md">
      {children}
    </div>
  );
};
