"use client";

import Link from "next/link";
import WhiteBoxWrapper from "@/components/atoms/div/wrapper/whiteBoxWrapper";
import H2 from "@/components/atoms/h2";
import { ReactElement } from "react";
import commonClasses from "@/styles/common/page.module.scss";
import Paragraph from "@/components/atoms/paragraph";
import Span from "@/components/atoms/span";
import { getCustomerFrontUrl, routes } from "@/routes";

const Template = ({ hubCode }: { hubCode: string; }): ReactElement => {
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

  const registerUrl: string = getCustomerFrontUrl(hubCode ?? "", routes.front.customer.auth.register.url);

  return (
    <>
      <div className={commonClasses.content__wrapper}>
        <WhiteBoxWrapper>
          <H2>登録メール送信完了</H2>
          <div className={commonClasses.mt_24}>
            <Paragraph isLeft>
              ご登録のメールアドレス宛に、<Span isBold>確認メール</Span>
              を送信しております。 メール内のURLをタップして本登録を完了してください。
            </Paragraph>
            <div className={commonClasses.mt_16}>
              <Paragraph isLeft>
                メールが届かない場合は、迷惑メールフォルダのご確認をお願いいたします。また、登録したメールアドレスが間違っていた場合は、お手数ですが再度{" "}
                <Link href={registerUrl}>新規会員登録画面</Link> から入力をお願いいたします。
              </Paragraph>
            </div>
          </div>
        </WhiteBoxWrapper>
      </div>
    </>
  );
};

export default Template;
