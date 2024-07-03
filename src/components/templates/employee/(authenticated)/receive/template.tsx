"use client";

import { ReactElement, useState } from "react";
import MainInner from "@/components/atoms/div/inner/mainInner";
import AuthenticatedLayout from "@/components/molecules/layouts/employee/authenticatedLayout";
import ButtonGroup from "@/components/molecules/buttonGroup/employee/receive/buttonGroup";
import InspectModal from "@/components/molecules/modalGroup/employee/receive/inspectModal";
import ReceiveModal from "@/components/molecules/modalGroup/employee/receive/receiveModal";

const Template = (): ReactElement => {
  const [ isInspectModalOpen, setInspectModalOpen ] = useState<boolean>(false);
  const [ isReceiveModalOpen, setReceiveModalOpen ] = useState<boolean>(false);

  return (
    <>
      <AuthenticatedLayout>
        <MainInner>
          <div className="mt-16">
            <ButtonGroup
              handleInspectionButtonClick={() => setInspectModalOpen(true)}
              handleReceiveButtonClick={() => setReceiveModalOpen(true)}
            />
          </div>
        </MainInner>
        <InspectModal isOpen={isInspectModalOpen} handleCloseOnClick={() => setInspectModalOpen(false)} handleOnClickInspectButton={()=>{}} />
        <ReceiveModal isOpen={isReceiveModalOpen} handleCloseOnClick={() => setReceiveModalOpen(false)} handleOnClickReceiveButton={()=>{}} />
      </AuthenticatedLayout>
    </>
  );
};

export default Template;
