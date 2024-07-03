"use client";

import { ChangeEvent, ReactElement, useId } from "react";
import SearchWrapper from "@/components/atoms/div/wrapper/searchWrapper";
import SearchInput from "@/components/molecules/search/input/searchInput";
import SearchSelect from "@/components/molecules/search/select/searchSelect";
import FlexWrapperSearch from "@/components/atoms/div/wrapper/flexWrapperSearch";
import { ReactSelectOption } from "@/types/reactSelectOptions/ReactSelectOption";
import { EmployeeCartIndexConditionType } from "@/hooks/employee/employeeCarts/useIndex";

const SearchGroup = ({
  orderStatusOptions,
  hubOptions,
  groupOptions,
  employeeOptions,
  condition,
  handleConditionOnChange,
}: {
  orderStatusOptions: ReactSelectOption[];
  hubOptions: ReactSelectOption[];
  groupOptions: ReactSelectOption[];
  employeeOptions: ReactSelectOption[];
  condition: EmployeeCartIndexConditionType;
  handleConditionOnChange: (
    orderStatusOptions: ReactSelectOption[],
    hubOptions: ReactSelectOption[],
    groupOptions: ReactSelectOption[],
    employeeOptions: ReactSelectOption[],
    orderId: string,
    employeeId: string,
  ) => void;
}): ReactElement => {
  const id = useId();

  /**
   * 注文ステータス変更イベント
   * @param {ReactSelectOption[]} e
   */
  const handleOrderStatusOptionOnChange = (e: ReactSelectOption[]): void => {
    handleConditionOnChange(
      e, condition.hubOptions, condition.groupOptions, condition.employeeOptions, condition.orderId, condition.customerId,
    );
  };

  /**
   * 拠点変更イベント
   * @param {ReactSelectOption[]} e
   */
  const handleHubOptionOnChange = (e: ReactSelectOption[]): void => {
    handleConditionOnChange(
      condition.orderStatusOptions, e, condition.groupOptions, condition.employeeOptions, condition.orderId, condition.customerId,
    );
  };

  /**
   * 注文ID変更イベント
   * @param {ChangeEvent<HTMLInputElement>} e
   */
  const handleOrderIdOnChange = (e: ChangeEvent<HTMLInputElement>): void => {
    handleConditionOnChange(
      condition.orderStatusOptions, condition.groupOptions, condition.groupOptions, condition.employeeOptions, e.target.value, condition.customerId,
    );
  };

  /**
   * 班変更イベント
   * @param {ReactSelectOption[]} e
   */
  const handleGroupOptionOnChange = (e: ReactSelectOption[]): void => {
    handleConditionOnChange(
      e, condition.hubOptions, condition.groupOptions, condition.employeeOptions, condition.orderId, condition.customerId,
    );
  };

  /**
   * スタッフ変更イベント
   * @param {ReactSelectOption[]} e
   */
  const handleEmployeeOptionOnChange = (e: ReactSelectOption[]): void => {
    handleConditionOnChange(
      condition.orderStatusOptions, e, condition.groupOptions, condition.employeeOptions, condition.orderId, condition.customerId,
    );
  };

  /**
   * 顧客ID変更イベント
   * @param {ChangeEvent<HTMLInputElement>} e
   */
  const handleCustomerIdOnChange = (e: ChangeEvent<HTMLInputElement>): void => {
    handleConditionOnChange(
      condition.orderStatusOptions, condition.groupOptions, condition.groupOptions, condition.employeeOptions, e.target.value, condition.customerId,
    );
  };

  return (
    <SearchWrapper>
      <FlexWrapperSearch>
        <SearchSelect
          value={condition.orderStatusOptions} labelText="ステータス" options={orderStatusOptions} isMulti
          checkboxId={`${id}-status`} checkboxLabelText="デフォルト" checked={false}
          changeMultiFunction={handleOrderStatusOptionOnChange}
        />
        <SearchSelect
          value={condition.hubOptions} labelText="拠点" options={hubOptions} isMulti
          checkboxId={`${id}-hub`} checkboxLabelText="デフォルト" checked={false}
          changeMultiFunction={handleHubOptionOnChange}
        />
        <SearchInput
          id={`${id}-order-id`} text="注文ID" value={condition.orderId}
          handleValueOnChange={handleOrderIdOnChange}
        />
      </FlexWrapperSearch>
      <FlexWrapperSearch>
        <SearchSelect
          value={condition.groupOptions} labelText="班" options={groupOptions} isMulti
          checkboxId={`${id}-group`} checkboxLabelText="デフォルト" checked={false}
          changeMultiFunction={handleGroupOptionOnChange}
        />
        <SearchSelect
          value={condition.employeeOptions} labelText="スタッフ" options={employeeOptions} isMulti
          checkboxId={`${id}-employee`} checkboxLabelText="デフォルト" checked={false}
          changeMultiFunction={handleEmployeeOptionOnChange}
        />
        <SearchInput
          id={`${id}-customer-id`} text="顧客ID" value={condition.customerId}
          handleValueOnChange={handleCustomerIdOnChange}
        />
      </FlexWrapperSearch>
    </SearchWrapper>
  );
};

export default SearchGroup;
