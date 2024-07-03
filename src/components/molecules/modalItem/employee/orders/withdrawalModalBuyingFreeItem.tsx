"use client";

import { ReactElement, useId } from "react";
import FlexWrapperLg from "@/components/atoms/div/wrapper/flexWrapperLg";
import InputRadio from "@/components/molecules/form/input/inputRadio";
import FlexWrapperColumnStart from "@/components/atoms/div/wrapper/flexWrapperColumnStart";
import ContentAreaWrapper from "@/components/atoms/div/wrapper/contentAreaWrapper";
import InputGroup44 from "@/components/molecules/form/input/inputGroup44";
import TextAndLabel24 from "@/components/molecules/form/text/textAndLabel24";
import SelectGroup44 from "@/components/molecules/form/select/selectGroup44";
import FileUploadIconTextareaGroup from "@/components/molecules/form/textarea/fileUploadIconTextareaGroup";

import { ReactSelectOption } from "@/types/reactSelectOptions/ReactSelectOption";

const WithdrawalModalBuyingFreeItem = (): ReactElement => {
  const inputId = useId();
  const options1: ReactSelectOption[] = [
    /* 科目の選択肢 */
    { value: "A", label: "送料" },
    { value: "B", label: "売上" },
    { value: "C", label: "返金" },
  ];
  return (
    <>
      <ContentAreaWrapper>
        <FlexWrapperLg>
          <div className="min-w-[218px]">
            <TextAndLabel24 labelText={"買付手数料n%"} paragraphText={""} />
          </div>
          <TextAndLabel24 labelText={"合計"} paragraphText={"1000"} />
          <div className="w-44">
            <FlexWrapperColumnStart>
              <InputRadio
                name="radioGroup"
                fontSize={"14px"}
                options={[
                  { id: "account", text: "口座仕訳" },
                  { id: "sales", text: "売上" },
                ]}
              />
            </FlexWrapperColumnStart>
          </div>
          <SelectGroup44 text={"科目"} options={options1} isMulti={false} />
          <InputGroup44 id={`${inputId}-contents`} text={"内容"} value={""} />
          <FileUploadIconTextareaGroup
            textareaId={`${inputId}-file`} inputFileUploadIconId={"file"}
            labelText={"管理メモ"} rows={3} value={""}
          />
        </FlexWrapperLg>
      </ContentAreaWrapper>
    </>
  );
};

export default WithdrawalModalBuyingFreeItem;
