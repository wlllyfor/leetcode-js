"use client";

import H2 from "@/components/atoms/h2";
import FormButton from "@/components/atoms/button/formButton";
import commonClasses from "@/styles/common/page.module.scss";
import Paragraph from "@/components/atoms/paragraph";
import { EduITModal } from "@/components/molecules/eduITModal";
import { ReactElement, useEffect } from "react";
import { ShipToAddressDbTableType } from "@/types/db/shipToAddress";
import { useDestroy } from "@/hooks/customer/shipToAddress/useDestroy";

const ShipToAddressDeleteModal = ({
  prevShipToAddress,
  isOpen,
  handleOnCloseButtonClick,
  handleOnClickDestroyButton,
}: {
  prevShipToAddress: ShipToAddressDbTableType | null;
  isOpen: boolean;
  handleOnCloseButtonClick: () => void;
  handleOnClickDestroyButton: () => void;
}): ReactElement => {
  const { destroyShipToAddress, isDestroyed, setIsDestroyed } = useDestroy();

  useEffect((): void => {
    if (isOpen) {
      setIsDestroyed(prevState => false);
    }
  }, [ isOpen, prevShipToAddress, setIsDestroyed ]);

  useEffect((): void => {
    if (isDestroyed) {
      handleOnClickDestroyButton();
    }
  }, [ isDestroyed, handleOnClickDestroyButton ]);

  return (
    <EduITModal isOpen={isOpen}>
      <H2>削除</H2>
      <div className={commonClasses.mt_16}>
        <Paragraph isSmall isLeft>
          配送先マスタから削除します。問題ないか確認のうえ、削除する場合は以下のボタンを押してください。
        </Paragraph>
      </div>
      <div className={commonClasses.mt_24}>
        <FormButton
          text={"削除"}
          color={"red"}
          onClick={async (): Promise<void> => {
            if (prevShipToAddress) {
              await destroyShipToAddress(prevShipToAddress.id);
            }
          }}
        />
        <Paragraph isLink isCenter isMarginTop clickFunction={handleOnCloseButtonClick}>
          削除をやめる
        </Paragraph>
      </div>
    </EduITModal>
  );
};

export default ShipToAddressDeleteModal;
