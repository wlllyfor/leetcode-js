"use client";

import { ReactElement, useId } from "react";
import FormButton from "@/components/atoms/button/formButton";
import ModalSm from "@/components/atoms/modal/modalSm";
import ModalTitle from "@/components/atoms/modal/modalTitle";
import ModalCloseButton from "@/components/atoms/modal/modalCloseButton";
import ContentAreaWrapper from "@/components/atoms/div/wrapper/contentAreaWrapper";
import InputGroup80 from "@/components/molecules/form/input/inputGroup80";
import AddressGroup from "@/components/molecules/form/input/addressGroup";
import TextAndLabel24 from "@/components/molecules/form/text/textAndLabel24";
import SelectGroup24Row from "@/components/molecules/form/select/selectGroup24Row";
import TextGroupRow from "@/components/molecules/form/text/textGroupRow";
import TextAndCheckboxGroupRow from "@/components/molecules/form/text/textAndChecboxGroupRow";
import FileUploadIconTextareaGroup from "@/components/molecules/form/textarea/fileUploadIconTextareaGroup";
import { ModalGroupType } from "@/types/components/molecules/modalGroup/ModalGroupType";

const ModalGroup = ({ isOpen, handleClose }: ModalGroupType): ReactElement => {
  const inputId = useId();
  const groupOption1 = [ "義鳥", "YPロジ", "バンコク" ];
  const groupOptions2 = [
    [
      { value: "A", label: "A班" },
      { value: "B", label: "B班" },
      { value: "C", label: "C班" },
    ],
    [
      { value: "A", label: "A班" },
      { value: "B", label: "B班" },
      { value: "C", label: "C班" },
    ],
    [
      { value: "A", label: "A班" },
      { value: "B", label: "B班" },
      { value: "C", label: "C班" },
    ],
  ];
  const groupOptions3 = [
    [
      { value: "A", label: "名前" },
      { value: "B", label: "名前" },
      { value: "C", label: "名前" },
    ],
    [
      { value: "A", label: "名前" },
      { value: "B", label: "名前" },
      { value: "C", label: "名前" },
    ],
    [
      { value: "A", label: "名前" },
      { value: "B", label: "名前" },
      { value: "C", label: "名前" },
    ],
  ];
  const groupOptions4 = [
    { paragraph: "GOLD", id: "plan-1", checked: false },
    { paragraph: "FREE", id: "plan-2", checked: false },
    { paragraph: "GOLD", id: "plan-3", checked: false },
  ];
  const groupOptions5 = [
    [
      { value: "A", label: "10909200" },
      { value: "B", label: "10909200" },
      { value: "C", label: "10909200" },
    ],
    [
      { value: "A", label: "10909200" },
      { value: "B", label: "10909200" },
      { value: "C", label: "10909200" },
    ],
    [
      { value: "A", label: "10909200" },
      { value: "B", label: "10909200" },
      { value: "C", label: "10909200" },
    ],
  ];
  const groupOptions6 = [
    [
      { value: "A", label: "利用中" },
      { value: "B", label: "退会" },
      { value: "C", label: "休会" },
      { value: "C", label: "決済エラー" },
    ],
    [
      { value: "A", label: "利用中" },
      { value: "B", label: "退会" },
      { value: "C", label: "休会" },
      { value: "C", label: "決済エラー" },
    ],
    [
      { value: "A", label: "利用中" },
      { value: "B", label: "退会" },
      { value: "C", label: "休会" },
      { value: "C", label: "決済エラー" },
    ],
  ];
  return (
    <ModalSm isOpen={isOpen} onRequestClose={handleClose}>
      <ModalTitle text={"顧客情報編集"} />
      <ContentAreaWrapper>
        <InputGroup80 id={`${inputId}-customer-name`} text={"顧客名"} value={""} isRequired />
      </ContentAreaWrapper>
      <ContentAreaWrapper>
        <InputGroup80 id={`${inputId}-customer-name-kana`} text={"顧客名(ローマ字)"} value={""} />
      </ContentAreaWrapper>
      <ContentAreaWrapper>
        <InputGroup80 id={`${inputId}-company`} text={"会社名"} value={""} />
      </ContentAreaWrapper>
      <ContentAreaWrapper>
        <TextAndLabel24 labelText={"専用口座"} paragraphText={"000000000"} isRequired />
      </ContentAreaWrapper>
      <ContentAreaWrapper>
        <TextAndLabel24 labelText={"銀行名"} paragraphText={"三井住友銀行"} isRequired />
      </ContentAreaWrapper>
      <ContentAreaWrapper>
        <TextAndLabel24 labelText={"支店名"} paragraphText={"第一支店"} isRequired />
      </ContentAreaWrapper>
      <ContentAreaWrapper>
        <TextGroupRow text={"拠点"} options={groupOption1} />
      </ContentAreaWrapper>
      <ContentAreaWrapper>
        <SelectGroup24Row text="班" options={groupOptions2} />
      </ContentAreaWrapper>
      <ContentAreaWrapper>
        <SelectGroup24Row text="担当者" options={groupOptions3} />
      </ContentAreaWrapper>
      <ContentAreaWrapper>
        <TextAndCheckboxGroupRow text={"プラン"} options={groupOptions4} />
      </ContentAreaWrapper>
      <ContentAreaWrapper>
        <SelectGroup24Row text="ChatWorkgroupID" options={groupOptions5} isRequired />
      </ContentAreaWrapper>
      <ContentAreaWrapper>
        <SelectGroup24Row text="会員ステータス" options={groupOptions6} isRequired />
      </ContentAreaWrapper>
      <ContentAreaWrapper>
        <InputGroup80 id={`${inputId}-chatworkid`} text={"chatWorkID"} value={""} isRequired />
      </ContentAreaWrapper>
      <ContentAreaWrapper>
        <TextAndLabel24 labelText={"メールアドレス"} paragraphText={"text@text.com"} />
      </ContentAreaWrapper>
      <AddressGroup
        title={"顧客住所"} options={[]} changeAddressFunction={() => {
        }}
      />
      <ContentAreaWrapper>
        <FileUploadIconTextareaGroup
          textareaId={""} inputFileUploadIconId={"file"} labelText={"管理メモ"} rows={3}
          value={""}
        />
      </ContentAreaWrapper>
      <FormButton
        color={"green"} text={"編集する"} onClick={() => {
        }}
      />
      <ModalCloseButton handleClose={handleClose} />
    </ModalSm>
  );
};

export default ModalGroup;
