"use client";

import Link from "next/link";
import { ChangeEvent, ReactElement, useEffect } from "react";
import WhiteBoxWrapper from "@/components/atoms/div/wrapper/whiteBoxWrapper";
import Title from "@/components/atoms/text/title";
import InputGroup80 from "@/components/molecules/form/input/inputGroup80";
import FormButton from "@/components/atoms/button/formButton";
import ContentAreaWrapper from "@/components/atoms/div/wrapper/contentAreaWrapper";
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
      <div className="absolute top-[200px] left-[calc(50%_-_170px)]">
        <WhiteBoxWrapper>
          <Title text="スタッフログイン" />
          <Error422 errors={validationErrors} />
          <ContentAreaWrapper>
            <InputGroup80
              id={"email"}
              text={"メールアドレス"}
              value={employeeForLogin?.email || ""}
              onChange={handleOnChangeEmail}
            />
          </ContentAreaWrapper>
          <ContentAreaWrapper>
            <InputGroup80
              id={"password"}
              text={"パスワード"}
              inputType={"password"}
              value={employeeForLogin?.password || ""}
              onChange={handleOnChangePassword}
            />
          </ContentAreaWrapper>
          <div className="">
            <FormButton text={"ログイン"} color={"green"} onClick={handleOnClickLoginButton} />
          </div>
          <div className="w-fit mx-auto mt-4 text-xs border-solid border-0 border-b border-[#1F2937]">
            <Link href={routes.front.employee.auth.register.url}>新規会員登録はこちら</Link>
          </div>
        </WhiteBoxWrapper>
      </div>
    </>
  );
};

export default Template;
