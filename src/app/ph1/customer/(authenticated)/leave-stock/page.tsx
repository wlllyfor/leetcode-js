import Template from "@/components/templates/customer/(authenticated)/leave-stock/template";
import { NextPage } from "next";
import { ReactElement } from "react";

interface HasHubCodePageProps {
  params: {
    hub_code: string;
  };
  searchParams?: {
    [key: string]: string | string[] | undefined;
    srcProductIdList: string;
    token?: string;
  };
}

const Page: NextPage<HasHubCodePageProps> = ({ params, searchParams }): ReactElement => {
  return <Template hubCode={params.hub_code} srcProductIdList={searchParams?.srcProductIdList} />;
};

export default Page;
