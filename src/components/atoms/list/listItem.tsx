"use client";

import { ListItemType } from "@/types/components/atoms/list/ListItemType";
import { ReactElement } from "react";

const ListItem = ({ children }: ListItemType): ReactElement => {
  return <li className="mt-3">{children}</li>;
};

export default ListItem;
