"use client";

import { DetailsType } from "@/types/components/atoms/toggle/DetailsType";
import { ReactElement } from "react";

const Details = ({ children }: DetailsType): ReactElement => {
  return <details>{children}</details>;
};

export default Details;
