"use client";

import ModalTitle from "@/components/atoms/modal/modalTitle";
import ModalSm from "@/components/atoms/modal/modalSm";
import { ChangeEvent, ReactElement, useCallback, useEffect, useState } from "react";
import ContentAreaWrapper from "@/components/atoms/div/wrapper/contentAreaWrapper";
import InputGroup80 from "@/components/molecules/form/input/inputGroup80";
import AddressGroup from "@/components/molecules/form/input/addressGroup";
import FormButton from "@/components/atoms/button/formButton";
import { useIndex as useCountryIndex } from "@/hooks/common/country/useIndex";
import Link from "next/link";
import { useRecoilValue } from "recoil";
import { CustomerState } from "@/store/Auth/CustomerState";
import Loading from "@/components/molecules/common/loading";
import { If, Then } from "react-if";
import { UUID } from "@/lib/uuid";
import InputCheckbox from "@/components/molecules/form/input/inputCheckbox";
import { useUpdate } from "@/hooks/customer/profile/useUpdate";
import CustomerAxios from "@/lib/axios/customer-axios";
import { CustomerAddressType } from "@/hooks/customer/profile/useAddress";
import { CustomerDbTableType } from "@/types/db/customer";
import { ModalGroupType } from "@/types/components/molecules/modalGroup/ModalGroupType";

export type CustomerInfoModalType = {
  customer: CustomerDbTableType;
} & ModalGroupType;

