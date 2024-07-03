"use client";

import { ReactElement, useState } from "react";
import FlexWrapper from "@/components/atoms/div/wrapper/flexWrapper";
import ContentAreaWrapper from "@/components/atoms/div/wrapper/contentAreaWrapper";
import InputWrapper24 from "@/components/atoms/div/wrapper/inputWrapper24";
import Paragraph from "@/components/atoms/text/paragraph";
import Label from "@/components/atoms/form/label";
import ModalClickableButton from "@/components/atoms/button/modalClickableButton";
import Select from "@/components/atoms/form/select";
import { LabelType } from "@/types/components/atoms/form/LabelType";
import { TextRowGroupType } from "@/types/components/molecules/form/text/TextRowGroupType";
import { ReactSelectOption } from "@/types/reactSelectOptions/ReactSelectOption";

const TextGroupRow = ({ text, options }: TextRowGroupType): ReactElement => {
  const [ contentCount, setContentCount ] = useState<number>(0);

  const handleClick = () => {
    setContentCount(contentCount + 1);
  };

  const options1: ReactSelectOption[] = [
    /* 拠点の選択肢 */
    { value: "A", label: "YPロジ" },
    { value: "B", label: "義鳥" },
    { value: "C", label: "香港" },
  ];
  const options2: ReactSelectOption[] = [
    /* 班の選択肢 */
    { value: "A", label: "A班" },
    { value: "B", label: "B班" },
  ];
  const options3: ReactSelectOption[] = [
    /* 業務種別の選択肢 */
    { value: "A", label: "顧客担当" },
    { value: "B", label: "検品担当" },
    { value: "C", label: "管理者" },
  ];


  const labelProps: LabelType = {
    text: text,
  };

  return (
    <>
      <ContentAreaWrapper>
        <FlexWrapper>
          <Label {...labelProps} />
          <ModalClickableButton color="blue" text="追加" onClick={handleClick} />
        </FlexWrapper>
        <FlexWrapper>
          {options.map(option => (
            <Paragraph key={option} text={option} />
          ))}
        </FlexWrapper>
      </ContentAreaWrapper>
      {Array.from({ length: contentCount }, (_, index) => (
        <ContentAreaWrapper key={index}>
          <FlexWrapper>
            <InputWrapper24>
              <Select options={options1} isMulti={false} />
            </InputWrapper24>
            <InputWrapper24>
              <Select options={options2} isMulti={false} />
            </InputWrapper24>
            <InputWrapper24>
              <Select options={options3} isMulti={false} />
            </InputWrapper24>
          </FlexWrapper>
        </ContentAreaWrapper>
      ))}
    </>

  );
};

export default TextGroupRow;
