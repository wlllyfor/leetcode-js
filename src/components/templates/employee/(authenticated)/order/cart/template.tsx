"use client";

import { ReactElement, useEffect, useState } from "react";
import SearchGroup from "@/components/molecules/search/employee/order/cart/searchGroup";
import TableGroup from "@/components/molecules/tableGroup/employee/order/cart/tableGroup";
import SubmitGroup from "@/components/molecules/submitGroup/employee/order/cart/submitGroup";
import MainInner from "@/components/atoms/div/inner/mainInner";
import AuthenticatedLayout from "@/components/molecules/layouts/employee/authenticatedLayout";
import { useIndex as useOrderStatusIndex } from "@/hooks/enum/orderStatuses/useIndex";
import { useIndex as useHubIndex } from "@/hooks/common/hub/useIndex";
import { useIndex as useGroupIndex } from "@/hooks/common/group/useIndex";
import { useIndex as useEmployeeIndex } from "@/hooks/common/employee/useIndex";
import { useIndex } from "@/hooks/employee/employeeCarts/useIndex";
import { ReactSelectOption } from "@/types/reactSelectOptions/ReactSelectOption";
import { EmployeeCartDbType } from "@/types/db/employeeCart";
import { UUID } from "@/lib/uuid";

const Template = (): ReactElement => {
  const handleEditButtonOnClick = () => {
    alert("削除ボタン");
  };

  const { getEnums: getOrderStatusOptions, enums: orderStatusOptions } = useOrderStatusIndex();
  const { options: hubOptions, getHubs } = useHubIndex();
  const { options: groupOptions, getGroups } = useGroupIndex();
  const { options: employeeOptions, getEmployees } = useEmployeeIndex();
  const { condition, setCondition, getEmployeeCarts, employeeCarts } = useIndex();
  const [ employeeCartEntities, setEmployeeCartEntities ] = useState<(EmployeeCartDbType & {
    uuid: string;
    checked: boolean;
  })[]>([]);

  useEffect((): void => {
    getOrderStatusOptions("employee");
    (async (): Promise<void> => {
      await getHubs();
      await getGroups();
      await getEmployees();
      await getEmployeeCarts();
    })();
  }, [ getOrderStatusOptions, getHubs, getGroups, getEmployees, getEmployeeCarts ]);

  // エンティティの作成
  useEffect((): void => {
    const newEntities = employeeCarts.map(cart => ({
      ...cart,
      uuid: UUID.generate(),
      checked: false,
    }));
    setEmployeeCartEntities(newEntities);
  }, [ employeeCarts ]);

  // handles

  const handleConditionOnChange = (
    orderStatusOptions: ReactSelectOption[],
    hubOptions: ReactSelectOption[],
    groupOptions: ReactSelectOption[],
    employeeOptions: ReactSelectOption[],
    orderId: string,
    employeeId: string,
  ): void => {
    setCondition(prevState => {
      return {
        customerId: employeeId,
        orderId: orderId,
        employeeOptions: employeeOptions,
        groupOptions: groupOptions,
        hubOptions: hubOptions,
        orderStatusOptions: orderStatusOptions,
      };
    });
  };

  return (
    <>
      <AuthenticatedLayout>
        <MainInner>
          <SearchGroup
            orderStatusOptions={orderStatusOptions} hubOptions={hubOptions} groupOptions={groupOptions}
            employeeOptions={employeeOptions} condition={condition} handleConditionOnChange={handleConditionOnChange}
          />
          <div className="flex items-end min-w-[105rem]">
            <TableGroup
              handleEditButtonClick={handleEditButtonOnClick}
              employeeCartEntities={employeeCartEntities} setEmployeeCartEntities={setEmployeeCartEntities}
            />
            <div className="pl-36">
              <SubmitGroup employeeCartEntities={employeeCartEntities} />
            </div>
          </div>
        </MainInner>
      </AuthenticatedLayout>
    </>
  );
};

export default Template;
