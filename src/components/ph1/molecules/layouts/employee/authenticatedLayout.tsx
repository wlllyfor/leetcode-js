"use client";

import classes from "@/styles/common/page.module.scss";
import EmployeeMenu from "@/components/ph1/molecules/menu/employeeMenu";
import React, { ReactElement, ReactNode } from "react";

const AuthenticatedLayout = ({ children }: { children?: ReactNode; }): ReactElement => {
  return (
    <div className={classes.main__wrapper}>
      <EmployeeMenu />
      <div className={classes.content__wrapper}>{children}</div>
    </div>
  );
};
export default AuthenticatedLayout;
