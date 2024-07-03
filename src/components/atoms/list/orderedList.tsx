"use client";

import { OrderedListType } from "@/types/components/atoms/list/OrderedListType";
import { ReactElement } from "react";

const OrderedList = ({ children }: OrderedListType): ReactElement => {
  return <ol className="list-decimal">{children}</ol>;
};

export default OrderedList;
