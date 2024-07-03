import { NextPage } from "next";
import { ReactElement } from "react";
import Template from "@/components/templates/customer/(authenticated)/order/mall/search/template";
import { AlibabaProductIndexPageProps } from "@/pagePropInterfaces/alibabaProductIndexPageProps";

const Page: NextPage<AlibabaProductIndexPageProps> = ({ params, searchParams }): ReactElement => {
  return (
    <>
      <Template params={params} searchParams={searchParams} />
    </>
  );
};

export default Page;
