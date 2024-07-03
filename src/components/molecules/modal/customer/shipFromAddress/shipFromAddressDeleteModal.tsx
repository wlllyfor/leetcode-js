"use client";

import H2 from "@/components/atoms/h2";
import FormButton from "@/components/atoms/button/formButton";
import commonClasses from "@/styles/common/page.module.scss";
import Paragraph from "@/components/atoms/paragraph";
import { EduITModal } from "@/components/molecules/eduITModal";
import { ReactElement, useEffect } from "react";
import { ShipFromAddressDbTableType } from "@/types/db/shipFromAddress";
import { useDestroy } from "@/hooks/customer/shipFromAddress/useDestroy";

const ShipFromAddressDeleteModal = ({
  prevShipFromAddress,
  isOpen,
  handleOnCloseButtonClick,
  handleOnClickDestroyButton,
}: {
  prevShipFromAddress: ShipFromAddressDbTableType | null;
  isOpen: boolean;
  handleOnCloseButtonClick: () => void;
  handleOnClickDestroyButton: () => void;
}): ReactElement => {
  const { destroyShipFromAddress, isDestroyed, setIsDestroyed } = useDestroy();

  useEffect((): void => {
    if (isOpen) {
      setIsDestroyed(prevState => false);
    }
  }, [ isOpen, prevShipFromAddress, setIsDestroyed ]);

  useEffect((): void => {
    if (isOpen && isDestroyed) {
      handleOnClickDestroyButton();
    }
  }, [ isOpen, isDestroyed, handleOnClickDestroyButton ]);

  return (
    <EduITModal isOpen={isOpen}>
      <H2>削除</H2>
      <div className={commonClasses.mt_16}>
        <Paragraph isSmall isLeft>
          配送元マスタから削除します。問題ないか確認のうえ、削除する場合は以下のボタンを押してください。
        </Paragraph>
      </div>
      <div className={commonClasses.mt_24}>
        <FormButton
          text={"削除"}
          color={"red"}
          onClick={async (): Promise<void> => {
            if (prevShipFromAddress) {
              await destroyShipFromAddress(prevShipFromAddress.id);
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

export default ShipFromAddressDeleteModal;
