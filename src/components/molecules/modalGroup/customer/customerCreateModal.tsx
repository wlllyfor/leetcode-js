"use client";

import { ModalGroupType } from "@/types/components/molecules/modalGroup/ModalGroupType";
import ModalTitle from "@/components/atoms/modal/modalTitle";
import ModalSm from "@/components/atoms/modal/modalSm";
import { ChangeEvent, ReactElement, useCallback, useEffect, useState } from "react";
import Paragraph from "@/components/atoms/text/paragraph";
import ContentAreaWrapper from "@/components/atoms/div/wrapper/contentAreaWrapper";
import InputGroup80 from "@/components/molecules/form/input/inputGroup80";
import AddressGroup from "@/components/molecules/form/input/addressGroup";
import FormButton from "@/components/atoms/button/formButton";
import { useIndex as useCountryIndex } from "@/hooks/common/country/useIndex";
import Link from "next/link";
import { useRecoilValue } from "recoil";
import { CustomerState } from "@/store/Auth/CustomerState";
import { useStore } from "@/hooks/customer/profile/useStore";
import CustomerAxios from "@/lib/axios/customer-axios";
import Loading from "@/components/molecules/common/loading";
import { If, Then } from "react-if";
import { UUID } from "@/lib/uuid";
import { CustomerAddressType } from "@/hooks/customer/profile/useAddress";
import InputCheckbox from "@/components/molecules/form/input/inputCheckbox";

type CustomerInfoModalType = {
  /** ログイン時と同じ時に使用する */
  email: string;
  /** 排他制御用 customerのupdatedAt */
  updatedAt: string;
} & ModalGroupType;

const CustomerCreateModal = ({
  isOpen,
  handleClose,
  email,
  updatedAt,
}: CustomerInfoModalType) : ReactElement => {
  const auth = useRecoilValue(CustomerState);
  const { getCountries, options: countryOptions } = useCountryIndex();
  const {
    isStored, setIsStored,
    customerForPost, setCustomerForPost,
    customerPost, isLoading,
    validationErrors, setValidationErrors,
  } = useStore();

  const [ isRenderingLoading, setIsRenderingLoading ] = useState<boolean>(false);
  const [ isMailChecked, setIsMailChecked ] = useState<boolean>(true);

  useEffect((): void => {
    if(isOpen) {
      (async(): Promise<void> => {
        setIsRenderingLoading(prevState => true);

        CustomerAxios._setToken(auth);

        setValidationErrors(prevState => []);
        setIsStored(prevState => false);

        getCountries();

        setCustomerForPost(prevState => {
          return {
            ...prevState,
            email: email,
            updated_at: updatedAt,
          };
        });

        setIsRenderingLoading(prevState => false);
      })();
    }
  }, [ isOpen, setCustomerForPost, setValidationErrors, setIsStored, auth, email, updatedAt, getCountries ]);

  useEffect(() => {
    if(isStored) {
      handleClose();
    }
  }, [ handleClose, isStored ]);

  /**
   * プロフィール登録フォームにChatWorkIDをセット
   */
  const handleCharWorkIdChange = useCallback((e: ChangeEvent<HTMLInputElement>): void => {
    setCustomerForPost(prevState => {
      return {
        ...prevState,
        chat_work_id: e.target.value,
      };
    });
  }, [ setCustomerForPost ]);

  /**
   * プロフィール登録フォームにメールアドレスをセット
   */
  const handleEmailChange = useCallback((e: ChangeEvent<HTMLInputElement>): void => {
    setCustomerForPost(prevState => {
      return {
        ...prevState,
        email: e.target.value,
      };
    });
  }, [ setCustomerForPost ]);

  /**
   * プロフィール登録フォームにお名前をセット
   */
  const handleNameChange = useCallback((e: ChangeEvent<HTMLInputElement>): void => {
    setCustomerForPost(prevState => {
      return {
        ...prevState,
        name: e.target.value,
      };
    });
  }, [ setCustomerForPost ]);

  /**
   * プロフィール登録フォームにお名前(ローマ字)をセット
   */
  const handleNameKanaChange = useCallback((e: ChangeEvent<HTMLInputElement>): void => {
    setCustomerForPost(prevState => {
      return {
        ...prevState,
        name_kana: e.target.value,
      };
    });
  }, [ setCustomerForPost ]);

  /**
   * プロフィール登録フォームに会社名をセット
   */
  const handleCompanyChange = useCallback((e: ChangeEvent<HTMLInputElement>): void => {
    setCustomerForPost(prevState => {
      return {
        ...prevState,
        company_name: e.target.value,
      };
    });
  }, [ setCustomerForPost ]);

  /**
   * プロフィール登録フォームに住所をセット
   */
  const handleAddressInput = useCallback((address: CustomerAddressType) => {
    setCustomerForPost(prev => {
      if(!prev || prev.country_id === null) {
        return prev;
      }
      return {
        ...prev,
        ...address,
      };
    });
  }, [ setCustomerForPost ]);

  /**
   * メールアドレスをログイン時と同じにするか否か
   * trueの場合はログイン時と同じにする
   */
  const handleCheckbox = useCallback((checked: boolean) => {
    setIsMailChecked(checked);
    if(checked && email) {
      setCustomerForPost(prevState => {
        return {
          ...prevState,
          email: email,
        };
      });
    }
  }, [ email, setCustomerForPost ]);

  if (isRenderingLoading) {
    return <Loading />;
  }

  return (
    <ModalSm isOpen={isOpen} onRequestClose={() => {}}>
      <div>
        <div className="text-center text-black">
          <ModalTitle text={"ようこそ"} />
          <Paragraph fontSize="12px" color="black">ご利用開始までもう少し！</Paragraph>
        </div>
        <div className="mt-4">
          <Paragraph fontSize="12px" color="black">お客様専用のChatWorkグループを開設させて頂きます。<br />当システムとChatWorkグループの紐づけを行わせていただきますので、お客様のチャットワークIDとプロフィールのご入力をお願いいたします。
          </Paragraph>
        </div>
      </div>
      {/* ユーザ入力エリアここから */}
      <div className="mt-2">
        <ContentAreaWrapper>
          <InputGroup80
            id={"chatWorkId"}
            text={"ChatWorkID"}
            isRequired
            value={customerForPost.chat_work_id}
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
            value={customerForPost.email}
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
            value={customerForPost.name}
            onChange={handleNameChange}
            isRequired
            placeholder="山田太郎"
          />
        </ContentAreaWrapper>
        <ContentAreaWrapper>
          <InputGroup80
            id={"customerNameKana"}
            text={"お名前(ローマ字)"}
            value={customerForPost.name_kana}
            onChange={handleNameKanaChange}
            isRequired
            placeholder="Taro Yamada"
          />
        </ContentAreaWrapper>
        <ContentAreaWrapper>
          <AddressGroup
            title="住所"
            isRequired
            options={countryOptions ?? []}
            changeAddressFunction={handleAddressInput}
          />
        </ContentAreaWrapper>
        <ContentAreaWrapper>
          <InputGroup80
            id={"companyName"}
            text={"領収書宛名"}
            value={customerForPost.company_name}
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
          text={"登録する"}
          color={"green"}
          onClick={() => {
            customerPost();
          }}
          disabled={isLoading}
        />
      </div>
    </ModalSm>
  );
};

export default CustomerCreateModal;
