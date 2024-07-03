import classes from "@/styles/common/page.module.scss";
import React, { ReactElement, ReactNode } from "react";

const Layout = ({ children }: { children: ReactNode; }): ReactElement => {
  return <div className={classes.login__wrapper}>{children}</div>;
};
export default Layout;
