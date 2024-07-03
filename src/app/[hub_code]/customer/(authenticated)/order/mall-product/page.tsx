import { NextPage } from "next";
import { ReactElement } from "react";
import Template from "@/components/templates/customer/(authenticated)/order/mall-product/template";
import { AlibabaProductFindPageProps } from "@/pagePropInterfaces/alibabaProductFindPageProps";

const Page: NextPage<AlibabaProductFindPageProps> = ({ params, searchParams }): ReactElement => {
  return (
    <>
      <Template params={params} searchParams={searchParams} />
    </>
  );
};

export default Page;
