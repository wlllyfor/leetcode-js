"use client";

import { ReactElement } from "react";

import SearchInputWrapper from "@/components/atoms/div/wrapper/searchInputWrapper";
import Select from "@/components/atoms/form/select";
import Label from "@/components/atoms/form/label";
import InputGroup24 from "@/components/molecules/form/input/inputGroup24";
import { LabelType } from "@/types/components/atoms/form/LabelType";
import { ProductSelectGroupType } from "@/types/components/molecules/form/select/ProductSelectGroupType";
import InputWrapper56 from "@/components/atoms/div/wrapper/inputWrapper56";
import ModalClickableButton from "@/components/atoms/button/modalClickableButton";
import DeleteButton from "@/components/atoms/button/deleteButton";

const ProductsSelectGroup = ({
  isRequired = false,
  options,
  isMulti,
  formatOptionLabel,
  changeFunction,
  changeMultiFunction,
  value,
}: ProductSelectGroupType): ReactElement => {
  const labelProps: LabelType = {
    text: "内容商品を探す",
    isRequired: isRequired,
  };

  return (
    // <InputWrapper80>
    //   <Label {...labelProps} />
    //   <Select options={options} isMulti={isMulti} {...rest} />
    // </InputWrapper80>
    <div className="w-80 m-auto">
      <Label text="内容商品" isRequired />
      <ModalClickableButton text="追加" color="lightblue" onClick={()=>{}} />
      {/* ↓追加ボタンで増える */}
      <div className="flex gap-2 mt-2 relative">
        <SearchInputWrapper>
          <InputWrapper56>
            <div className="flex items-center gap-2">
              <Label {...labelProps} />
            </div>
            <Select
              options={options}
              isMulti={isMulti}
              changeFunction={changeFunction}
              changeMultiItemFunction={changeMultiFunction}
              value={value}
              formatOptionLabel={formatOptionLabel}
              placeholder="商品名、SKU,バーコード情報（FNSKU、JAN）商品ID"
            />
          </InputWrapper56>
        </SearchInputWrapper>
        <InputGroup24
          id={"amount"}
          text={"数量"}
          value={""}
          // changeFunction={handleOnUnitPriceChange}
        />
        <div className="absolute w-[20px] right-[-30px] top-[20px]">
          <DeleteButton />
        </div>
      </div>
      {/* ↑追加ボタンで増える */}
    </div>
  );
};

export default ProductsSelectGroup;
