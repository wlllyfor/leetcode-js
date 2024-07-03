"use client";

import EmployeeMenu from "@/components/molecules/common/employeeMenu";
import React, { ReactElement, ReactNode } from "react";
import EmployeeHeader from "@/components/molecules/common/employeeHeader";

const AuthenticatedLayout = ({ children }: { children?: ReactNode; }): ReactElement => {
  return (
    <>
      <EmployeeHeader />
      <div className="overflow-auto flex absolute">
        {/* <EmployeeMenu /> */}
        <div className="pt-[58px] min-h-[100vh]">{children}</div>
      </div>
    </>
  );
};
export default AuthenticatedLayout;
