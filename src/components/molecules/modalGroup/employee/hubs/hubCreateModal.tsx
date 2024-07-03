"use client";

import { ChangeEvent, ReactElement, useCallback, useEffect, useId, useState } from "react";
import FormButton from "@/components/atoms/button/formButton";
import ModalSm from "@/components/atoms/modal/modalSm";
import ModalTitle from "@/components/atoms/modal/modalTitle";
import ModalCloseButton from "@/components/atoms/modal/modalCloseButton";
import { ModalGroupType } from "@/types/components/molecules/modalGroup/ModalGroupType";
import InputGroup80 from "@/components/molecules/form/input/inputGroup80";
import ContentAreaWrapper from "@/components/atoms/div/wrapper/contentAreaWrapper";
import FileUploadButtonGroup from "@/components/molecules/form/input/fileUploadButtonGroup";
import SelectGroup80 from "@/components/molecules/form/select/selectGroup80";
import InputCheckbox from "@/components/molecules/form/input/inputCheckbox";
import AddGroupItem from "@/components/molecules/modalItem/employee/hubs/addGroupItem";
import InputAddressGroup from "@/components/molecules/form/input/inputAddressGroup";
import { useIndex as useCountriesIndex } from "@/hooks/common/country/useIndex";
import { useIndex as useCurrenciesIndex } from "@/hooks/common/currency/useIndex";
import { useStore } from "@/hooks/employee/hubs/useStore";
import { ReactSelectOption } from "@/types/reactSelectOptions/ReactSelectOption";
import { AddressType } from "@/types/components/common/AddressType";
import { ItemType } from "@/types/components/molecules/modalItem/employee/hubs/ItemType";
import FlexWrapper from "@/components/atoms/div/wrapper/flexWrapper";
import TextOnlyButton from "@/components/atoms/button/textOnlyButton";
import { EmployeeState } from "@/store/Auth/EmployeeState";
import { useRecoilValue } from "recoil";
import EmployeeAxios from "@/lib/axios/employee-axios";
import Loading from "@/components/molecules/common/loading";
import { If, Then } from "react-if";
import { UUID } from "@/lib/uuid";
import TextareaGroup80 from "@/components/molecules/form/textarea/textareaGroup80";

