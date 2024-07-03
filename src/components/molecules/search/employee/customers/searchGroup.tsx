"use client";

import { ReactElement, useId } from "react";
import SearchWrapper from "@/components/atoms/div/wrapper/searchWrapper";
import SearchInput from "@/components/molecules/search/input/searchInput";
import SearchSelect from "@/components/molecules/search/select/searchSelect";
import FlexWrapperSearch from "@/components/atoms/div/wrapper/flexWrapperSearch";
import { ReactSelectOption } from "@/types/reactSelectOptions/ReactSelectOption";
import { CustomerIndexConditionType } from "@/hooks/employee/customer/useIndex";

const SearchGroup = (
  {
    hubOptions,
    customerStatuses,
    customerOptions,
    planOptions,
    employeeOptions,
    condition,
    handleConditionOnChange,
  }: {
    hubOptions: ReactSelectOption[];
    customerStatuses: ReactSelectOption[];
    customerOptions: ReactSelectOption[];
    planOptions: ReactSelectOption[];
    employeeOptions: ReactSelectOption[];
    condition: CustomerIndexConditionType;
    handleConditionOnChange: (
      hubOptions: ReactSelectOption[], customerStatusOptions: ReactSelectOption[], customerOptions: ReactSelectOption[],
      dedicatedAccountText: string | null, name: string | null, kana: string | null, planOptions: ReactSelectOption[], employeeOptions: ReactSelectOption[],
      email: string | null, chatWorkId: string | null, chatWorkGroupId: string | null, companyName: string | null, tel: string | null,
    ) => void;
  },
): ReactElement => {
  const id = useId();

  return (
    <SearchWrapper>
      <FlexWrapperSearch>
        <SearchSelect
          value={condition.hubOptions} labelText="拠点" options={hubOptions} isMulti
          checkboxId={`${id}-payments`} checkboxLabelText="デフォルト" checked={false} changeMultiFunction={e => {
            handleConditionOnChange(e, condition.customerStatusOptions, condition.customerOptions, condition.dedicatedAccountText,
              condition.name, condition.kana, condition.planOptions, condition.employeeOptions,
              condition.email, condition.chatWorkId, condition.chatWorkGroupId, condition.companyName, condition.tel);
          }}
        />
        <SearchSelect
          value={condition.customerStatusOptions} labelText="会員ステータス" options={customerStatuses} isMulti
          checkboxId={`${id}-status`} checkboxLabelText="デフォルト" checked={false} changeMultiFunction={e => {
            handleConditionOnChange(condition.hubOptions, e, condition.customerOptions, condition.dedicatedAccountText,
              condition.name, condition.kana, condition.planOptions, condition.employeeOptions,
              condition.email, condition.chatWorkId, condition.chatWorkGroupId, condition.companyName, condition.tel);
          }}
        />
        <SearchSelect
          value={condition.customerOptions} labelText="顧客ID" options={customerOptions} isMulti
          checkboxId={`${id}-customer-id`} checkboxLabelText="デフォルト" checked={false} changeMultiFunction={e => {
            handleConditionOnChange(condition.hubOptions, condition.customerStatusOptions, e, condition.dedicatedAccountText,
              condition.name, condition.kana, condition.planOptions, condition.employeeOptions,
              condition.email, condition.chatWorkId, condition.chatWorkGroupId, condition.companyName, condition.tel);
          }}
        />
        <SearchInput
          id={`${id}-account`} text="専用口座" value={condition.dedicatedAccountText ?? ""}
          handleValueOnChange={e => {
            handleConditionOnChange(condition.hubOptions, condition.customerStatusOptions, condition.customerOptions, e.target.value,
              condition.name, condition.kana, condition.planOptions, condition.employeeOptions,
              condition.email, condition.chatWorkId, condition.chatWorkGroupId, condition.companyName, condition.tel);
          }}
        />
        <SearchInput
          id={`${id}-name`} text="氏名" value={condition.name ?? ""} handleValueOnChange={e => {
            handleConditionOnChange(condition.hubOptions, condition.customerStatusOptions, condition.customerOptions, condition.dedicatedAccountText,
              e.target.value, condition.kana, condition.planOptions, condition.employeeOptions,
              condition.email, condition.chatWorkId, condition.chatWorkGroupId, condition.companyName, condition.tel);
          }}
        />
        <SearchInput
          id={`${id}-kana`} text="カナ" value={condition.kana ?? ""} handleValueOnChange={e => {
            handleConditionOnChange(condition.hubOptions, condition.customerStatusOptions, condition.customerOptions, condition.dedicatedAccountText,
              condition.name, e.target.value, condition.planOptions, condition.employeeOptions,
              condition.email, condition.chatWorkId, condition.chatWorkGroupId, condition.companyName, condition.tel);
          }}
        />
      </FlexWrapperSearch>
      <FlexWrapperSearch>
        <SearchSelect
          value={condition.planOptions} labelText="プラン" options={planOptions} isMulti
          checkboxId={`${id}-plan`} checkboxLabelText="デフォルト" checked={false} changeMultiFunction={e => {
            handleConditionOnChange(condition.hubOptions, condition.customerStatusOptions, condition.customerOptions, condition.dedicatedAccountText,
              condition.name, condition.kana, e, condition.employeeOptions,
              condition.email, condition.chatWorkId, condition.chatWorkGroupId, condition.companyName, condition.tel);
          }}
        />
        <SearchSelect
          value={condition.employeeOptions} labelText="スタッフ" options={employeeOptions} isMulti
          checkboxId={`${id}-staff`} checkboxLabelText="デフォルト" checked={false} changeMultiFunction={e => {
            handleConditionOnChange(condition.hubOptions, condition.customerStatusOptions, condition.customerOptions, condition.dedicatedAccountText,
              condition.name, condition.kana, condition.planOptions, e,
              condition.email, condition.chatWorkId, condition.chatWorkGroupId, condition.companyName, condition.tel);
          }}
        />
        <SearchInput
          id={`${id}-mail`} text="メールアドレス" value={condition.email ?? ""} handleValueOnChange={e => {
            handleConditionOnChange(condition.hubOptions, condition.customerStatusOptions, condition.customerOptions, condition.dedicatedAccountText,
              condition.name, condition.kana, condition.planOptions, condition.employeeOptions,
              e.target.value, condition.chatWorkId, condition.chatWorkGroupId, condition.companyName, condition.tel);
          }}
        />
        <SearchInput
          id={`${id}-chatwork`} text="チャットワークID" value={condition.chatWorkId ?? ""} handleValueOnChange={e => {
            handleConditionOnChange(condition.hubOptions, condition.customerStatusOptions, condition.customerOptions, condition.dedicatedAccountText,
              condition.name, condition.kana, condition.planOptions, condition.employeeOptions,
              condition.email, e.target.value, condition.chatWorkGroupId, condition.companyName, condition.tel);
          }}
        />
        <SearchInput
          id={`${id}-chatworkgroup`} text="チャットワークグループID" value={condition.chatWorkGroupId ?? ""}
          handleValueOnChange={e => {
            handleConditionOnChange(condition.hubOptions, condition.customerStatusOptions, condition.customerOptions, condition.dedicatedAccountText,
              condition.name, condition.kana, condition.planOptions, condition.employeeOptions,
              condition.email, condition.chatWorkId, e.target.value, condition.companyName, condition.tel);
          }}
        />
        <SearchInput
          id={`${id}-company`} text="会社名" value={condition.companyName ?? ""} handleValueOnChange={e => {
            handleConditionOnChange(condition.hubOptions, condition.customerStatusOptions, condition.customerOptions, condition.dedicatedAccountText,
              condition.name, condition.kana, condition.planOptions, condition.employeeOptions,
              condition.email, condition.chatWorkId, condition.chatWorkGroupId, e.target.value, condition.tel);
          }}
        />
        <SearchInput
          id={`${id}-tel`} text="TEL" value={condition.tel ?? ""} handleValueOnChange={e => {
            handleConditionOnChange(condition.hubOptions, condition.customerStatusOptions, condition.customerOptions, condition.dedicatedAccountText,
              condition.name, condition.kana, condition.planOptions, condition.employeeOptions,
              condition.email, condition.chatWorkId, condition.chatWorkGroupId, condition.companyName, e.target.value);
          }}
        />
      </FlexWrapperSearch>
    </SearchWrapper>
  );
};

export default SearchGroup;
