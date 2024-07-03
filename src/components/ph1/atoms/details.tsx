"use client";

import { DetailsType } from "@/types/components/atoms/DetailsType";
import classes from "@/styles/components/atoms/details.module.scss";
import { ReactElement } from "react";

const Details = ({ children }: DetailsType): ReactElement => {
  return <details className={classes.details}>{children}</details>;
};

export default Details;
