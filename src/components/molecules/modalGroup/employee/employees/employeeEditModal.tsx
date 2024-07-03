"use client";

import { ChangeEvent, ReactElement, useCallback, useEffect, useId, useState } from "react";
import FormButton from "@/components/atoms/button/formButton";
import ModalSm from "@/components/atoms/modal/modalSm";
import ModalTitle from "@/components/atoms/modal/modalTitle";
import ModalCloseButton from "@/components/atoms/modal/modalCloseButton";
import InputGroup80 from "@/components/molecules/form/input/inputGroup80";
import TextareaGroup80 from "@/components/molecules/form/textarea/textareaGroup80";
import ContentAreaWrapper from "@/components/atoms/div/wrapper/contentAreaWrapper";
import InputDateGroup80 from "@/components/molecules/form/input/inputDateGroup80";
import FileUploadButtonGroup from "@/components/molecules/form/input/fileUploadButtonGroup";
import HubSelectGroup from "@/components/molecules/form/select/hubSelectGroup";
import Loading from "@/components/molecules/common/loading";
import { If, Then } from "react-if";
import { UUID } from "@/lib/uuid";
import { EmployeeDbTableType } from "@/types/db/employee";
import { useUpdate } from "@/hooks/employee/employees/useUpdate";

export type PostForDetailType = {
  hub_id: number;
  group_id?: number;
  job_position_id: number | undefined;
  employee_status: "enrollment" | "retirement" | "suspension" | undefined;
};

const EmployeeEditModal = ({ isOpen, handleClose, employee }: {
  isOpen: boolean;
  handleClose: () => void;
  employee: EmployeeDbTableType;
}): ReactElement => {
  const inputId = useId();
  const {
    updateEmployee,
    isLoading,
    isUpdated,
    setIsUpdated,
    employeeForUpdate,
    setEmployeeForUpdate,
    validationErrors,
    setValidationErrors,
  } = useUpdate();

  const [ isRenderingLoading, setIsRenderingLoading ] = useState<boolean>(false);

  useEffect((): void => {
    if (isOpen) {
      (async (): Promise<void> => {
        setIsRenderingLoading(true);

        // バリデーション初期化
        setValidationErrors(prevState => []);
        setIsUpdated(prevState => false);

        setEmployeeForUpdate(prevState => {
          return {
            id: employee.id,
            name: employee.name,
            kana: employee.nameKana ?? "",
            email: employee.email,
            public_remarks: employee.publicRemarks,
            icon: null,
            joined_on: employee.joinedOn,
            details: employee.employeeHubs.map(detail => {
              return {
                hub_id: detail.hubId,
                group_id: detail.groupId,
                job_position_id: detail.jobPositionId,
                employee_status: detail.employeeStatus as "enrollment" | "retirement" | "suspension",
              };
            }),
          };
        });

        setIsRenderingLoading(false);
      })();
    }
  }, [ isUpdated, isOpen, setValidationErrors, setIsUpdated, setEmployeeForUpdate, employee ]);

  useEffect(() => {
    if (isUpdated) {
      handleClose();
    }
  }, [ isUpdated, handleClose ]);

  type InputTextFieldType = "name" | "kana" | "email" | "password";

  /**
   * スタッフマスタ入力イベント
   * @param {ChangeEvent<HTMLInputElement>} e
   * @param {InputTextFieldType} field
   */
  const handleInput = (e: ChangeEvent<HTMLInputElement>, field: InputTextFieldType): void => {
    setEmployeeForUpdate(prevState => ({
      ...prevState,
      [field]: e.target.value,
    }));
  };

  /**
   * スタッフマスタ 備考入力イベント
   * @param e
   */
  const handleRemarksInput = (e: ChangeEvent<HTMLTextAreaElement>): void => {
    setEmployeeForUpdate(prevState => ({
      ...prevState,
      public_remarks: e.target.value,
    }));
  };

  /**
   * スタッフマスタ 入社日入力イベント
   * @param {string} value
   */
  const handleJoinedOnInput = useCallback((value: string): void => {
    setEmployeeForUpdate(prevState => ({
      ...prevState,
      joined_on: value,
    }));
  }, [ setEmployeeForUpdate ]);

  /**
   * 拠点・班・業務種別入力イベント
   */
  const handleUpdateDetail = useCallback((detail: PostForDetailType, index: number): void => {
    setEmployeeForUpdate(prevState => {
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
  }, [ setEmployeeForUpdate ]);

  /**
   * スタッフマスタ入力フォームのアイコン入力イベント
   * @param {ChangeEvent<HTMLInputElement>} e
   */
  const handleFileInput = (e: ChangeEvent<HTMLInputElement>): void => {
    const selectedFile = e.target.files?.[0] ?? null;

    setEmployeeForUpdate(prev => {
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
      <ModalTitle text={"スタッフマスタ編集"} />
      <ContentAreaWrapper>
        <InputGroup80
          id={`${inputId}-name`}
          text={"名前"}
          value={employeeForUpdate.name ?? ""}
          onChange={e => handleInput(e, "name")}
        />
      </ContentAreaWrapper>
      <ContentAreaWrapper>
        <InputGroup80
          id={`${inputId}-name-en`}
          text={"名前英語"}
          value={employeeForUpdate.kana}
          onChange={e => handleInput(e, "kana")}
          isRequired
        />
      </ContentAreaWrapper>
      <ContentAreaWrapper>
        <InputGroup80
          id={`${inputId}-mail`}
          text={"メールアドレス"}
          value={employeeForUpdate.email} isRequired
          onChange={e => handleInput(e, "email")}
        />
      </ContentAreaWrapper>
      <ContentAreaWrapper>
        <InputGroup80
          id={`${inputId}-password`}
          text={"パスワード"}
          value={"設定済み"} isReadOnly
        />
      </ContentAreaWrapper>
      <ContentAreaWrapper>
        <TextareaGroup80
          id={`${inputId}-remarks`}
          labelText={"備考"}
          rows={3}
          onChange={handleRemarksInput}
          value={employeeForUpdate.public_remarks ?? ""}
        />
      </ContentAreaWrapper>
      <HubSelectGroup
        // 拠点・班・業務種別などの選択
        changeFunction={handleUpdateDetail}
        details={employeeForUpdate.details}
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
          value={employee.joinedOn}
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
          updateEmployee();
        }} disabled={isLoading}
      />
      <ModalCloseButton handleClose={handleClose} />
    </ModalSm>
  );
};

export default EmployeeEditModal;
