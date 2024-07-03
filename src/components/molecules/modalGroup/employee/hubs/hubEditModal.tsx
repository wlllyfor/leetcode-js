"use client";

import { ChangeEvent, ReactElement, useCallback, useEffect, useId, useState } from "react";
import FormButton from "@/components/atoms/button/formButton";
import ModalSm from "@/components/atoms/modal/modalSm";
import ModalTitle from "@/components/atoms/modal/modalTitle";
import ModalCloseButton from "@/components/atoms/modal/modalCloseButton";
import InputGroup80 from "@/components/molecules/form/input/inputGroup80";
import ContentAreaWrapper from "@/components/atoms/div/wrapper/contentAreaWrapper";
import FileUploadButtonGroup from "@/components/molecules/form/input/fileUploadButtonGroup";
import SelectGroup80 from "@/components/molecules/form/select/selectGroup80";
import InputCheckbox from "@/components/molecules/form/input/inputCheckbox";
import AddGroupItem from "@/components/molecules/modalItem/employee/hubs/addGroupItem";
import InputAddressGroup from "@/components/molecules/form/input/inputAddressGroup";
import { useIndex as useCountriesIndex } from "@/hooks/common/country/useIndex";
import { useIndex as useCurrenciesIndex } from "@/hooks/common/currency/useIndex";
import { useUpdate } from "@/hooks/employee/hubs/useUpdate";
import { ReactSelectOption } from "@/types/reactSelectOptions/ReactSelectOption";
import { AddressType } from "@/types/components/common/AddressType";
import { ItemType } from "@/types/components/molecules/modalItem/employee/hubs/ItemType";
import TextOnlyButton from "@/components/atoms/button/textOnlyButton";
import FlexWrapper from "@/components/atoms/div/wrapper/flexWrapper";
import { GroupDbTableType } from "@/types/db/group";
import TextareaGroup80 from "@/components/molecules/form/textarea/textareaGroup80";
import { HubDbTableType } from "@/types/db/hub";
import Loading from "@/components/molecules/common/loading";
import { EmployeeState } from "@/store/Auth/EmployeeState";
import { useRecoilValue } from "recoil";
import { If, Then } from "react-if";
import { UUID } from "@/lib/uuid";

