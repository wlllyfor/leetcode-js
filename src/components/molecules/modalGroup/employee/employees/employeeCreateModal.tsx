"use client";

import { ChangeEvent, ReactElement, useCallback, useEffect, useId, useState } from "react";
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
import { useRecoilValue } from "recoil";
import { EmployeeState } from "@/store/Auth/EmployeeState";
import { useStore } from "@/hooks/employee/employees/useStore";
import EmployeeAxios from "@/lib/axios/employee-axios";
import Loading from "@/components/molecules/common/loading";
import { If, Then } from "react-if";
import { UUID } from "@/lib/uuid";

export type PostForDetailType = {
  hub_id: number;
  group_id?: number;
  job_position_id: number | undefined;
  employee_status: "enrollment" | "retirement" | "suspension" | undefined;
};

const EmployeeCreateModal = ({ isOpen, handleClose }: ModalGroupType): ReactElement => {
  const inputId = useId();
  const auth = useRecoilValue(EmployeeState);
  const {
    postEmployee,
    employeeForPost,
    setEmployeeForPost,
    isLoading,
    isStored,
    setIsStored,
    validationErrors,
    setValidationErrors,
  } = useStore();

  const [ isRenderingLoading, setIsRenderingLoading ] = useState<boolean>(false);

  useEffect((): void => {
    if (isOpen) {
      (async (): Promise<void> => {
        setIsRenderingLoading(true);

        // 認証情報取得
        EmployeeAxios._setToken(auth);

        // バリデーション初期化
        setValidationErrors(prevState => []);
        setIsStored(prevState => false);

        setEmployeeForPost(prevState => prevState);

        setIsRenderingLoading(false);
      })();
    }
  }, [ isStored, isOpen, setValidationErrors, auth, setIsStored, setEmployeeForPost ]);

  useEffect(() => {
    if (isStored) {
      handleClose();
    }
  }, [ isStored, handleClose ]);

  type InputTextFieldType = "name" | "kana" | "email" | "password";

  /**
   * スタッフマスタ入力イベント
   * @param {ChangeEvent<HTMLInputElement>} e
   * @param {InputTextFieldType} field
   */
  const handleInput = (e: ChangeEvent<HTMLInputElement>, field: InputTextFieldType): void => {
    setEmployeeForPost(prevState => ({
      ...prevState,
      [field]: e.target.value,
    }));
  };

  /**
   * スタッフマスタ 備考入力イベント
   * @param e
   */
  const handleRemarksInput = (e: ChangeEvent<HTMLTextAreaElement>): void => {
    setEmployeeForPost(prevState => ({
      ...prevState,
      public_remarks: e.target.value,
    }));
  };

  /**
   * スタッフマスタ 入社日入力イベント
   * @param {string} value
   */
  const handleJoinedOnInput = useCallback((value: string): void => {
    setEmployeeForPost(prevState => ({
      ...prevState,
      joined_on: value,
    }));
  }, [ setEmployeeForPost ]);

  /**
   * 拠点・班・業務種別入力イベント
   */
  const handleUpdateDetail = useCallback((detail: PostForDetailType, index: number): void => {
    setEmployeeForPost(prevState => {
      const existingDetails = prevState.details ?? [];

      const updatedDetails = existingDetails.map((item, idx) =>
        idx === index ? detail : item);

      if (index >= existingDetails.length) {
        updatedDetails.push(detail);
      }

      return {
        ...prevState,
        details: updatedDetails,
      };
    });
  }, [ setEmployeeForPost ]);

  /**
   * スタッフマスタ入力フォームのアイコン入力イベント
   * @param {ChangeEvent<HTMLInputElement>} e
   */
  const handleFileInput = (e: ChangeEvent<HTMLInputElement>): void => {
    const selectedFile = e.target.files?.[0] ?? null;

    setEmployeeForPost(prev => {
      if (!prev) return prev;
      return {
        ...prev,
        icon: selectedFile,
      };
    });
  };

  if (isRenderingLoading) {
    return <Loading />;
  }

  return (
    <ModalSm isOpen={isOpen} onRequestClose={handleClose}>
      <ModalTitle text={"スタッフマスタ追加"} />
      <ContentAreaWrapper>
        <InputGroup80
          id={`${inputId}-name`}
          text={"名前"}
          value={employeeForPost.name ?? ""}
          onChange={e => handleInput(e, "name")}
        />
      </ContentAreaWrapper>
      <ContentAreaWrapper>
        <InputGroup80
          id={`${inputId}-name-en`}
          text={"名前英語"}
          value={employeeForPost.kana}
          onChange={e => handleInput(e, "kana")}
          isRequired
        />
      </ContentAreaWrapper>
      <ContentAreaWrapper>
        <InputGroup80
          id={`${inputId}-mail`}
          text={"メールアドレス"}
          value={employeeForPost.email} isRequired
          onChange={e => handleInput(e, "email")}
        />
      </ContentAreaWrapper>
      <ContentAreaWrapper>
        <InputGroup80
          id={`${inputId}-password`}
          text={"パスワード"}
          value={employeeForPost.password} isRequired
          onChange={e => handleInput(e, "password")}
        />
      </ContentAreaWrapper>
      <ContentAreaWrapper>
        <TextareaGroup80
          id={`${inputId}-remarks`}
          labelText={"備考"}
          rows={3}
          onChange={handleRemarksInput}
        />
      </ContentAreaWrapper>
      <HubSelectGroup
        // 拠点・班・業務種別などの選択
        changeFunction={handleUpdateDetail}
        details={undefined}
      />
      <ContentAreaWrapper>
        <FileUploadButtonGroup
          inputFileUploadButtonId="a" buttonText="" name="file" labelText=""
          changeFunction={handleFileInput}
        />
      </ContentAreaWrapper>
      <ContentAreaWrapper>
        <InputDateGroup80
          id={`${inputId}-joined-on`}
          labelText={"入社日"}
          isCalendar
          onChange={handleJoinedOnInput}
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
          postEmployee();
        }} disabled={isLoading}
      />
      <ModalCloseButton handleClose={handleClose} />
    </ModalSm>
  );
};

export default EmployeeCreateModal;
