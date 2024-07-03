"use client";

import { ReactElement } from "react";
import FormButton from "@/components/atoms/button/formButton";
import ModalSm from "@/components/atoms/modal/modalSm";
import ModalTitle from "@/components/atoms/modal/modalTitle";
import ModalCloseButton from "@/components/atoms/modal/modalCloseButton";
import { ModalGroupType } from "@/types/components/molecules/modalGroup/ModalGroupType";
import ContentAreaWrapper from "@/components/atoms/div/wrapper/contentAreaWrapper";
import TextOnlyButton from "@/components/atoms/button/textOnlyButton";
import SelectGroup80 from "@/components/molecules/form/select/selectGroup80";
import { ReactSelectOption } from "@/types/reactSelectOptions/ReactSelectOption";

const VariationChangeModal = ({ isOpen, handleClose }: ModalGroupType): ReactElement => {
  const options: ReactSelectOption[] = [
    /* バリエーションの選択肢 */
    { value: "A", label: "黒" },
    { value: "B", label: "赤" },
  ];
  return (
    <ModalSm isOpen={isOpen} onRequestClose={handleClose}>
      <ModalTitle text={"バリエーション変更"} />
      <ContentAreaWrapper>
        <SelectGroup80 text={"バリエーション"} options={options} />
      </ContentAreaWrapper>
      <ContentAreaWrapper>
        <div className="w-fit mx-auto">
          <FormButton color={"green"} text={"保存する"} />
        </div>
      </ContentAreaWrapper>
      <ModalCloseButton handleClose={handleClose} />
      <div className="text-center">
        <TextOnlyButton text={"カートへ戻る"} hasUnderLine clickFunction={handleClose} />
      </div>
    </ModalSm>
  );
};

export default VariationChangeModal;
