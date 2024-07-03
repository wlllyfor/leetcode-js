import Template from "@/components/templates/customer/(authenticated)/order/cart/template";
import { NextPage } from "next";
import { ReactElement } from "react";
import { HasHubCodePageProps } from "@/pagePropInterfaces/hasHubCodePageProps";

const Page: NextPage<HasHubCodePageProps> = ({ params, searchParams }): ReactElement => {
  return <Template params={params} />;
};

export default Page;
