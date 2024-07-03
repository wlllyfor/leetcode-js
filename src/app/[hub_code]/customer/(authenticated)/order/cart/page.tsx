import { NextPage } from "next";
import { ReactElement } from "react";
import Template from "@/components/templates/customer/(authenticated)/order/cart/template";
import { AlibabaProductIndexPageProps } from "@/pagePropInterfaces/alibabaProductIndexPageProps";

const Page: NextPage<AlibabaProductIndexPageProps> = ({ params }): ReactElement => {
  return (
    <>
      <Template params={params} />
    </>
  );
};

export default Page;
