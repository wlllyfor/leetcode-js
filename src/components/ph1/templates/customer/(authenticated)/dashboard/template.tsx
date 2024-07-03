"use client";

import { ReactElement, useState } from "react";
import ChatWorkModal from "@/components/molecules/modal/customer/chatWorkModal";
import useAuth from "@/hooks/customer/useAuth";
import ChatWorkCompleteModal from "@/components/molecules/modal/customer/chatWorkCompleteModal";
import AuthenticatedLayout from "@/components/molecules/layouts/customer/authenticatedLayout";
import Loading from "@/components/molecules/common/loading";

const Template = ({ hubCode }: { hubCode: string; }): ReactElement => {
  const customer = useAuth();

  const [ isComplete, setIsComplete ] = useState<boolean>(false);
  const handleOnSend = () => {
    setIsComplete(prevState => true);
  };

  if (!customer || !hubCode) {
    return <Loading />;
  }

  return (
    <>
      <AuthenticatedLayout hubCode={hubCode}>
        {isComplete ? (
          <ChatWorkCompleteModal />
        ) : customer?.chatWorkId ? null : (
          <ChatWorkModal handleOnSend={handleOnSend} />
        )}
      </AuthenticatedLayout>
    </>
  );
};

export default Template;
