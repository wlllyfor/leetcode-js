import Template from "@/components/templates/customer/(authenticated)/update/chat-work/template";
import { NextPage } from "next";
import { ReactElement } from "react";
import { HasHubCodePageProps } from "@/pagePropInterfaces/hasHubCodePageProps";

const Page: NextPage<HasHubCodePageProps> = ({ params, searchParams }): ReactElement => {
  return <Template hubCode={params.hub_code} />;
};

export default Page;
