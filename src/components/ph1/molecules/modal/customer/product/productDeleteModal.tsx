"use client";

import H2 from "@/components/atoms/h2";
import FormButton from "@/components/atoms/button/formButton";
import commonClasses from "@/styles/common/page.module.scss";
import Paragraph from "@/components/atoms/paragraph";
import { EduITModal } from "@/components/molecules/eduITModal";
import { ReactElement, useEffect } from "react";
import { ProductDbTableType } from "@/types/db/product/product";
import { useDestroy } from "@/hooks/customer/product/useDestroy";

const ProductDeleteModal = ({
  prevProduct,
  isOpen,
  handleOnCloseButtonClick,
  handleOnClickDestroyButton,
}: {
  prevProduct: ProductDbTableType;
  isOpen: boolean;
  handleOnCloseButtonClick: () => void;
  handleOnClickDestroyButton: () => void;
}): ReactElement => {
  const { destroyProduct, isDestroyed, setIsDestroyed } = useDestroy();

  useEffect((): void => {
    if (isOpen) {
      setIsDestroyed(prevState => false);
    }
  }, [ isOpen, prevProduct, setIsDestroyed ]);

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
          商品マスタから削除します。問題ないか確認のうえ、削除する場合は以下のボタンを押してください。
        </Paragraph>
      </div>
      <div className={commonClasses.mt_24}>
        <FormButton
          text={"削除"}
          color={"red"}
          onClick={async (): Promise<void> => {
            await destroyProduct(prevProduct.id);
          }}
        />
        <Paragraph isLink isCenter isMarginTop clickFunction={handleOnCloseButtonClick}>
          削除をやめる
        </Paragraph>
      </div>
    </EduITModal>
  );
};

export default ProductDeleteModal;
