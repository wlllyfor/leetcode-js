"use client";

import { AuthStateType } from "@/store/Auth/AuthState";
import { CustomerState } from "@/store/Auth/CustomerState";
import { EnumAuth } from "@/types/store/auth/RecoilType";
import Link from "next/link";
import WhiteBoxWrapper from "@/components/atoms/div/wrapper/whiteBoxWrapper";
import Title from "@/components/atoms/text/title";
import FormButton from "@/components/atoms/button/formButton";
import Paragraph from "@/components/atoms/text/paragraph";
import { useRouter } from "next/navigation";
import { ChangeEvent, ReactElement, useEffect, useState } from "react";
import { SetterOrUpdater, useResetRecoilState, useSetRecoilState } from "recoil";
import InputGroup80 from "@/components/molecules/form/input/inputGroup80";
import ContentAreaWrapper from "@/components/atoms/div/wrapper/contentAreaWrapper";
import { getCustomerFrontUrl, routes } from "@/routes";
import { useLogin } from "@/hooks/customer/auth/useLogin";
import { useIndex as useHubIndex } from "@/hooks/common/hub/useIndex";
import { toast } from "react-toastify";
import { If, Then } from "react-if";
import { UUID } from "@/lib/uuid";

const Template = ({ hubCode }: { hubCode: string; }): ReactElement => {
  const { hubs, getHubs } = useHubIndex();
  const [ hubName, setHubName ] = useState<string>("");
  const [ isPosting, setIsPosting ] = useState<boolean>(false);

  useEffect(() => {
    ((): void => {
      getHubs();
    })();
  }, [ getHubs ]);

  useEffect((): void => {
    if(hubs.length > 0) {
      const findHub = hubs.find(hub => hub.code === hubCode);

      if(!findHub) {
        toast.error("拠点が見つかりませんでした。拠点コードをお確かめください。");
        return;
      }

      setHubName(prevState => findHub.name);
    }
  }, [ hubs, hubCode ]);
  /**
   * setterだけの場合
   * @type {SetterOrUpdater<AuthStateType>}
   */
  const setCustomerAuth: SetterOrUpdater<AuthStateType> = useSetRecoilState<AuthStateType>(CustomerState);
  const resetRecoilState = useResetRecoilState(CustomerState);

  // /**
  //  * getter だけの場合
  //  * @type {AuthType}
  //  */
  // const customer: AuthType = useRecoilValue<AuthType>(CustomerState<AuthType>);
  //
  // /**
  //  * getter, setter 両方使う場合
  //  */
  // const [a, setA] = useRecoilState<AuthType>(CustomerState<AuthType>);

  const router = useRouter();

  const { email, password, setEmail, setPassword, login, validationErrors } = useLogin();

  /**
   * ログインボタン押下時
   */
  const handleOnClick = async (): Promise<void> => {
    setIsPosting(prevState => true);
    resetRecoilState();
    const token = await login(hubCode);
    // ログイン処理
    if (token) {
      const res: AuthStateType = {
        type: EnumAuth.Customer,
        accessToken: token,
      };
      setCustomerAuth(res);
      setIsPosting(prevState => false);

      const redirectPath: string = getCustomerFrontUrl(hubCode ?? "", routes.front.customer.myPage.url);
      router.push(redirectPath);
    }
  };

  const handleOnChangeEmail = (e: ChangeEvent<HTMLInputElement>): void => {
    setEmail(prevState => e.target.value);
  };

  const handleOnChangePassword = (e: ChangeEvent<HTMLInputElement>): void => {
    setPassword(prevState => e.target.value);
  };

  const registerPagePath: string = getCustomerFrontUrl(hubCode ?? "", routes.front.customer.auth.register.url);

  return (
    <>
      <div className="absolute top-[200px] left-[calc(50%_-_170px)]">
        <WhiteBoxWrapper>
          <Title text="ログイン" />
          <div className="flex text-xs justify-center">
            <Paragraph text="拠点名" />
            {/* TODO : 拠点アイコンに差し替え */}
            {/* <Image src={Logo} width={30} height={30} alt="" /> */}
            <Paragraph text={hubName} />
          </div>
          <ContentAreaWrapper>
            <InputGroup80
              id={"email"}
              text={"メールアドレス"}
              value={email}
              placeholder={"email@email.com"}
              onChange={handleOnChangeEmail}
            />
          </ContentAreaWrapper>
          <ContentAreaWrapper>
            <InputGroup80
              id={"password"}
              text={"パスワード"}
              value={password}
              placeholder={"*******"}
              onChange={handleOnChangePassword}
              inputType={"password"}
            />
          </ContentAreaWrapper>
          <If condition={validationErrors.length > 0 && !isPosting}>
            <Then>
              {(validationErrors.map(error => (
                <ContentAreaWrapper key={UUID.generate()}>
                  <p className="text-red-500 text-sm">{error}</p>
                </ContentAreaWrapper>
              )))}
            </Then>
          </If>
          <FormButton
            onClick={handleOnClick}
            text={"ログイン"}
            color={"green"}
            disabled={!email && !password || !hubCode || !hubName}
          />
          <div className="w-fit mx-auto mt-4 text-xs border-solid border-0 border-b border-[#1F2937]">
            <Link href={registerPagePath}>新規会員登録はこちら</Link>
          </div>
        </WhiteBoxWrapper>
      </div>
    </>
  );
};

export default Template;
