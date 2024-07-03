"use client";

import { ListItemType } from "@/types/components/atoms/list/ListItemType";
import { ReactElement } from "react";

const MenuListItem = ({ children, isInDetails }: ListItemType): ReactElement => {
  const classes = isInDetails ? "py-[12px] w-[250px] pl-16 left-0 ml-[-1.5rem]" : "py-[10px] px-6 w-full";
  return <li className={classes}>{children}</li>;
};

export default MenuListItem;
