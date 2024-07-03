"use client";

import React, { ReactElement, ReactNode } from "react";
import { CustomerGuard } from "@/app/guard/customer";

const Layout = ({ children }: { children: ReactNode; }): ReactElement => {
  return (
    <CustomerGuard>
      {children}
    </CustomerGuard>
  );
};
export default Layout;
