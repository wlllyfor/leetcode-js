"use client";

import classes from "@/styles/components/molecules/common/loading.module.scss";
import { ReactElement } from "react";

const Loading = (): ReactElement => {
  return (
    <div className={classes.loader__wrapper}>
      <div className={classes.loader}>Loading...</div>
    </div>
  );
};

export default Loading;
