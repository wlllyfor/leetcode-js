"use client";

import { ReactElement, useEffect, useId, useState } from "react";
import FormButton from "@/components/atoms/button/formButton";
import ModalSm from "@/components/atoms/modal/modalSm";
import ModalTitle from "@/components/atoms/modal/modalTitle";
import ModalCloseButton from "@/components/atoms/modal/modalCloseButton";
import { ModalGroupType } from "@/types/components/molecules/modalGroup/ModalGroupType";
import InputGroup80 from "@/components/molecules/form/input/inputGroup80";
import ContentAreaWrapper from "@/components/atoms/div/wrapper/contentAreaWrapper";
import TextOnlyButton from "@/components/atoms/button/textOnlyButton";
import TextButtonWrapper from "@/components/atoms/div/wrapper/textButtonWrapper";
import { useStore } from "@/hooks/employee/bankAccounts/employeeAccount/useStore";
import Loading from "@/components/molecules/common/loading";
import { If, Then } from "react-if";
import { UUID } from "@/lib/uuid";
import { currentAccessHubType } from "@/components/templates/employee/(authenticated)/bankAccounts/template";

type ModalType = ModalGroupType & {
  currentAccessHub: currentAccessHubType;
};

const EmployeeAccountModalGroup = ({ isOpen,handleClose, currentAccessHub }: ModalType): ReactElement => {
  const inputId = useId();
  const {
    postEmployeeAccount,
    employeeAccountForPost,
    setEmployeeAccountForPost,
    isLoading,
    isStored,
    setIsStored,
    validationErrors,
    setValidationErrors,
  } = useStore();

  const [ isRenderingLoading, setIsRenderingLoading ] = useState<boolean>(false);

  useEffect((): void => {
    if(isOpen) {
      setIsRenderingLoading(true);

      setValidationErrors(prevState => []);
      setIsStored(prevState => false);

      setEmployeeAccountForPost(prevState => prevState);

      setIsRenderingLoading(false);
    }
  }, [ isStored,isOpen, setValidationErrors, setIsStored, setEmployeeAccountForPost ]);

  useEffect((): void => {
    if(isStored) {
      handleClose();
    }
  }, [ isStored, handleClose ]);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>): void => {
    if(currentAccessHub && !currentAccessHub?.id) {
      return;
    }
    setEmployeeAccountForPost(prevState => ({ hub_id: currentAccessHub.id, name: e.target.value }));
  };

  if(isRenderingLoading) {
    return <Loading />;
  }

  return (
    <ModalSm isOpen={isOpen} onRequestClose={handleClose}>
      <ModalTitle text={"口座登録"} />
      <ContentAreaWrapper>
        <InputGroup80
          id={`${inputId}-hubs`}
          text={"拠点名"}
          value={currentAccessHub.name ?? ""}
          isReadOnly
          isRequired
        />
      </ContentAreaWrapper>
      <ContentAreaWrapper>
        <InputGroup80
          id={`${inputId}-bank-account`}
          text={"口座入力"}
          isRequired
          value={employeeAccountForPost.name}
          onChange={handleInput}
        />
      </ContentAreaWrapper>
      <If condition={validationErrors.length > 0}>
        <Then>
          {(validationErrors.map(error => (
            <ContentAreaWrapper key={UUID.generate()}>
              <p className="text-red-500 text-sm">{error}</p>
            </ContentAreaWrapper>
          )))}
        </Then>
      </If>
      <FormButton
        color={"green"} text={"保存する"} onClick={() => {
          postEmployeeAccount();
        }} disabled={isLoading || employeeAccountForPost.name === ""}
      />
      <ModalCloseButton handleClose={handleClose} />
      <TextButtonWrapper>
        <TextOnlyButton text={"口座マスタへ戻る"} clickFunction={handleClose} />
      </TextButtonWrapper>
    </ModalSm>
  );
};

export default EmployeeAccountModalGroup;