const HubEditModal = ({ isOpen, handleClose, hub }: {
  isOpen: boolean;
  handleClose: () => void;
  hub: HubDbTableType;
}): ReactElement => {
  const auth = useRecoilValue(EmployeeState);
  const inputId = useId();
  const { getCountries, options: countries } = useCountriesIndex();
  const { getCurrencies, options: currencies } = useCurrenciesIndex();
  const {
    updateHub, hubForUpdate,
    setHubForUpdate, isLoading,
    isUpdated, setIsUpdated,
    validationErrors, setValidationErrors,
  } = useUpdate();

  const [ isRenderingLoading, setIsRenderingLoading ] = useState<boolean>(false);

  useEffect((): void => {
    if (isOpen && hub) {
      (async (): Promise<void> => {
        setIsRenderingLoading(true);

        // バリデーション初期化
        setValidationErrors(prevState => []);
        setIsUpdated(prevState => false);

        getCountries();
        getCurrencies();

        setHubForUpdate(prevState => {
          return {
            id: hub.id,
            name: hub.name,
            code: hub.code,
            country_id: hub.countryId,
            currency_id: hub.currencyId,
            group_names: convertGroup(hub.groups),
            delete_group_id_list: [],
            company_name: hub.companyName ?? "",
            is_domestic: hub.isDomestic === 1,
            postal_code: hub.postalCode ?? "",
            prefecture_name: hub.prefectureName ?? "",
            city_name: hub.cityName ?? "",
            town_name: hub.townName ?? "",
            building_name: hub.buildingName ?? "",
            description: hub.description ?? "",
            is_contact_hub: hub.forContact,
            invoice_no: hub.invoiceNo ?? "",
          };
        });

        setIsRenderingLoading(false);
      })();
    }
  }, [ getCountries, getCurrencies, isUpdated, isOpen, setValidationErrors, hub, setIsUpdated, setHubForUpdate, auth ]);

  useEffect(() => {
    if (isUpdated) {
      handleClose();
    }
  }, [ handleClose, isUpdated ]);

  const convertGroup = (groups: Pick<GroupDbTableType, "id" | "name">[] | undefined): ItemType[] => {
    return groups?.map(group => ({ id: group.id, name: group.name })) || [];
  };

  type InputTextFieldType = "name" | "code" | "company_name" | "invoice_no" | "description";

  /**
   * 拠点マスタ入力フォーム(input type=text)の値をstateにセットする
   * @param {ReactSelectOption} e
   * @param {InputTextFieldType} field
   */
  const handleInput = (e: ChangeEvent<HTMLInputElement>, field: InputTextFieldType): void => {
    setHubForUpdate(prev => ({
      ...prev,
      [field]: e.target.value,
    }));
  };

  /**
   * 拠点マスタ入力フォームのアイコンの値をstateにセットする
   * @param {ChangeEvent<HTMLInputElement>} e
   */
  const handleFileInput = (e: ChangeEvent<HTMLInputElement>): void => {
    const selectedFile = e.target.files ? e.target.files[0] : null;

    setHubForUpdate(prev => {
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
    setHubForUpdate(
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
  const handleAddressInput = useCallback(
    (address: AddressType) => {
      setHubForUpdate(perv => ({
        ...perv,
        ...address,
      }));
    },
    [ setHubForUpdate ],
  );

  /**
   * 拠点マスタ入力フォームの国内フォーマットのチェックボックスの値をstateにセットする
   * @param {boolean} isDomestic
   */
  const handleDomesticCheck = useCallback(
    (isDomestic: boolean) => {
      setHubForUpdate(prev => ({
        ...prev,
        is_domestic: isDomestic,
      }));
    },
    [ setHubForUpdate ],
  );

  /**
   * 拠点マスタ入力フォームの班の値をstateにセットする
   * @param {ItemType[]} group
   */
  const handleGroupInput = useCallback(
    (group: ItemType[]) => {
      setHubForUpdate(prev => ({
        ...prev,
        group_names: group.filter(item => item.name !== "").map(item => ({ id: item.id, name: item.name })),
      }));
    },
    [ setHubForUpdate ],
  );

  /**
   * 拠点マスタ入力フォームの班の削除ボタンを押した時の処理
   * group_namesには値を残して、delete_group_id_listに削除する班のidを追加する
   * @param {number} id
   */
  const handleGroupDelete = useCallback(
    (id: number) => {
      setHubForUpdate(prev => ({
        ...prev,
        delete_group_id_list: [ ...(prev?.delete_group_id_list ?? []), { id: id } ],
      }));
    },
    [ setHubForUpdate ],
  );

  /**
   * 拠点マスタ入力フォームから国の値をstateにセットする
   * @param {ReactSelectOption} e
   */
  const handleSelectCountry = (e: ReactSelectOption): void => {
    if (e && typeof e.value === "number") {
      setHubForUpdate(prev => ({
        ...prev,
        country_id: e.value as number,
      }));
    }
  };

  /**
   * 拠点マスタ入力フォームから通貨の値をstateにセットする
   * @param {ReactSelectOption} e
   */
  const handleSelectCurrency = (e: ReactSelectOption): void => {
    if (e && typeof e.value === "number") {
      setHubForUpdate(prev => ({
        ...prev,
        currency_id: e.value as number,
      }));
    }
  };

  /**
   * 拠点マスタ入力フォームから窓口拠点のチェックボックスの値をstateにセットする
   * @param {boolean} checked
   */
  const handleContactHubCheck = useCallback(
    (checked: boolean) => {
      setHubForUpdate(prev => ({
        ...prev,
        is_contact_hub: checked,
      }));
    },
    [ setHubForUpdate ],
  );

  if (isRenderingLoading) {
    return <Loading />;
  }

  return (
    <ModalSm isOpen={isOpen} onRequestClose={handleClose}>
      <ModalTitle text={"拠点マスタ編集"} />
      <ContentAreaWrapper>
        <InputGroup80
          id={`${inputId}-hubs`}
          text={"拠点名"}
          name={"name"}
          isRequired
          value={hubForUpdate.name}
          isReadOnly
        />
      </ContentAreaWrapper>
      <ContentAreaWrapper>
        <FileUploadButtonGroup
          inputFileUploadButtonId="a"
          buttonText=""
          name="icon"
          labelText="拠点アイコン"
          changeFunction={handleFileInput}
        />
      </ContentAreaWrapper>
      <ContentAreaWrapper>
        <InputGroup80
          id={`${inputId}-hubs-code`}
          text={"拠点コード(半角小文字英数字のみ)"}
          name={"code"}
          value={hubForUpdate.code}
          isRequired
          onChange={e => handleInput(e, "code")}
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
          id={`${inputId}-hub`}
          groups={hub.groups}
          groupAppendFunction={handleGroupInput}
          groupDeleteFunction={handleGroupDelete}
        />
      </ContentAreaWrapper>
      <ContentAreaWrapper>
        <TextareaGroup80
          id={`${inputId}-receipt-company`}
          labelText={"領収書(法人名)"}
          name={"company_name"}
          isRequired
          value={hubForUpdate.company_name}
          onChange={e => handleReceiptCompanyInput(e)}
          rows={3}
        />
      </ContentAreaWrapper>
      <ContentAreaWrapper>
        <InputAddressGroup
          text="領収書(住所)"
          changeAddressFunction={handleAddressInput}
          changeDomesticFunction={handleDomesticCheck}
          initialAddress={{
            postal_code: hub.postalCode ?? "",
            prefecture_name: hub.prefectureName ?? "",
            city_name: hub.cityName ?? "",
            town_name: hub.townName ?? "",
            building_name: hub.buildingName ?? "",
          }}
          format={hub ? (hub.isDomestic === 1 ? "domestic" : "international") : "domestic"}
        />
      </ContentAreaWrapper>
      <ContentAreaWrapper>
        <InputGroup80
          id={`${inputId}-receipt-invoice`}
          text={"領収書(インボイス番号)"}
          name={"invoice_no"}
          value={hubForUpdate.invoice_no ?? ""}
          onChange={e => handleInput(e, "invoice_no")}
        />
      </ContentAreaWrapper>
      <ContentAreaWrapper>
        <InputGroup80
          id={`${inputId}-proviso`}
          text={"但し書き"}
          name={"description"}
          isRequired
          value={hubForUpdate.description ?? ""}
          onChange={e => handleInput(e, "description")}
        />
      </ContentAreaWrapper>
      <ContentAreaWrapper>
        <InputCheckbox
          id={`${inputId}-counter`}
          checked={hub.forContact ?? true}
          text="窓口拠点にする"
          name={"is_contact_hub"}
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
          color={"green"}
          text={"保存する"}
          onClick={updateHub}
          disabled={isLoading || hub.id === null}
        />
      </ContentAreaWrapper>
      <ModalCloseButton handleClose={handleClose} />
      <FlexWrapper>
        <TextOnlyButton text={"拠点マスタ管理へ戻る"} hasUnderLine clickFunction={handleClose} />
      </FlexWrapper>
    </ModalSm>
  );
};

export default HubEditModal;
