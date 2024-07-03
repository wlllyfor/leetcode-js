"use client";

import { CustomerState } from "@/store/Auth/CustomerState";
import WhiteBoxWrapper from "@/components/atoms/div/wrapper/whiteBoxWrapper";
import { notFound, useRouter } from "next/navigation";
import { ReactElement, useEffect, useState } from "react";
import { useResetRecoilState } from "recoil";
import { getCustomerFrontUrl, routes } from "@/routes";
import { useVerify } from "@/hooks/customer/auth/useVerify";
import ContentAreaWrapper from "@/components/atoms/div/wrapper/contentAreaWrapper";
import Paragraph from "@/components/atoms/text/paragraph";
import Title from "@/components/atoms/text/title";
import { Else, If, Then } from "react-if";
import Link from "next/link";
import { UUID } from "@/lib/uuid";

const Template = ({ hubCode, token }: { hubCode: string; token: string; }): ReactElement => {
  const [ loginPageUrl, setLoginPageUrl ] = useState<string>("");
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

  const { verify, validationErrors } = useVerify();

  useEffect(() => {
    (async(): Promise<void> => {
      resetRecoilState();

      const customer = await verify(token);
      const loginPagePath: string = getCustomerFrontUrl(hubCode ?? "", routes.front.customer.auth.login.url);
      if (customer) {
        setLoginPageUrl(loginPagePath);

        setTimeout(() => {
          router.push(loginPagePath);
        }, 5_000);
      }
    })();
  }, [ verify, token, hubCode, resetRecoilState, router ]);

  if(!hubCode || !token) {
    notFound();
  }

  return (
    <>
      <div className="absolute top-[200px] left-[calc(50%_-_170px)]">
        <WhiteBoxWrapper>
          <Title text="メール認証" />
          <ContentAreaWrapper>
            <div className="mt-8 text-center">
              <If condition={loginPageUrl !== ""}>
                <Then>
                  <Paragraph text="認証しました。" />
                  <Paragraph text="5秒後にログインページに遷移します。" />
                  <Paragraph text="遷移しない場合は、" />
                  <Paragraph text="以下のリンクをクリックしてください。" />
                  <Link href={loginPageUrl} className="underline">
                    <Paragraph text="ログインページへ" />
                  </Link>
                </Then>
                <Else>
                  <Paragraph text="認証中..." />
                </Else>
              </If>
              <If condition={validationErrors.length > 0}>
                <Then>
                  {(validationErrors.map(error => (
                    <ContentAreaWrapper key={UUID.generate()}>
                      <p className="text-red-500 text-sm">{error}</p>
                    </ContentAreaWrapper>
                  )))}
                </Then>
              </If>

            </div>
          </ContentAreaWrapper>
        </WhiteBoxWrapper>
      </div>
    </>
  );
};

export default Template;
