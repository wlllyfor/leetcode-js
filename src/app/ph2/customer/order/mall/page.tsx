import { NextPage } from "next";
import { ReactElement } from "react";
import Template from "@/components/templates/customer/(authenticated)/order/mall/template";

const Page: NextPage = (): ReactElement => {
  return (
    <>
      {/* モックのため仮置きでhubCodeをyiwuにしています */}
      <Template hubCode={"yiwu"} />
    </>
  );
};

export default Page;
