import { ReactElement, useEffect, useId, useState } from "react";
import ReactSelect from "react-select";
import { ReactSelectOption } from "@/types/reactSelectOptions/ReactSelectOption";
import { MenuSelectType } from "@/types/components/atoms/form/MenuSelectType";
import { useIndex as useHubIndex } from "@/hooks/common/hub/useIndex";

const MenuSelect = ({ isCustomer, defaultSelectValue }: MenuSelectType): ReactElement => {
  const { getHubs, options: hubOptions } = useHubIndex();
  const [ selectedOption, setSelectedOption ] = useState<ReactSelectOption>();


  const formatOptionLabel = ({ label, image }: ReactSelectOption) => (
    <div className="flex text-white w-[148px]">
      {label}
      <img src={image} alt={label} className="ml-1" />
    </div>
  );

  const id = useId();

  useEffect(():void => {
    (async(): Promise<void> => {
      getHubs();
    })();
  }, [ getHubs ]);

  useEffect((): void => {
    if (hubOptions === null) {
      return;
    }

    const defaultOption = hubOptions.find((option: ReactSelectOption) => option.value === defaultSelectValue);
    if(defaultOption) {
      setSelectedOption(prevState => defaultOption);
    }
  }, [ hubOptions, defaultSelectValue ]);

  const handleSelectChange = (hubOption: ReactSelectOption | null): void => {
    if(hubOption === null) { return; }
    setSelectedOption(prevState => hubOption);
  };

  return (
    <ReactSelect
      id={id}
      onChange={hub => handleSelectChange(hub)}
      instanceId={`${id}-menu-select`}
      options={hubOptions}
      formatOptionLabel={formatOptionLabel}
      value={selectedOption}
      styles={{
        control: provided => ({
          ...provided,
          backgroundColor: isCustomer ? "#323673" : "#343434",
          color: "#FFF",
          border: "none",
          fontSize: "12px",
        }),
        option: (provided, state) => ({
          ...provided,
          backgroundColor: state.isSelected ? (isCustomer ? "#323673" : "#6B6DA6") : (isCustomer ? "#323673" : "#343434"),
          color: "#FFF",
        }),
        menu: provided => ({
          ...provided,
          backgroundColor: isCustomer ? "#323673" : "#343434",
        }),
      }}
      components={{
        IndicatorSeparator: () => null,
      }}
    />
  );
};

export default MenuSelect;