const CustomerEditModal = ({
  isOpen,
  handleClose,
  customer,
}: CustomerInfoModalType): ReactElement => {
  const auth = useRecoilValue(CustomerState);
  const { getCountries, options: countryOptions } = useCountryIndex();
  const {
    customerUpdate, customerForUpdate,
    setCustomerForUpdate, isLoading,
    isUpdated, setIsUpdated,
    validationErrors, setValidationErrors,
  } = useUpdate();

  const [ isRenderingLoading, setIsRenderingLoading ] = useState<boolean>(false);
  const [ isMailChecked, setIsMailChecked ] = useState<boolean>(true);

  useEffect((): void => {
    if(isOpen) {
      (async(): Promise<void> => {
        setIsRenderingLoading(prevState => true);

        CustomerAxios._setToken(auth);

        setValidationErrors(prevState => []);
        setIsUpdated(prevState => false);

        getCountries();

        setCustomerForUpdate(prevState => {
          return {
            ...prevState,
            chat_work_id: customer.chatWorkId,
            name: customer.name ?? "",
            name_kana: customer.nameKana ?? "",
            country_id: customer.countryId,
            email: customer.email ?? "",
            postal_code: customer.postalCode ?? "",
            prefecture_name: customer.prefectureName ?? "",
            city_name: customer.cityName ?? "",
            town_name: customer.townName ?? "",
            building_name: customer.buildingName ?? "",
            company_name: customer.companyName ?? "",
            tel: customer.tel ?? "",
            updated_at: customer.updatedAt,
          };
        });

        setIsRenderingLoading(prevState => false);
      })();
    }
  }, [ isOpen, auth, customer, setValidationErrors, setIsUpdated, getCountries, setCustomerForUpdate ]);

  useEffect((): void => {
    if(isUpdated) {
      handleClose();
    }
  }, [ isUpdated, handleClose ]);

  /**
   * プロフィール編集フォームにChatWorkIDをセット
   */
  const handleCharWorkIdChange = useCallback((e: ChangeEvent<HTMLInputElement>): void => {
    setCustomerForUpdate(prevState => {
      return {
        ...prevState,
        chat_work_id: e.target.value,
      };
    });
  }, [ setCustomerForUpdate ]);

  /**
   * プロフィール編集フォームにメールアドレスをセット
   */
  const handleEmailChange = useCallback((e: ChangeEvent<HTMLInputElement>): void => {
    setCustomerForUpdate(prevState => {
      return {
        ...prevState,
        email: e.target.value,
      };
    });
  }, [ setCustomerForUpdate ]);

  /**
   * プロフィール編集フォームにお名前をセット
   */
  const handleNameChange = useCallback((e: ChangeEvent<HTMLInputElement>): void => {
    setCustomerForUpdate(prevState => {
      return {
        ...prevState,
        name: e.target.value,
      };
    });
  }, [ setCustomerForUpdate ]);

  /**
   * プロフィール編集フォームにお名前(ローマ字)をセット
   */
  const handleNameKanaChange = useCallback((e: ChangeEvent<HTMLInputElement>): void => {
    setCustomerForUpdate(prevState => {
      return {
        ...prevState,
        name_kana: e.target.value,
      };
    });
  }, [ setCustomerForUpdate ]);

  /**
   * プロフィール編集フォームに会社名をセット
   */
  const handleCompanyChange = useCallback((e: ChangeEvent<HTMLInputElement>): void => {
    setCustomerForUpdate(prevState => {
      return {
        ...prevState,
        company_name: e.target.value,
      };
    });
  }, [ setCustomerForUpdate ]);

  /**
   * 住所入力フォームの値をstateにセット
   */
  const handleAddressInput = useCallback((address: CustomerAddressType) => {
    setCustomerForUpdate(prev => {
      if(!prev) {
        return prev;
      }
      return {
        ...prev,
        ...address,
      };
    });
  }, [ setCustomerForUpdate ]);

  /**
   * チェックボックスの値をstateにセット
   * checkを入れるとemailをログイン時と同じ値にする
   */
  const handleCheckbox = useCallback((checked: boolean) => {
    setIsMailChecked(checked);
    if(checked && customer.email) {
      setCustomerForUpdate(prevState => {
        return {
          ...prevState,
          email: customer.email,
        };
      });
    }
  }, [ customer.email, setCustomerForUpdate ]);

  if (isRenderingLoading) {
    return <Loading />;
  }

  return (
    <ModalSm isOpen={isOpen} onRequestClose={handleClose}>
      <ModalTitle text="お客様情報編集" />
      <div className="mt-2">
        <div className="mt-2">
          <ContentAreaWrapper>
            <InputGroup80
              id={"chatWorkId"}
              text={"ChatWorkID"}
              isRequired
              value={customerForUpdate.chat_work_id}
              onChange={handleCharWorkIdChange}
            />
            <Link
              href={"https://www.chatwork.com/service/packages/chatwork/pre_register.php?lang=ja&click=header-navi&plan=free&page=column"}
              target="_blank"
              rel="noopener"
              className="text-left text-[10px] border-solid border-0 border-b"
            >
            ChatWorkアカウントはこちらより無料で作成できます
            </Link>
          </ContentAreaWrapper>
          <ContentAreaWrapper>
            <InputGroup80
              id={"email"}
              text={"メールアドレス"}
              isRequired
              isDisabled={isMailChecked}
              value={customerForUpdate.email}
              onChange={e => {
                if(!isMailChecked) {
                  handleEmailChange(e);
                }
              }}
            />
            <InputCheckbox
              id={"email-checkbox"}
              checked={isMailChecked}
              text="ログイン時と同じにする"
              name={"email-checkbox"}
              changeFunction={handleCheckbox}
            />
          </ContentAreaWrapper>
          <ContentAreaWrapper>
            <InputGroup80
              id={"customerName"}
              text={"お名前"}
              value={customerForUpdate.name ?? ""}
              onChange={handleNameChange}
              isRequired
              placeholder="山田太郎"
            />
          </ContentAreaWrapper>
          <ContentAreaWrapper>
            <InputGroup80
              id={"customerNameKana"}
              text={"お名前(ローマ字)"}
              value={customerForUpdate.name_kana ?? ""}
              onChange={handleNameKanaChange}
              isRequired
              placeholder="Taro Yamada"
            />
          </ContentAreaWrapper>
          <ContentAreaWrapper>
            <AddressGroup
              title="住所"
              isRequired
              options={countryOptions}
              changeAddressFunction={handleAddressInput}
              initialAddress={{
                country_id: customer.countryId ?? null,
                postal_code: customer.postalCode ?? "",
                prefecture_name: customer.prefectureName ?? "",
                city_name: customer.cityName ?? "",
                town_name: customer.townName ?? "",
                building_name: customer.buildingName ?? "",
                tel: customer.tel ?? "",
              }}
            />
          </ContentAreaWrapper>
          <ContentAreaWrapper>
            <InputGroup80
              id={"companyName"}
              text={"領収書宛名"}
              value={customerForUpdate.company_name ?? ""}
              onChange={handleCompanyChange}
              isRequired
              placeholder="株式会社●●"
            />
          </ContentAreaWrapper>
        </div>
        <If condition={validationErrors.length > 0}>
          <Then>
            {(validationErrors.map(error => (
              <ContentAreaWrapper key={UUID.generate()}>
                <p className="text-red-500 text-sm">{error}</p>
              </ContentAreaWrapper>
            )))}
          </Then>
        </If>
        <div>
          <FormButton
            text={"更新する"}
            color={"green"}
            onClick={() => {
              customerUpdate();
            }}
            disabled={isLoading}
          />
        </div>
      </div>
    </ModalSm>
  );
};

export default CustomerEditModal;
