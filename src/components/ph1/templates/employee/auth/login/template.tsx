"use client";

import Link from "next/link";
import { ChangeEvent, ReactElement, useEffect } from "react";
import WhiteBoxWrapper from "@/components/atoms/div/wrapper/whiteBoxWrapper";
import H2 from "@/components/atoms/h2";
import InputAndLabel from "@/components/molecules/inputs/inputAndLabel";
import FormButton from "@/components/atoms/button/formButton";
import Paragraph from "@/components/atoms/paragraph";
import commonClasses from "@/styles/common/page.module.scss";
import { routes } from "@/routes";
import { SetterOrUpdater, useResetRecoilState, useSetRecoilState } from "recoil";
import { AuthStateType } from "@/store/Auth/AuthState";
import { EmployeeState } from "@/store/Auth/EmployeeState";
import { useRouter } from "next/navigation";
import { useLogin } from "@/hooks/employee/auth/useLogin";
import { EnumAuth } from "@/types/store/auth/RecoilType";
import Error422 from "@/components/molecules/errors/error422";

const Template = (): ReactElement => {
  /**
   * setterだけの場合
   * @type {SetterOrUpdater<AuthStateType>}
   */
  const setEmployeeAuth: SetterOrUpdater<AuthStateType> = useSetRecoilState<AuthStateType>(EmployeeState);
  const resetRecoilState = useResetRecoilState(EmployeeState);

  const router = useRouter();

  const { login, employeeForLogin, setEmployeeForLogin, validationErrors, setValidationErrors, isLoggedIn } =
    useLogin();

  /**
   * 登録後はログインページに遷移
   */
  useEffect((): void => {
    if (isLoggedIn) {
      router.push(routes.front.employee.auth.login.url);
    }
  }, [ isLoggedIn, router ]);

  useEffect((): void => {
    setValidationErrors(prevState => []);
    setEmployeeForLogin(prevState => {
      return {
        email: "",
        password: "",
      };
    });
  }, [ setValidationErrors, setEmployeeForLogin ]);

  /**
   * メールアドレス変更イベント
   * @param e
   */
  const handleOnChangeEmail = async (e: ChangeEvent<HTMLInputElement>): Promise<void> => {
    setEmployeeForLogin(prevState => {
      if (!prevState) return prevState;
      return {
        ...prevState,
        email: e.target.value,
      };
    });
  };

  /**
   * パスワード変更イベント
   * @param e
   */
  const handleOnChangePassword = async (e: ChangeEvent<HTMLInputElement>): Promise<void> => {
    setEmployeeForLogin(prevState => {
      if (!prevState) return prevState;
      return {
        ...prevState,
        password: e.target.value,
      };
    });
  };

  /**
   * ログインボタン押下時
   */
  const handleOnClickLoginButton = async (): Promise<void> => {
    resetRecoilState();
    const token = await login();
    // ログイン処理
    if (token) {
      const res: AuthStateType = {
        type: EnumAuth.Employee,
        accessToken: token,
      };
      setEmployeeAuth(res);

      router.push(routes.front.employee.dashboard.url);
    }
  };

  return (
    <>
      <div className={commonClasses.content__wrapper}>
        <WhiteBoxWrapper>
          <H2>スタッフログイン</H2>
          <Error422 errors={validationErrors} />
          <InputAndLabel
            id={"email"}
            text={"メールアドレス"}
            value={employeeForLogin?.email || ""}
            changeFunction={handleOnChangeEmail}
          />
          <InputAndLabel
            id={"password"}
            text={"パスワード"}
            inputType={"password"}
            value={employeeForLogin?.password || ""}
            changeFunction={handleOnChangePassword}
          />
          <div className={commonClasses.mt_24}>
            <FormButton text={"ログイン"} color={"green"} onClick={handleOnClickLoginButton} />
          </div>
          <div className={commonClasses.pt_2em}>
            <Paragraph isLink isCenter isMarginTop>
              <Link href={routes.front.employee.auth.register.url}>新規会員登録はこちら</Link>
            </Paragraph>
          </div>
        </WhiteBoxWrapper>
      </div>
    </>
  );
};

export default Template;
