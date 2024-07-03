import Template from "@/components/templates/customer/auth/login/template";
import { NextPage } from "next";
import { ReactElement } from "react";

interface PageProps {
  params: {
    hub_code: string;
  };
  searchParams?: { [key: string]: string | string[] | undefined; };
}

const Page: NextPage<PageProps> = ({ params, searchParams }): ReactElement => {
  return <Template hubCode={params.hub_code} />;
};

export default Page;
