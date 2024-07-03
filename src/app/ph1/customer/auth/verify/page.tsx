import Template from "@/components/templates/customer/auth/verify/template";
import { NextPage } from "next";
import { ReactElement } from "react";
import { HasHubCodeAndTokenPageProps } from "@/pagePropInterfaces/hasHubCodeAndTokenPageProps";

const Page: NextPage<HasHubCodeAndTokenPageProps> = ({ params, searchParams }): ReactElement => {
  // TODO : ログイン時には不要。後で消すかも。
  return <Template hubCode={params.hub_code} token={searchParams?.token ?? ""} />;
};

export default Page;
