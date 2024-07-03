"use client";

import { TrType } from "@/types/components/atoms/TrType";
import { ReactElement } from "react";

const Tr = ({ children }: TrType): ReactElement => {
  return <tr>{children}</tr>;
};

export default Tr;
