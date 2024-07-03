"use client";

import { TabButtonType } from "@/types/components/atoms/button/TabButtonType";
import classes from "@/styles/components/atoms/button/tabButton.module.scss";
import { ReactElement } from "react";

const TabButton = ({ clickFunction, children, isActive }: TabButtonType): ReactElement => {
  const classNames: string[] = [ classes.tab_button, ...(isActive ? [ classes.active ] : []) ];
  return (
    <button className={classNames.join(" ")} onClick={clickFunction}>
      {children}
    </button>
  );
};

export default TabButton;
