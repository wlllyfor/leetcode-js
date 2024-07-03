"use client";

import { ReactElement, useEffect, useState } from "react";
import FormButton from "@/components/atoms/button/formButton";
import ModalSm from "@/components/atoms/modal/modalSm";
import ModalTitle from "@/components/atoms/modal/modalTitle";
import ModalCloseButton from "@/components/atoms/modal/modalCloseButton";
import ContentAreaWrapper from "@/components/atoms/div/wrapper/contentAreaWrapper";
import TextOnlyButton from "@/components/atoms/button/textOnlyButton";
import Paragraph from "@/components/atoms/text/paragraph";
import { TaxDbTableType } from "@/types/db/tax";
import { useDestroy } from "@/hooks/employee/tax/useDestroy";
import { useRecoilValue } from "recoil";
import { EmployeeState } from "@/store/Auth/EmployeeState";
import Loading from "@/components/molecules/common/loading";
import { If, Then } from "react-if";
import { UUID } from "@/lib/uuid";

const TaxDeleteModal = ({ isOpen, handleClose, tax }: {
  isOpen: boolean;
  handleClose: () => void;
  tax: TaxDbTableType;
}): ReactElement => {
  const auth = useRecoilValue(EmployeeState);
  const {
    isDestroyed, setIsDestroyed,
    setTaxForDestroy,
    destroyTax, isLoading,
    validationErrors, setValidationErrors,
  } = useDestroy();
  const [ isRenderingLoading, setIsRenderingLoading ] = useState<boolean>(false);

  useEffect((): void => {
    if (isOpen && tax) {
      (async (): Promise<void> => {
        setIsRenderingLoading(true);

        // バリデーション初期化
        setValidationErrors(prevState => []);
        setIsDestroyed(prevState => false);

        setTaxForDestroy(prevState => {
          return {
            id: tax.id,
          };
        });

        setIsRenderingLoading(false);
      })();
    }
  }, [ isDestroyed, isOpen, setValidationErrors, auth, tax, setIsDestroyed, setTaxForDestroy ]);

  useEffect(() => {
    if (isDestroyed) {
      handleClose();
    }
  }, [ handleClose, isDestroyed ]);

  if (isRenderingLoading) {
    return <Loading />;
  }

  return (
    <ModalSm isOpen={isOpen} onRequestClose={handleClose}>
      <ModalTitle text={"拠点マスタ削除"} />
      <div className="my-4">
        <Paragraph fontSize="13px">
          税率マスタから削除します。問題ないか確認のうえ、削除する場合は以下のボタンを押してください。
        </Paragraph>
      </div>
      <If condition={validationErrors.length > 0}>
        <Then>
          {(validationErrors.map((error, index) => (
            <ContentAreaWrapper key={UUID.generate()}>
              <p className="text-red-500 text-sm">{error}</p>
            </ContentAreaWrapper>
          )))}
        </Then>
      </If>
      <ContentAreaWrapper>
        <FormButton
          color={"red"}
          text={"削除する"}
          onClick={destroyTax}
          disabled={isLoading}
        />
      </ContentAreaWrapper>
      <ModalCloseButton handleClose={handleClose} />
      <div className="text-center">
        <TextOnlyButton text={"拠点マスタ管理へ戻る"} hasUnderLine clickFunction={handleClose} />
      </div>
    </ModalSm>
  );
};

export default TaxDeleteModal;