const HubCreateModal = ({ isOpen, handleClose }: ModalGroupType): ReactElement => {
  const auth = useRecoilValue(EmployeeState);
  const inputId = useId();
  const { getCountries, options: countries } = useCountriesIndex();
  const { getCurrencies, options: currencies } = useCurrenciesIndex();
  const {
    isStored, setIsStored,
    hubForPost, setHubForPost,
    postHub, isLoading,
    validationErrors, setValidationErrors,
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

        getCountries();
        getCurrencies();

        setHubForPost(prevState => prevState);

        setIsRenderingLoading(false);
      })();
    }
  }, [ getCountries, getCurrencies, isOpen, setValidationErrors, auth, setIsStored, setHubForPost ]);

  useEffect(() => {
    if (isStored) {
      handleClose();
    }
  }, [ handleClose, isStored ]);

  type InputTextFieldType = "name" | "code" | "company_name" | "invoice_no" | "description";

  /**
   * 拠点マスタ入力フォーム(input type=text)の値をstateにセットする
   * @param {ReactSelectOption} e
   * @param {InputTextFieldType} field
   */
  const handleInput = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>, field: InputTextFieldType): void => {
    setHubForPost(
      prev => ({
        ...prev,
        [field]: e.target.value,
      }),
    );
  };

  /**
   * 拠点マスタ入力フォームのアイコンの値をstateにセットする
   * @param {ChangeEvent<HTMLInputElement>} e
   */
  const handleFileInput = (e: ChangeEvent<HTMLInputElement>): void => {
    const selectedFile = e.target.files ? e.target.files[0] : null;

    setHubForPost(prev => {
      if (!prev) return prev;
      return {
        ...prev,
        icon: selectedFile,
      };
    });
  };

  /**
   * 拠点マスタ入力フォームの領収書（法人名）をstateにセットする
   * @param {ChangeEvent<HTMLTextAreaElement>} e
   */
  const handleReceiptCompanyInput = (e: ChangeEvent<HTMLTextAreaElement>): void => {
    setHubForPost(
      prev => ({
        ...prev,
        company_name: e.target.value,
      }),
    );
  };

  /**
   * 拠点マスタ入力フォームの住所の値をstateにセットする
   * @param {AddressType} address
   */
  const handleAddressInput = useCallback((address: AddressType) => {
    setHubForPost(perv => ({
      ...perv,
      ...address,
    }));
  }, [ setHubForPost ]);

  /**
   * 拠点マスタ入力フォームの国内フォーマットのチェックボックスの値をstateにセットする
   * @param {boolean} isDomestic
   */
  const handleDomesticCheck = useCallback((isDomestic: boolean) => {
    setHubForPost(prev => ({
      ...prev,
      is_domestic: isDomestic,
    }));
  }, [ setHubForPost ]);

  /**
   * 拠点マスタ入力フォームの班の値をstateにセットする
   * @param {ItemType[]} group
   */
  const handleGroupInput = useCallback((group: ItemType[]) => {
    setHubForPost(prev => ({
      ...prev,
      group_names: group.filter(item => item.name !== "").map(item => ({ id: item.id, name: item.name })),
    }));
  }, [ setHubForPost ]);

  /**
   * 拠点マスタ入力フォームの班を削除する
   * @pram {string} id
   */
  const handleGroupDelete = useCallback((id: number): void => {
    setHubForPost(prev => ({
      ...prev,
      group_names: prev.group_names?.filter(item => item.id !== id),
    }));
  }, [ setHubForPost ]);

  /**
   * 拠点マスタ入力フォームから国の値をstateにセットする
   * @param {ReactSelectOption} selectOption
   */
  const handleSelectCountry = (selectOption: ReactSelectOption): void => {
    if (selectOption && typeof selectOption.value === "number") {
      setHubForPost(
        prev => ({
          ...prev,
          country_id: selectOption.value as number,
        }),
      );
    }
  };

  /**
   * 拠点マスタ入力フォームから通貨の値をstateにセットする
   * @param {ReactSelectOption} selectOption
   */
  const handleSelectCurrency = (selectOption: ReactSelectOption): void => {
    if (selectOption && typeof selectOption.value === "number") {
      setHubForPost(
        prev => ({
          ...prev,
          currency_id: selectOption.value as number,
        }),
      );
    }
  };

  /**
   * 拠点マスタ入力フォームから窓口拠点のチェックボックスの値をstateにセットする
   * @param {boolean} checked
   */
  const handleContactHubCheck = useCallback((checked: boolean) => {
    setHubForPost(prev => ({
      ...prev,
      is_contact_hub: checked,
    }));
  }, [ setHubForPost ]);

  if (isRenderingLoading) {
    return <Loading />;
  }

  return (
    <ModalSm isOpen={isOpen} onRequestClose={handleClose}>
      <ModalTitle text={"拠点マスタ追加"} />
      <ContentAreaWrapper>
        <InputGroup80
          id={`${inputId}-hubs`} text={"拠点名"} name={"name"} isRequired
          value={hubForPost.name} onChange={e => handleInput(e, "name")}
        />
      </ContentAreaWrapper>
      <ContentAreaWrapper>
        <FileUploadButtonGroup
          inputFileUploadButtonId="a" buttonText="" name="icon" labelText="拠点アイコン"
          changeFunction={handleFileInput}
        />
      </ContentAreaWrapper>
      <ContentAreaWrapper>
        <InputGroup80
          id={`${inputId}-hubs-code`} text={"拠点コード(半角小文字英数字のみ)"} name={"code"} value={hubForPost.code}
          isRequired onChange={e => handleInput(e, "code")}
        />
      </ContentAreaWrapper>
      <ContentAreaWrapper>
        <SelectGroup80 options={countries} text={"国"} isRequired changeFunction={handleSelectCountry} />
      </ContentAreaWrapper>
      <ContentAreaWrapper>
        <SelectGroup80 options={currencies} text={"通貨"} isRequired changeFunction={handleSelectCurrency} />
      </ContentAreaWrapper>
      <ContentAreaWrapper>
        <AddGroupItem
          id={`${inputId}-hub`} groupAppendFunction={handleGroupInput}
          groupDeleteFunction={handleGroupDelete}
        />
      </ContentAreaWrapper>
      <ContentAreaWrapper>
        <TextareaGroup80
          id={`${inputId}-receipt-company`}
          labelText={"領収書(法人名)"}
          name={"company_name"}
          isRequired
          onChange={e => handleReceiptCompanyInput(e)} value={hubForPost.company_name} rows={3}
        />
      </ContentAreaWrapper>
      <ContentAreaWrapper>
        <InputAddressGroup
          text="領収書(住所)" changeAddressFunction={handleAddressInput}
          changeDomesticFunction={handleDomesticCheck}
        />
      </ContentAreaWrapper>
      <ContentAreaWrapper>
        <InputGroup80
          id={`${inputId}-receipt-invoice`} text={"領収書(インボイス番号)"} name={"invoice_no"}
          value={hubForPost.invoice_no ?? ""}
          onChange={e => handleInput(e, "invoice_no")}
        />
      </ContentAreaWrapper>
      <ContentAreaWrapper>
        <InputGroup80
          id={`${inputId}-proviso`} text={"但し書き"} name={"description"} value={hubForPost.description}
          isRequired onChange={e => handleInput(e, "description")}
        />
      </ContentAreaWrapper>
      <ContentAreaWrapper>
        <InputCheckbox
          id={`${inputId}-counter`} checked text="窓口拠点にする" name={"is_contact_hub"}
          changeFunction={handleContactHubCheck}
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
      <ContentAreaWrapper>
        <FormButton
          color={"green"} text={"保存する"} onClick={() => {
            postHub();
          }} disabled={isLoading}
        />
      </ContentAreaWrapper>
      <ContentAreaWrapper>
        <FormButton
          color={"lightblue"} text={"保存して税率設定を行う"}
          onClick={() => console.log("handleSaveWithTaxRateSetting")} disabled={isLoading}
        />
      </ContentAreaWrapper>
      <ModalCloseButton handleClose={handleClose} />
      <FlexWrapper>
        <TextOnlyButton text={"拠点マスタ管理へ戻る"} hasUnderLine clickFunction={handleClose} />
      </FlexWrapper>
    </ModalSm>
  );
};

export default HubCreateModal;
