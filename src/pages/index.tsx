import React, { useState } from "react";
import { SideMenu } from "../components/SideMenu";

export default function index(): JSX.Element {
  const [filter, setFilter] = useState({
    name: "すべて",
    tag: null,
    date: null,
  });

  return (
    <div className="pt-10">
      <SideMenu filterName={filter.name} />
    </div>
  );
}
