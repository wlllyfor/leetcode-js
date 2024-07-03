"use client";

import { CustomerState } from "@/store/Auth/CustomerState";
import WhiteBoxWrapper from "@/components/atoms/div/wrapper/whiteBoxWrapper";
import H2 from "@/components/atoms/h2";
import FormButton from "@/components/atoms/button/formButton";
import { useRouter } from "next/navigation";
import { ReactElement } from "react";
import { useResetRecoilState } from "recoil";
import commonClasses from "@/styles/common/page.module.scss";
import { getCustomerFrontUrl, routes } from "@/routes";
import { useVerify } from "@/hooks/customer/auth/useVerify";

const Template = ({ hubCode, token }: { hubCode: string; token: string; }): ReactElement => {
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

  const { verify } = useVerify();

  /**
   * 認証ボタン押下時
   */
  const handleOnClick = async (): Promise<void> => {
    resetRecoilState();

    const customer = await verify(token);
    const loginPagePath: string = getCustomerFrontUrl(hubCode ?? "", routes.front.customer.auth.login.url);
    if (customer) {
      router.push(loginPagePath);
    }
  };

  return (
    <>
      <div className={commonClasses.content__wrapper}>
        <WhiteBoxWrapper>
          <H2>認証画面</H2>
          <div className={commonClasses.mt_24}>
            <FormButton onClick={handleOnClick} text={"認証"} color={"green"} />
          </div>
        </WhiteBoxWrapper>
      </div>
    </>
  );
};

export default Template;
