"use client";

import { ChangeEvent, ReactElement, useId } from "react";
import SearchWrapper from "@/components/atoms/div/wrapper/searchWrapper";
import SearchInput from "@/components/molecules/search/input/searchInput";
import SearchSelect from "@/components/molecules/search/select/searchSelect";
import FlexWrapperSearch from "@/components/atoms/div/wrapper/flexWrapperSearch";
import { ReactSelectOption } from "@/types/reactSelectOptions/ReactSelectOption";

const SearchGroup = ({
  orderStatusesOptions,
  hubOptions,
  groupOptions,
  employeeOptions,
  debitStatusOptions,
  orderStockCreateStatusOptions,
  orderStatusOptionValues,
  hubOptionValues,
  groupOptionValues,
  employeeOptionValues,
  debitStatusOptionValues,
  orderStockCreateStatusOptionValues,
  orderId,
  handleOrderStatusOptionOnChange,
  handleHubOptionOnChange,
  handleStockCreateOptionOnChange,
  handleGroupOptionOnChange,
  handleEmployeeOptionOnChange,
  handleDebitStatusOptionOnChange,
  handleOrderIdOnChange,
}: {
  orderStatusesOptions: ReactSelectOption[];
  hubOptions: ReactSelectOption[];
  groupOptions: ReactSelectOption[];
  employeeOptions: ReactSelectOption[];
  debitStatusOptions: ReactSelectOption[];
  orderStockCreateStatusOptions: ReactSelectOption[];
  orderStatusOptionValues: ReactSelectOption[];
  hubOptionValues: ReactSelectOption[];
  groupOptionValues: ReactSelectOption[];
  employeeOptionValues: ReactSelectOption[];
  debitStatusOptionValues: ReactSelectOption[];
  orderStockCreateStatusOptionValues: ReactSelectOption[];
  orderId: number | null;
  handleOrderStatusOptionOnChange: (e: ReactSelectOption[]) => void;
  handleHubOptionOnChange: (e: ReactSelectOption[]) => void;
  handleStockCreateOptionOnChange: (e: ReactSelectOption[]) => void;
  handleGroupOptionOnChange: (e: ReactSelectOption[]) => void;
  handleEmployeeOptionOnChange: (e: ReactSelectOption[]) => void;
  handleDebitStatusOptionOnChange: (e: ReactSelectOption[]) => void;
  handleOrderIdOnChange: (e: ChangeEvent<HTMLInputElement>) => void;
}): ReactElement => {
  const id = useId();

  return (
    <SearchWrapper>
      <FlexWrapperSearch>
        <SearchSelect
          value={orderStatusOptionValues} labelText="ステータス" options={orderStatusesOptions} isMulti
          checkboxId={`${id}-status`}
          checkboxLabelText="デフォルト" checked={false}
          changeMultiFunction={handleOrderStatusOptionOnChange}
        />
        <SearchSelect
          value={hubOptionValues} labelText="拠点" options={hubOptions} isMulti
          checkboxId={`${id}-payments`}
          checkboxLabelText="デフォルト" checked={false}
          changeMultiFunction={handleHubOptionOnChange}
        />
        <SearchSelect
          value={orderStockCreateStatusOptionValues} labelText="入出荷作成ステータス"
          options={orderStockCreateStatusOptions}
          isMulti
          checkboxId={`${id}-stock-create-statuses`} checkboxLabelText="デフォルト" checked={false}
          changeMultiFunction={handleStockCreateOptionOnChange}
        />
      </FlexWrapperSearch>
      <FlexWrapperSearch>
        <SearchSelect
          value={groupOptionValues} labelText="班" options={groupOptions} isMulti
          checkboxId={`${id}-plan`}
          checkboxLabelText="デフォルト" checked={false}
          changeMultiFunction={handleGroupOptionOnChange}
        />
        <SearchSelect
          value={employeeOptionValues} labelText="スタッフ" options={employeeOptions} isMulti
          checkboxId={`${id}-staff`}
          checkboxLabelText="デフォルト" checked={false}
          changeMultiFunction={handleEmployeeOptionOnChange}
        />
        <SearchSelect
          value={debitStatusOptionValues} labelText="引落ステータス" options={debitStatusOptions} isMulti
          checkboxId={`${id}-withdrawal-status`} checkboxLabelText="デフォルト" checked={false}
          changeMultiFunction={handleDebitStatusOptionOnChange}
        />
        <SearchInput
          id={`${id}-order-id`} text="注文ID" handleValueOnChange={handleOrderIdOnChange}
          value={orderId?.toString() ?? ""}
        />
      </FlexWrapperSearch>
    </SearchWrapper>
  );
};

export default SearchGroup;
