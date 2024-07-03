"use client";

import { ListType } from "@/types/components/atoms/ListType";
import classes from "@/styles/components/atoms/list.module.scss";
import { ReactElement } from "react";

const List = ({ children, isMenu, isMenuChild }: ListType): ReactElement => {
  const classNames: string[] = [
    classes.list,
    ...(isMenu ? [ classes.menu__list ] : []),
    ...(isMenuChild ? [ classes.menu__list__child ] : []),
  ];
  return <li className={classNames.join(" ")}>{children}</li>;
};

export default List;
