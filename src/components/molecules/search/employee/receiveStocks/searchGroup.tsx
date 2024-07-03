"use client";

import { ReactElement, useEffect, useId, useState } from "react";
import SearchWrapper from "@/components/atoms/div/wrapper/searchWrapper";
import SearchInputDate from "@/components/molecules/search/input/searchInputDate";
import SearchInput from "@/components/molecules/search/input/searchInput";
import SearchSelect from "@/components/molecules/search/select/searchSelect";
import FlexWrapperSearch from "@/components/atoms/div/wrapper/flexWrapperSearch";
import { ReactSelectOption } from "@/types/reactSelectOptions/ReactSelectOption";
import { HubDbTableType } from "@/types/db/hub";
import { useReceiveStockSearch } from "@/hooks/employee/receiveStock/useReceiveStockSearch";

interface SearchGroupProps {
  receiveStockStatusOptions: ReactSelectOption[];
  hubsOptions: ReactSelectOption[];
  onChange: (key:string, value: any) => void;
}

const SearchGroup = ({ receiveStockStatusOptions, hubs, onChange}: {
  receiveStockStatusOptions: SearchGroupProps["receiveStockStatusOptions"];
  hubs: HubDbTableType[];
  onChange: SearchGroupProps["onChange"];
}): ReactElement => {


  const [ selectStatusOptions, setSelectStatusOptions ] = useState<ReactSelectOption[]>([]);

  useEffect(() => {
    onChange('receiveStockStatusOptions', selectStatusOptions);
  }, [selectStatusOptions]);

  const [ isDefaultStatusChecked, setIsDefaultStatusChecked ] = useState<boolean>(true);

  const id = useId();

  const [hubsOptions, setHubsOptions] = useState<ReactSelectOption[]>([]);
  const [selectHubsOptions, setSelectHubsOptions] = useState<ReactSelectOption[]>([]);
  useEffect(() => {
    const hubsOptions = hubs.map((hub: { id: any; name: any; }) => ({
      value: hub.id,
      label: hub.name
    }));
    setHubsOptions(hubsOptions);
  }, [hubs]);

  useEffect(() => {
    onChange("hubOptions", selectHubsOptions);
  }, [selectHubsOptions]);

  const handSelectedStatus = (selected: any) => {
    setSelectStatusOptions(selected);
  };

  const handSelectedHubs = (selected: any) => {
    setSelectHubsOptions(selected);
  };

  const handleCheckHubsChange = (checked: any) => {
    setIsDefaultStatusChecked(checked);
  };

  const options2: ReactSelectOption[] = [
    /* 拠点の選択肢 */
    { value: "A", label: "YPロジ" },
    { value: "B", label: "義鳥" },
    { value: "C", label: "香港" },
  ];
  const options3: ReactSelectOption[] = [
    /* 班の選択肢 */
    { value: "A", label: "A班" },
    { value: "B", label: "B班" },
  ];
  const options4: ReactSelectOption[] = [
    /* スタッフの選択肢 */
    { value: "A", label: "田中" },
    { value: "B", label: "鈴木" },
    { value: "C", label: "佐藤" },
  ];
  return (
    <SearchWrapper>
      <FlexWrapperSearch>
        <SearchSelect
         // @ts-ignore
          value={selectStatusOptions} 
          labelText="ステータス" 
          options={receiveStockStatusOptions} 
          isMulti
          checkboxId={`${id}-status`}
          checkboxLabelText="デフォルト" 
          checked={isDefaultStatusChecked}
          changeMultiFunction={handSelectedStatus}
          changeCheckFunction={handleCheckHubsChange}
        />
        <SearchSelect
          value={selectHubsOptions} 
          labelText="拠点" 
          options={hubsOptions} 
          isMulti
          checkboxId={`${id}-payments`}
          checkboxLabelText="デフォルト" 
          checked={false}
          changeMultiFunction={handSelectedHubs}
        />

        <SearchInput id={`${id}-customer-id`} text="顧客ID" value={""} />
        <SearchInput id={`${id}-mall-order-id`} text="モール注文ID" value={""} />
        <SearchInput id={`${id}-tracking-number`} text="追跡番号" value={""} />
      </FlexWrapperSearch>
      <FlexWrapperSearch>
        <SearchSelect
          value={options3} labelText="班" options={options3} isMulti
          checkboxId={`${id}-plan`}
          checkboxLabelText="デフォルト" checked={false}
        />
        <SearchSelect
          value={options4} labelText="スタッフ" options={options4} isMulti
          checkboxId={`${id}-staff`}
          checkboxLabelText="デフォルト" checked={false}
        />
        <SearchInputDate id={`${id}-stock-date`} text="入荷予定日" value={""} />
        <SearchInputDate id={`${id}-in-stock-request`} text="入荷依頼作成日" value={""} />
        <SearchInput id={`${id}-order-id`} text="注文ID" value={""} />
      </FlexWrapperSearch>
    </SearchWrapper>
  );
};

export default SearchGroup;
