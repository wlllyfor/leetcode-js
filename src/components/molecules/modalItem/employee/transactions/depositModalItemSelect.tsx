"use client";

import { ReactElement } from "react";
import FlexWrapperLg from "@/components/atoms/div/wrapper/flexWrapperLg";
import ContentAreaWrapper from "@/components/atoms/div/wrapper/contentAreaWrapper";
import SelectGroup44 from "@/components/molecules/form/select/selectGroup44";
import { ReactSelectOption } from "@/types/reactSelectOptions/ReactSelectOption";

const DepositModalItemSelect = (): ReactElement => {
  const options1: ReactSelectOption[] = [
    /* 入出金種別の選択肢 */
    { value: "A", label: "入金" },
    { value: "B", label: "出金" },
  ];

  return (
    <ContentAreaWrapper>
      <FlexWrapperLg>
        <SelectGroup44 text={"顧客入金種別"} options={options1} isMulti={false} />{" "}
      </FlexWrapperLg>
    </ContentAreaWrapper>
  );
};

export default DepositModalItemSelect;
