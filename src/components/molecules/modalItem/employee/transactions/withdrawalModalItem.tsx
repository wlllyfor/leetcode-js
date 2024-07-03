"use client";

import { ReactElement, useId } from "react";
import FlexWrapperLg from "@/components/atoms/div/wrapper/flexWrapperLg";
import FlexWrapperColumnStart from "@/components/atoms/div/wrapper/flexWrapperColumnStart";
import ContentAreaWrapper from "@/components/atoms/div/wrapper/contentAreaWrapper";
import InputGroup44 from "@/components/molecules/form/input/inputGroup44";
import SelectGroup44 from "@/components/molecules/form/select/selectGroup44";
import TextAndLabel24 from "@/components/molecules/form/text/textAndLabel24";
import FileUploadIconTextareaGroup from "@/components/molecules/form/textarea/fileUploadIconTextareaGroup";
import CheckboxInputGroup from "@/components/molecules/form/input/checkboxInputGroup";
import CheckboxSelectGroup from "@/components/molecules/form/select/checkboxSelectGroup";
import NormalClickableButton from "@/components/atoms/button/normalClickableButton";
import InputRadio from "@/components/molecules/form/input/inputRadio";
import { ModalItemHeaderType } from "@/types/components/molecules/modalItem/ModalItemHeaderType";
import { ReactSelectOption } from "@/types/reactSelectOptions/ReactSelectOption";

const WithdrawalModalItem = ({ isFirst, handleAddItem }: ModalItemHeaderType): ReactElement => {
  const inputId = useId();
  // const options1: ReactSelectOption[] = [
  //   /* 入出金種別の選択肢 */
  //   { value: "A", label: "入金" },
  const options2: ReactSelectOption[] = [
    /* 口座の選択肢 */
    { value: "A", label: "ABC銀行" },
    { value: "B", label: "○○銀行" },
    { value: "C", label: "××銀行" },
  ];
  const options3: ReactSelectOption[] = [
    /* 口座入出金種別の選択肢 */
    { value: "A", label: "普通" },
    { value: "B", label: "当座" },
  ];
  const options4: ReactSelectOption[] = [
    /* 科目の選択肢 */
    { value: "A", label: "送料" },
    { value: "B", label: "売上" },
    { value: "C", label: "返金" },
  ];
  const options5: ReactSelectOption[] = [
    /* 取引先の選択肢 */
    { value: "A", label: "佐川急便" },
    { value: "B", label: "クロネコヤマト" },
  ];
  return (
    <>
      {isFirst && (
        <ContentAreaWrapper>
          <FlexWrapperLg>
            <NormalClickableButton text={"明細追加"} color={"lightblue"} onClick={handleAddItem} />
          </FlexWrapperLg>
        </ContentAreaWrapper>
      )}
      <ContentAreaWrapper>
        <FlexWrapperLg>
          <CheckboxInputGroup
            isRequired={true}
            value={""}
            text={"金額"}
            id={`${inputId}-amount`}
            checkboxLabelText={"金額税込み計算をする (10%)"}
            checked={true}
            isDisabled={false}
            isAutocomplete={false}
            isReadOnly={false}
          />
          <TextAndLabel24 labelText={"合計"} paragraphText={"4000"} />
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
          <CheckboxSelectGroup
            isRequired={true}
            text={"口座"}
            id={`${inputId}-bank-account`}
            checkboxLabelText={"デフォルトにする"}
            checked={false}
            options={options2}
            isMulti={false}
          />
          <SelectGroup44 text={"口座入出金種別"} options={options3} isMulti={false} isRequired />
          <SelectGroup44 text={"科目"} options={options4} isMulti={false} />
          <InputGroup44 id={`${inputId}-contents`} text={"内容"} value={""} />
          <SelectGroup44 text={"取引先"} options={options5} isMulti={false} />
          <FileUploadIconTextareaGroup
            textareaId={`${inputId}-file`} inputFileUploadIconId={"file"}
            labelText={"管理メモ"} rows={3} value={""}
          />
        </FlexWrapperLg>
      </ContentAreaWrapper>
    </>
  );
};

export default WithdrawalModalItem;
