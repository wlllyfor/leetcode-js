"use client";

import { ReactElement, useId } from "react";
import SearchWrapper from "@/components/atoms/div/wrapper/searchWrapper";
import SearchInput from "@/components/molecules/search/input/searchInput";
import SearchSelect from "@/components/molecules/search/select/searchSelect";
import FlexWrapperSearch from "@/components/atoms/div/wrapper/flexWrapperSearch";
import { useEmployeeSearch } from "@/hooks/employee/employees/useEmployeeSearch";
import { SearchGroupPropsType } from "@/types/components/molecules/search/employee/employees/searchGroup";

const SearchGroup = ({
  hubs,
  groups,
  jobPositions,
  name,
  nameKana,
  staffId,
  filterFunction,
}: SearchGroupPropsType): ReactElement => {
  const id = useId();

  const {
    isDefaultHubChecked,
    selectHubsOptions,
    isDefaultGroupChecked,
    selectGroupOptions,
    selectableGroupOptions,
    handleCheckHubsChange,
    handleSelectHubsChange,
    handleCheckGroupChange,
    handleSelectGroupsChange,
    handleChangeName,
    handleChangeNameKana,
    handleChangeStaffId,
  } = useEmployeeSearch({ hubs, groups, filterFunction, jobPositions, name, nameKana, staffId });


  return (
    <SearchWrapper>
      <FlexWrapperSearch>
        {/* 拠点絞り込み */}
        <SearchSelect
          value={selectHubsOptions}
          labelText="拠点"
          options={hubs.options || []}
          isMulti
          checked={isDefaultHubChecked}
          checkboxId={`${id}-hubs`}
          checkboxLabelText="デフォルト"
          changeMultiFunction={handleSelectHubsChange}
          changeCheckFunction={handleCheckHubsChange}
        />
        <SearchInput
          id={`${id}-name`}
          text="名前"
          value={name.filteredName}
          handleValueOnChange={handleChangeName}
        />
        <SearchInput
          id={`${id}-en`}
          text="名前(英語)"
          value={nameKana.filteredNameKana}
          handleValueOnChange={handleChangeNameKana}
        />
      </FlexWrapperSearch>
      <FlexWrapperSearch>
        <SearchSelect
          value={selectGroupOptions}
          labelText="班"
          options={selectableGroupOptions}
          isMulti
          checkboxId={`${id}-group`}
          checkboxLabelText="デフォルト"
          checked={isDefaultGroupChecked}
          changeMultiFunction={handleSelectGroupsChange}
          changeCheckFunction={handleCheckGroupChange}
        />
        <SearchSelect
          value={jobPositions.selectOption || []}
          labelText="業務種別"
          options={jobPositions.options || []}
          isMulti
          checkboxId={`${id}-business`}
          checkboxLabelText="デフォルト"
          checked={jobPositions.checked}
          changeMultiFunction={jobPositions.changeMultiFunction}
          changeCheckFunction={jobPositions.changeCheckFunction}
        />
        <SearchInput
          id={`${id}-staff-id`}
          text="スタッフID"
          value={staffId.filteredStaffId}
          handleValueOnChange={handleChangeStaffId}
        />
      </FlexWrapperSearch>
    </SearchWrapper>
  );
};

export default SearchGroup;
