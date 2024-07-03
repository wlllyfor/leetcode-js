import { NextPage } from "next";
import { ReactElement } from "react";
import Template from "@/components/templates/employee/(authenticated)/employees/template";

const Page: NextPage = (): ReactElement => {
  return (
    <>
      <Template />
    </>
  );
};

export default Page;
