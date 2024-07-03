"use client";

import { ReactElement, useEffect, useState } from "react";
import MainInner from "@/components/atoms/div/inner/mainInner";
import AuthenticatedLayout from "@/components/molecules/layouts/customer/authenticatedLayout";
import NormalClickableButton from "@/components/atoms/button/normalClickableButton";
import CustomerCreateModal from "@/components/molecules/modalGroup/customer/customerCreateModal";
import CustomerAxios from "@/lib/axios/customer-axios";
import { useRecoilValue } from "recoil";
import { CustomerState } from "@/store/Auth/CustomerState";
import { CustomerDbTableType } from "@/types/db/customer";
import { If, Then } from "react-if";
import CustomerEditModal from "@/components/molecules/modalGroup/customer/customerEditModal";

const Template = ({ hubCode }: { hubCode: string; }): ReactElement => {
  const auth = useRecoilValue(CustomerState);

  const [ isCustomerCreateModalOpen, setCustomerCreateModalOpen ] = useState<boolean>(false);
  const [ isCustomerEditModalOpen, setCustomerEditModalOpen ] = useState<boolean>(false);

  const [ customerUpdatedAt, setCustomerUpdatedAt ] = useState<string>("");
  const [ email, setEmail ] = useState<string>("");

  const [ customer, setCustomer ] = useState<CustomerDbTableType>();

  useEffect((): void => {
    (async (): Promise<void> => {
      CustomerAxios._setToken(auth);
      const customer = await CustomerAxios.getMe() as CustomerDbTableType;

      if (!customer.name) {
        setCustomerCreateModalOpen(prevState => true);
      }

      if (customer) {
        setEmail(prevState => customer.email);
        setCustomerUpdatedAt(prevState => customer.updatedAt);
        setCustomer(prevState => customer);
      }
    })();
  }, [ auth ]);

  useEffect(() => {
    // モーダル閉じたら再取得する
    if (!isCustomerEditModalOpen) {
      (async () => {
        CustomerAxios._setToken(auth);
        const customer = await CustomerAxios.getMe() as CustomerDbTableType;
        setCustomer(prevState => customer);
      })();
    }
  }, [ isCustomerEditModalOpen, auth ]);

  return (
    <AuthenticatedLayout hubCode={hubCode}>
      <MainInner>
        <p>マイページ予定</p>
        <NormalClickableButton
          text={"プロフィール編集"}
          color={"lightblue"}
          onClick={() => {
            setCustomerEditModalOpen(prev => true);
          }}
        />
      </MainInner>
      <If condition={isCustomerCreateModalOpen}>
        <Then>
          <CustomerCreateModal
            isOpen={true}
            handleClose={() => setCustomerCreateModalOpen(prev => false)}
            email={email}
            updatedAt={customerUpdatedAt}
          />
        </Then>
      </If>
      <If condition={isCustomerEditModalOpen}>
        <Then>
          <CustomerEditModal
            isOpen={true}
            handleClose={() => setCustomerEditModalOpen(prev => false)}
            customer={customer as CustomerDbTableType}
          />
        </Then>
      </If>
    </AuthenticatedLayout>
  );
};

export default Template;
