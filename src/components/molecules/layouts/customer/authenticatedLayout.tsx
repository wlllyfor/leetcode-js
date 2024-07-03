"use client";

import CustomerMenu from "@/components/molecules/common/customerMenu";
import { CustomerDbTableType } from "@/types/db/customer";
import React, { ReactElement, ReactNode, useEffect, useState } from "react";
import { If, Then } from "react-if";
import { useRecoilValue } from "recoil";
import { CustomerState } from "@/store/Auth/CustomerState";
import CustomerAxios from "@/lib/axios/customer-axios";
import CustomerHeader from "@/components/molecules/common/customerHeader";

const AuthenticatedLayout = ({ children, hubCode, showCustomerMenu = true }:
  {
    children: ReactNode;
    hubCode: string;
    showCustomerMenu?: boolean;
  }): ReactElement => {
  const auth = useRecoilValue(CustomerState);

  const [ customer, setCustomer ] = useState<CustomerDbTableType>();

  useEffect((): void => {
    (async (): Promise<void> => {
      CustomerAxios._setToken(auth);
      const customer = await CustomerAxios.getMe() as CustomerDbTableType;
      if (customer) {
        setCustomer(prevState => customer);
      }
    })();
  }, [ auth, showCustomerMenu ]);
  const wrapperClassNames = showCustomerMenu ? "overflow-auto flex absolute" : "";

  return (
    <div data-component="authenticatedLayout" className={wrapperClassNames}>
      <CustomerHeader />
      <If condition={!!customer && showCustomerMenu}>
        <Then>
          <CustomerMenu hubCode={hubCode} customer={customer} />
        </Then>
      </If>
      <div className="pt-[58px] min-h-[100vh] min-w-[calc(100vw_-_250px)]">{children}</div>
    </div>
  );
};
export default AuthenticatedLayout;
