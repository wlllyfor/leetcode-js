"use client";

import Link from "next/link";
import WhiteBoxWrapper from "@/components/atoms/div/wrapper/whiteBoxWrapper";
import Title from "@/components/atoms/text/title";
import { ReactElement } from "react";
import Paragraph from "@/components/atoms/text/paragraph";
import Span from "@/components/atoms/text/span";
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
      <div className="absolute top-[200px] left-[calc(50%_-_170px)]">
        <WhiteBoxWrapper>
          <Title text="登録メール送信完了" />
          <div>
            <Paragraph fontSize="11px">
              ご登録のメールアドレス宛に、
              <Span isBold text="確認メール" />
              を送信しております。 メール内のURLをタップして本登録を完了してください。
            </Paragraph>
            <div className="mt-2">
              <Paragraph fontSize="11px">
                メールが届かない場合は、迷惑メールフォルダのご確認をお願いいたします。
              </Paragraph>
            </div>
            <div className="mt-2">
              <Paragraph fontSize="11px">
                また、登録したメールアドレスが間違っていた場合は、お手数ですが再度{" "}
                <span className="border-solid border-0 border-b border-[#2563EB] font-bold text-[#2563EB]">
                  <Link href={registerUrl}>新規会員登録画面</Link>
                </span>{" "}
                から入力をお願いいたします。
              </Paragraph>
            </div>
          </div>
        </WhiteBoxWrapper>
      </div>
    </>
  );
};

export default Template;
