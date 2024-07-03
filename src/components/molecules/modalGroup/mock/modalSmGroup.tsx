"use client";

import { ReactElement, useId } from "react";
import FormButton from "@/components/atoms/button/formButton";
import ModalSm from "@/components/atoms/modal/modalSm";
import ModalTitle from "@/components/atoms/modal/modalTitle";
import ModalCloseButton from "@/components/atoms/modal/modalCloseButton";
import { ModalGroupType } from "@/types/components/molecules/modalGroup/ModalGroupType";
import InputGroup80 from "@/components/molecules/form/input/inputGroup80";
import TextareaGroup80 from "@/components/molecules/form/textarea/textareaGroup80";
import ContentAreaWrapper from "@/components/atoms/div/wrapper/contentAreaWrapper";
import InputDateGroup80 from "@/components/molecules/form/input/inputDateGroup80";
import FileUploadButtonGroup from "@/components/molecules/form/input/fileUploadButtonGroup";
import HubSelectGroup from "@/components/molecules/form/select/hubSelectGroup";
import { PostForDetailType } from "@/components/molecules/modalGroup/employee/employees/employeeCreateModal";

const ModalSmGroup = ({ isOpen, handleClose }: ModalGroupType): ReactElement => {
  const inputId = useId();
  return (
    <ModalSm isOpen={isOpen} onRequestClose={handleClose}>
      <ModalTitle text={"スタッフマスタ追加"} />
      <ContentAreaWrapper>
        <InputGroup80 id={`${inputId}-name`} text={"名前"} value={""} />
      </ContentAreaWrapper>
      <ContentAreaWrapper>
        <InputGroup80 id={`${inputId}-name-en`} text={"名前英語"} value={""} />
      </ContentAreaWrapper>
      <ContentAreaWrapper>
        <InputGroup80 id={`${inputId}-mail`} text={"メールアドレス"} value={""} isRequired />
      </ContentAreaWrapper>
      <ContentAreaWrapper>
        <InputGroup80 id={`${inputId}-password`} text={"パスワード"} value={""} isRequired />
      </ContentAreaWrapper>
      <ContentAreaWrapper>
        <TextareaGroup80 id={`${inputId}-remarks`} labelText={"備考"} rows={3} />
      </ContentAreaWrapper>
      <HubSelectGroup
        changeFunction={(detail: PostForDetailType, index: number) => {
        }} details={undefined}
      />
      <ContentAreaWrapper>
        <FileUploadButtonGroup inputFileUploadButtonId="a" buttonText="" name="file" labelText="写真" />
      </ContentAreaWrapper>
      <ContentAreaWrapper>
        <InputDateGroup80 id={`${inputId}-hire-date`} labelText={"入社日"} isCalendar />
      </ContentAreaWrapper>
      <FormButton
        color={"green"} text={"保存する"} onClick={() => {
        }}
      />
      <ModalCloseButton handleClose={handleClose} />
    </ModalSm>
  );
};

export default ModalSmGroup;
