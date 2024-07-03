"use client";

import { ReactElement } from "react";
import H2 from "@/components/atoms/h2";
import Paragraph from "@/components/atoms/paragraph";
import Link from "next/link";
import { getCustomerFrontUrl, routes } from "@/routes";

const Template = ({ ApiUrl, NodeEnv }: { ApiUrl?: string; NodeEnv: string; }): ReactElement => {
  // もろもろリセット！
  // CustomerAxios._resetToken();
  // EmployeeAxios._resetToken();
  // const resetRecoilCustomerState = useResetRecoilState(CustomerState);
  // const resetRecoilEmployeeState = useResetRecoilState(EmployeeState);
  // resetRecoilCustomerState();
  // resetRecoilEmployeeState();

  const customerUrl = getCustomerFrontUrl("yiwu", routes.front.customer.auth.login.url);
  return (
    <>
      <Paragraph isWhite>現在のAPIのURL：{ApiUrl}</Paragraph>
      <Paragraph isWhite>現在の環境：{NodeEnv}</Paragraph>
      <H2>【PH1】で利用</H2>
      <Paragraph isWhite>
        従業員用ログインページ：
        <Link href={routes.front.employee.auth.login.url}>こちら</Link>
      </Paragraph>
      <Paragraph isWhite>
        顧客用ログインページ：<Link href={customerUrl}>こちら</Link>{" "}
      </Paragraph>

      <H2>【PH2】の予定</H2>
      <Paragraph isWhite>各拠点のログイン・会員登録ページ一覧予定。</Paragraph>
    </>
  );
};

export default Template;
