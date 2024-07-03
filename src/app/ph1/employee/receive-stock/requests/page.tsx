import Template from "@/components/templates/employee/(authenticated)/receiveStocks/template";
import { NextPage } from "next";
import { ReactElement } from "react";

interface PageProps {
  searchParams?: {
    [key: string]: string | string[] | undefined;
    srcOrderDetailId: string;
    token?: string;
  };
}

const Page: NextPage<PageProps> = ({ searchParams }): ReactElement => {
  // const srcOrderDetailId =
  //   searchParams?.srcOrderDetailId === undefined ? null : parseInt(searchParams.srcOrderDetailId, 10);
  return <Template />;
};

export default Page;
