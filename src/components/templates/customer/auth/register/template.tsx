"use client";

import { CustomerState } from "@/store/Auth/CustomerState";
import Link from "next/link";
import WhiteBoxWrapper from "@/components/atoms/div/wrapper/whiteBoxWrapper";
import Title from "@/components/atoms/text/title";
import FormButton from "@/components/atoms/button/formButton";
import InputGroup80 from "@/components/molecules/form/input/inputGroup80";
import ContentAreaWrapper from "@/components/atoms/div/wrapper/contentAreaWrapper";
import Paragraph from "@/components/atoms/text/paragraph";
import { useRouter } from "next/navigation";
import { ChangeEvent, ReactElement, useEffect, useState } from "react";
import { useResetRecoilState } from "recoil";
import { getCustomerFrontUrl, routes } from "@/routes";
import { useRegister } from "@/hooks/customer/auth/useRegister";
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

  // /**
  //  * setterだけの場合
  //  * @type {SetterOrUpdater<AuthStateType>}
  //  */
  // const setCustomerAuth: SetterOrUpdater<AuthStateType> = useSetRecoilState<AuthStateType>(CustomerState);
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

  const { email, password, setEmail, setPassword, register, validationErrors } = useRegister();

  /**
   * 新規登録ボタン押下時
   */
  const handleOnClick = async (): Promise<void> => {
    setIsPosting(prevState => true);
    resetRecoilState();

    const customer = await register(hubCode);
    const completedPagePath: string = getCustomerFrontUrl(hubCode ?? "", routes.front.customer.auth.completed.url);
    setIsPosting(prevState => false);
    if (customer) {
      router.push(completedPagePath);
    }
  };

  const handleOnChangeEmail = (e: ChangeEvent<HTMLInputElement>): void => {
    setEmail(prevState => e.target.value);
  };

  const handleOnChangePassword = (e: ChangeEvent<HTMLInputElement>): void => {
    setPassword(prevState => e.target.value);
  };

  const loginPagePath: string = getCustomerFrontUrl(hubCode ?? "", routes.front.customer.auth.login.url);

  return (
    <>
      <div className="absolute top-[200px] left-[calc(50%_-_170px)]">
        <WhiteBoxWrapper>
          <Title text="新規会員登録" />
          <div className="flex text-xs justify-center">
            <Paragraph text="拠点名" />
            {/* TODO: 拠点アイコンに差し替え。一旦拠点名を表示させています。 */}
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
              // inputType={"password"}
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
            text={"会員登録"}
            color={"green"}
            disabled={!email && !password || !hubCode || !hubName}
          />
          <div className="w-fit mx-auto mt-4 text-xs border-solid border-0 border-b border-[#1F2937]">
            <Link href={loginPagePath}>ログインはこちら</Link>
          </div>
        </WhiteBoxWrapper>
      </div>
    </>
  );
};

export default Template;
