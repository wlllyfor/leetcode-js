"use client";

import { ChangeEvent, ReactElement, useEffect, useId, useState } from "react";
import FormButton from "@/components/atoms/button/formButton";
import ModalSm from "@/components/atoms/modal/modalSm";
import ModalTitle from "@/components/atoms/modal/modalTitle";
import ModalCloseButton from "@/components/atoms/modal/modalCloseButton";
import InputGroup80 from "@/components/molecules/form/input/inputGroup80";
import ContentAreaWrapper from "@/components/atoms/div/wrapper/contentAreaWrapper";
import InputDateGroup80 from "@/components/molecules/form/input/inputDateGroup80";
import { useRecoilValue } from "recoil";
import { EmployeeState } from "@/store/Auth/EmployeeState";
import { UUID } from "@/lib/uuid";
import { If, Then } from "react-if";
import Loading from "@/components/molecules/common/loading";
import { TaxDbTableType } from "@/types/db/tax";
import { useUpdate } from "@/hooks/employee/tax/useUpdate";
import { Integer } from "@/lib/integer";

const TaxEditModal = ({ isOpen, handleClose, tax }: {
  isOpen: boolean;
  handleClose: () => void;
  tax: TaxDbTableType;
}): ReactElement => {
  const auth = useRecoilValue(EmployeeState);
  const id = useId();
  const {
    isUpdated, setIsUpdated,
    taxForUpdate, setTaxForUpdate,
    updateTax, isLoading,
    validationErrors, setValidationErrors,
  } = useUpdate();

  const [ isRenderingLoading, setIsRenderingLoading ] = useState<boolean>(false);

  useEffect((): void => {
    if (isOpen && tax) {
      (async (): Promise<void> => {
        setIsRenderingLoading(true);

        // バリデーション初期化
        setValidationErrors(prevState => []);
        setIsUpdated(prevState => false);

        setTaxForUpdate(prevState => {
          return {
            id: tax.id,
            hubName: tax.hub.name,
            name: tax.name,
            rate: tax.rate,
            startedOn: tax.startedOn,
          };
        });

        setIsRenderingLoading(false);
      })();
    }
  }, [ isUpdated, isOpen, setValidationErrors, auth, tax, setIsUpdated, setTaxForUpdate ]);

  useEffect(() => {
    if (isUpdated) {
      handleClose();
    }
  }, [ handleClose, isUpdated ]);

  /**
   * 税率名称変更
   *
   * @param {React.ChangeEvent<HTMLInputElement>} e
   */
  const handleOnChangeName = (e: ChangeEvent<HTMLInputElement>): void => {
    setTaxForUpdate(prevState => {
      return {
        ...prevState,
        name: e.target.value,
      };
    });
  };

  /**
   * 税率変更
   *
   * @param {React.ChangeEvent<HTMLInputElement>} e
   */
  const handleOnChangeRate = (e: ChangeEvent<HTMLInputElement>): void => {
    setTaxForUpdate(prevState => {
      return {
        ...prevState,
        rate: Integer.parseIntExceptZero(e.target.value),
      };
    });
  };

  /**
   * 税率変更
   *
   * @param startedOn
   */
  const handleOnChangeStartedOn = (startedOn: string): void => {
    setTaxForUpdate(prevState => {
      return {
        ...prevState,
        startedOn: startedOn,
      };
    });
  };

  if (isRenderingLoading) {
    return <Loading />;
  }

  return (
    <ModalSm isOpen={isOpen} onRequestClose={handleClose}>
      <ModalTitle text={"拠点別税率登録"} />
      <ContentAreaWrapper>
        <InputGroup80
          id={`${id}-hub_name`} text={"拠点名"} value={taxForUpdate.hubName}
          isReadOnly
        />
      </ContentAreaWrapper>
      <ContentAreaWrapper>
        <InputGroup80
          id={`${id}-name`} text={"名称"} isRequired onChange={handleOnChangeName}
          value={taxForUpdate.name}
        />
      </ContentAreaWrapper>
      <ContentAreaWrapper>
        <InputGroup80
          id={`${id}-rate`} text={"税率"} isRequired type={"number"}
          onChange={handleOnChangeRate}
          value={taxForUpdate.rate?.toString()}
        />
      </ContentAreaWrapper>
      <ContentAreaWrapper>
        <InputDateGroup80
          id={`${id}-started-on`} labelText={"税率開始日"} isCalendar
          onChange={handleOnChangeStartedOn}
        />
      </ContentAreaWrapper>
      <If condition={validationErrors.length > 0}>
        <Then>
          {(validationErrors.map((error, index) => (
            <ContentAreaWrapper key={UUID.generate()}>
              <p className="text-red-500 text-sm">{error}</p>
            </ContentAreaWrapper>
          )))}
        </Then>
      </If>
      <FormButton
        color={"green"} text={"保存する"} onClick={updateTax} disabled={isLoading}
      />
      <ModalCloseButton handleClose={handleClose} />
    </ModalSm>
  );
};

export default TaxEditModal;
