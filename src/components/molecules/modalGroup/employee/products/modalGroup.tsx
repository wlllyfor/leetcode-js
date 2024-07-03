"use client";

import { ReactElement, useId } from "react";
import Link from "next/link";
import FlexWrapper from "@/components/atoms/div/wrapper/flexWrapper";
import InputWrapper24 from "@/components/atoms/div/wrapper/inputWrapper24";
import FormButton from "@/components/atoms/button/formButton";
import ModalDefault from "@/components/atoms/modal/modalDefault";
import ModalTitle from "@/components/atoms/modal/modalTitle";
import ModalCloseButton from "@/components/atoms/modal/modalCloseButton";
import Label from "@/components/atoms/form/label";
import InputGroup80 from "@/components/molecules/form/input/inputGroup80";
import SelectGroup80 from "@/components/molecules/form/select/selectGroup80";
import ContentAreaWrapper from "@/components/atoms/div/wrapper/contentAreaWrapper";
import Input from "@/components/atoms/form/input";
import { ReactSelectOption } from "@/types/reactSelectOptions/ReactSelectOption";
import { ModalGroupType } from "@/types/components/molecules/modalGroup/ModalGroupType";
import { routes } from "@/routes";

const ModalGroup = ({ isOpen, handleClose }: ModalGroupType): ReactElement => {
  const inputId = useId();
  const options1: ReactSelectOption[] = [
    /* 拠点の選択肢 */
    { value: "A", label: "入荷検品済み" },
    { value: "B", label: "出庫済み" },
  ];

  return (
    <ModalDefault isOpen={isOpen} onRequestClose={handleClose}>
      <ModalTitle text={"商品編集"} />
      <ContentAreaWrapper>
        <Label text="サイズ" isRequired={false} />
        <FlexWrapper>
          <InputWrapper24>
            <Input id="size-1" value="" isRequired={false} isDisabled={false} isAutocomplete={true} />
          </InputWrapper24>
          <InputWrapper24>
            <Input id="size-2" value="" isRequired={false} isDisabled={false} isAutocomplete={true} />
          </InputWrapper24>
          <InputWrapper24>
            <Input id="size-3" value="" isRequired={false} isDisabled={false} isAutocomplete={true} />
          </InputWrapper24>
        </FlexWrapper>
      </ContentAreaWrapper>
      <ContentAreaWrapper>
        <InputGroup80 id={`${inputId}-weight`} text={"重量"} value={""} />
      </ContentAreaWrapper>
      <ContentAreaWrapper>
        <SelectGroup80 text="ステータス" isRequired options={options1} />
      </ContentAreaWrapper>
      <FormButton
        color={"green"} text={"保存する"} onClick={() => {
        }}
      />
      <Link href={routes.front.employee.product.index.url} className="block text-center mt-5">
        商品管理へ戻る
      </Link>
      <ModalCloseButton handleClose={handleClose} />
    </ModalDefault>
  );
};

export default ModalGroup;
