"use client";

import { CustomerState } from "@/store/Auth/CustomerState";
import Link from "next/link";
import WhiteBoxWrapper from "@/components/atoms/div/wrapper/whiteBoxWrapper";
import H2 from "@/components/atoms/h2";
import InputAndLabel from "@/components/molecules/inputs/inputAndLabel";
import FormButton from "@/components/atoms/button/formButton";
import { useRouter } from "next/navigation";
import { ChangeEvent, ReactElement } from "react";
import { useResetRecoilState } from "recoil";
import commonClasses from "@/styles/common/page.module.scss";
import Paragraph from "@/components/atoms/paragraph";
import lineIcon from "@/resource/img/icon_line.svg";
import googleIcon from "@/resource/img/icon_google.svg";
import { getCustomerFrontUrl, routes } from "@/routes";
import { useRegister } from "@/hooks/customer/auth/useRegister";

const Template = ({ hubCode }: { hubCode: string; }): ReactElement => {
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

  const { email, password, setEmail, setPassword, register } = useRegister();

  /**
   * 新規登録ボタン押下時
   */
  const handleOnClick = async (): Promise<void> => {
    resetRecoilState();

    const customer = await register(hubCode);
    const completedPagePath: string = getCustomerFrontUrl(hubCode ?? "", routes.front.customer.auth.completed.url);
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
      <div className={commonClasses.content__wrapper}>
        <WhiteBoxWrapper>
          <H2>新規会員登録</H2>
          <InputAndLabel
            id={"email"}
            text={"メールアドレス"}
            value={email}
            placeholder={"email@email.com"}
            changeFunction={handleOnChangeEmail}
          />
          <InputAndLabel
            id={"password"}
            text={"パスワード"}
            value={password}
            placeholder={"*******"}
            changeFunction={handleOnChangePassword}
            inputType={"password"}
          />
          <div className={commonClasses.mt_24}>
            <FormButton onClick={handleOnClick} text={"会員登録"} color={"green"} />
          </div>
          <div className={commonClasses.pt_2em}>
            <div className={commonClasses.mt_24}>
              <FormButton text={"LINEで会員登録"} color={"white"} icon={lineIcon} />
            </div>
            <div className={commonClasses.mt_24}>
              <FormButton text={"Googleアカウントで会員登録"} color={"white"} icon={googleIcon} />
            </div>
          </div>
          <div className={commonClasses.pt_2em}>
            <Paragraph isLink isCenter isMarginTop>
              <Link href={loginPagePath}>ログインはこちら</Link>
            </Paragraph>
          </div>
        </WhiteBoxWrapper>
      </div>
    </>
  );
};

export default Template;
