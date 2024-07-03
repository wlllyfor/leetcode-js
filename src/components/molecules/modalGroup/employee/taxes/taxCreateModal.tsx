"use client";

import { ChangeEvent, ReactElement, useEffect, useId, useState } from "react";
import FormButton from "@/components/atoms/button/formButton";
import ModalSm from "@/components/atoms/modal/modalSm";
import ModalTitle from "@/components/atoms/modal/modalTitle";
import ModalCloseButton from "@/components/atoms/modal/modalCloseButton";
import { ModalGroupType } from "@/types/components/molecules/modalGroup/ModalGroupType";
import InputGroup80 from "@/components/molecules/form/input/inputGroup80";
import ContentAreaWrapper from "@/components/atoms/div/wrapper/contentAreaWrapper";
import InputDateGroup80 from "@/components/molecules/form/input/inputDateGroup80";
import EmployeeAxios from "@/lib/axios/employee-axios";
import { useRecoilValue } from "recoil";
import { EmployeeState } from "@/store/Auth/EmployeeState";
import { EmployeeDbTableType } from "@/types/db/employee";
import { useStore } from "@/hooks/employee/tax/useStore";
import { UUID } from "@/lib/uuid";
import { If, Then } from "react-if";
import Loading from "@/components/molecules/common/loading";
import { Integer } from "@/lib/integer";

const TaxCreateModal = ({ isOpen, handleClose }: ModalGroupType): ReactElement => {
  const auth = useRecoilValue(EmployeeState);
  const id = useId();
  const {
    isStored, setIsStored,
    taxForPost, setTaxForPost,
    postTax, isLoading,
    validationErrors, setValidationErrors,
  } = useStore();

  const [ authEmployee, setAuthEmployee ] = useState<EmployeeDbTableType | null>(null);
  const [ isRenderingLoading, setIsRenderingLoading ] = useState<boolean>(false);

  useEffect((): void => {
    if (isOpen) {
      (async (): Promise<void> => {
        setIsRenderingLoading(true);

        // 認証情報取得
        EmployeeAxios._setToken(auth);
        const employee = await EmployeeAxios.getMe() as EmployeeDbTableType;
        setAuthEmployee(prevState => employee);

        // バリデーション初期化
        setValidationErrors(prevState => []);
        setIsStored(prevState => false);

        // 今日で初期化
        setTaxForPost(prevState => {
          return {
            ...prevState,
            startedOn: (new Date()).toLocaleDateString(),
          };
        });

        setIsRenderingLoading(false);
      })();
    }
  }, [ isStored, isOpen, setValidationErrors, auth, setIsStored, setTaxForPost ]);

  useEffect(() => {
    if (isStored) {
      handleClose();
    }
  }, [ handleClose, isStored ]);

  /**
   * 税率名称変更
   *
   * @param {React.ChangeEvent<HTMLInputElement>} e
   */
  const handleOnChangeName = (e: ChangeEvent<HTMLInputElement>): void => {
    setTaxForPost(prevState => {
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
    setTaxForPost(prevState => {
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
    setTaxForPost(prevState => {
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
          id={`${id}-hub_name`} text={"拠点名"} value={authEmployee?.currentAccessHub?.name ?? ""}
          isReadOnly
        />
      </ContentAreaWrapper>
      <ContentAreaWrapper>
        <InputGroup80
          id={`${id}-name`} text={"名称"} isRequired onChange={handleOnChangeName}
          value={taxForPost.name}
        />
      </ContentAreaWrapper>
      <ContentAreaWrapper>
        <InputGroup80
          id={`${id}-rate`} text={"税率"} isRequired type={"number"}
          onChange={handleOnChangeRate}
          value={taxForPost.rate?.toString()}
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
        color={"green"} text={"保存する"} onClick={() => {
          postTax();
        }} disabled={isLoading}
      />
      <ModalCloseButton handleClose={handleClose} />
    </ModalSm>
  );
};

export default TaxCreateModal;
