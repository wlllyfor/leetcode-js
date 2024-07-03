"use client";

import { ReactElement } from "react";

import SearchInputWrapper from "@/components/atoms/div/wrapper/searchInputWrapper";
import Select from "@/components/atoms/form/select";
import Label from "@/components/atoms/form/label";
import { LabelType } from "@/types/components/atoms/form/LabelType";
import { InspectProductSelectGroupType } from "@/types/components/molecules/form/select/InspectProductSelectGroupType";

const InspectProductsSelectGroup = ({
  isRequired = false,
  options,
  isMulti,
  formatOptionLabel,
  changeFunction,
  changeMultiFunction,
  value,
}: InspectProductSelectGroupType): ReactElement => {
  const labelProps: LabelType = {
    text: "商品を確定",
    isRequired: isRequired,
  };

  return (
    // <InputWrapper80>
    //   <Label {...labelProps} />
    //   <Select options={options} isMulti={isMulti} {...rest} />
    // </InputWrapper80>
    <div className="w-80 m-auto">
      <div className="mt-2 relative">
        <SearchInputWrapper>
          <div className="w-[304px]">
            <Label {...labelProps} />
            <Select
              options={options}
              isMulti={isMulti}
              // changeFunction={changeFunction}
              changeMultiItemFunction={changeMultiFunction}
              value={value}
              formatOptionLabel={formatOptionLabel}
              placeholder="入荷検品する商品を探す"
            />
          </div>
        </SearchInputWrapper>
      </div>
    </div>
  );
};

export default InspectProductsSelectGroup;
