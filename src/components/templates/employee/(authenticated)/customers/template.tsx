"use client";

import { ReactElement, useEffect, useState } from "react";
import SearchGroup from "@/components/molecules/search/employee/customers/searchGroup";
import ButtonGroup from "@/components/molecules/buttonGroup/employee/customers/buttonGroup";
import TableGroup from "@/components/molecules/tableGroup/employee/customers/tableGroup";
import MainInner from "@/components/atoms/div/inner/mainInner";
import ModalGroup from "@/components/molecules/modalGroup/employee/customers/modalGroup";
import AuthenticatedLayout from "@/components/molecules/layouts/employee/authenticatedLayout";
import { useIndex as useHubIndex } from "@/hooks/common/hub/useIndex";
import { useIndex as useEmployeeIndex } from "@/hooks/common/employee/useIndex";
import { useIndex as useCustomerStatusIndex } from "@/hooks/enum/customerStatus/useIndex";
import { useIndex as usePlanIndex } from "@/hooks/employee/plan/useIndex";
import { useIndex } from "@/hooks/employee/customer/useIndex";
import { ReactSelectOption } from "@/types/reactSelectOptions/ReactSelectOption";

const Template = (): ReactElement => {
  const [ isModalOpen, setModalOpen ] = useState<boolean>(false);
  const { getEnums: getCustomerStatuses, enums: customerStatuses } = useCustomerStatusIndex();
  const { getHubs, options: hubOptions } = useHubIndex();
  const { getEmployees, options: employeeOptions } = useEmployeeIndex();
  const { getPlansOptions, planOptions } = usePlanIndex();

  const {
    condition, setCondition,
    customerOptions, getCustomerOptions,
    getCustomers, customers,
  } = useIndex();

  useEffect((): void => {
    getCustomerStatuses();

    (async (): Promise<void> => {
      await getHubs();
      await getEmployees();
      await getCustomerOptions();
      await getPlansOptions();

    })();
  }, [ getCustomerOptions, getCustomerStatuses, getEmployees, getHubs, getPlansOptions ]);

  useEffect(() => {
    (async (): Promise<void> => {
      await getCustomers();
    })();
  }, [ condition, getCustomers ]);

  // handles
  const handleConditionOnChange = (
    hubOptions: ReactSelectOption[], customerStatusOptions: ReactSelectOption[], customerOptions: ReactSelectOption[],
    dedicatedAccountText: string | null, name: string | null, kana: string | null, planOptions: ReactSelectOption[], employeeOptions: ReactSelectOption[],
    email: string | null, chatWorkId: string | null, chatWorkGroupId: string | null, companyName: string | null, tel: string | null,
  ): void => {
    setCondition(prevState => {
      return {
        ...prevState,
        hubOptions: hubOptions,
        customerStatusOptions: customerStatusOptions,
        customerOptions: customerOptions,
        dedicatedAccountText: dedicatedAccountText,
        name: name,
        kana: kana,
        planOptions: planOptions,
        employeeOptions: employeeOptions,
        email: email,
        chatWorkId: chatWorkId,
        chatWorkGroupId: chatWorkGroupId,
        companyName: companyName,
        tel: tel,
      };
    });
  };

  return (
    <>
      <AuthenticatedLayout>
        <MainInner>
          <SearchGroup
            hubOptions={hubOptions} customerStatuses={customerStatuses} customerOptions={customerOptions}
            planOptions={planOptions} employeeOptions={employeeOptions} condition={condition}
            handleConditionOnChange={handleConditionOnChange}
          />
          <ButtonGroup />
          <TableGroup customers={customers} handleEditButtonOnClick={() => setModalOpen(true)} />
        </MainInner>
        <ModalGroup isOpen={isModalOpen} handleClose={() => setModalOpen(false)} />
      </AuthenticatedLayout>
    </>
  );
};

export default Template;
