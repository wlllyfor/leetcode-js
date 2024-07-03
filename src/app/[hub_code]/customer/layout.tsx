"use client";

import React, { ReactElement, ReactNode } from "react";

const Layout = ({ children }: { children: ReactNode; }): ReactElement => {
  return (
    <>
      {children}
    </>
  );
};
export default Layout;
