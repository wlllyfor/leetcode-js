"use client";

import CustomerMenu from "@/components/ph1/molecules/menu/customerMenu";
import React, { ReactElement, ReactNode } from "react";

const AuthenticatedLayout = ({ children, hubCode }: { children: ReactNode; hubCode: string; }): ReactElement => {
  return (
    <div>
      <CustomerMenu hubCode={hubCode} />
      <div>{children}</div>
    </div>
  );
};
export default AuthenticatedLayout;
