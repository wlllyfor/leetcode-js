import Template from "@/components/templates/template";
import { ReactElement } from "react";
import { NextPage } from "next";

const Page: NextPage = (): ReactElement => {
  return <Template ApiUrl={process.env.API_URL} NodeEnv={process.env.NODE_ENV} />;
};
export default Page;
