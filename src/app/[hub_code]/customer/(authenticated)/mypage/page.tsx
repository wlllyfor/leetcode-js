import { NextPage } from "next";
import { ReactElement } from "react";
import Template from "@/components/templates/customer/(authenticated)/mypage/template";
import { HasHubCodePageProps } from "@/pagePropInterfaces/hasHubCodePageProps";

const Page: NextPage<HasHubCodePageProps> = ({ params }): ReactElement => {
  return <Template hubCode={params.hub_code} />;
};

export default Page;
