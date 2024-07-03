"use client";

import H2 from "@/components/atoms/h2";
import FormButton from "@/components/atoms/button/formButton";
import commonClasses from "@/styles/common/page.module.scss";
import Paragraph from "@/components/atoms/paragraph";
import { ReactElement, useEffect } from "react";
import { ProductDbTableType } from "@/types/db/product/product";
import { useDestroy } from "@/hooks/employee/product/useDestroy";
import { EduITModal } from "@/components/molecules/eduITModal";

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

  /**
   * 削除後の処理
   */
  useEffect((): void => {
    if (isDestroyed) {
      handleOnClickDestroyButton();
    }
  }, [ isDestroyed, handleOnClickDestroyButton ]);

  return (
    <EduITModal isOpen={isOpen}>
      <H2>削除処理</H2>
      <div className={commonClasses.mt_16}>
        <Paragraph isSmall isLeft>
          選択中の商品を削除します。よろしいですか？
        </Paragraph>
      </div>
      <div className={commonClasses.mt_24}>
        <FormButton
          text={"削除する"}
          color={"red"}
          onClick={async (): Promise<void> => await destroyProduct(prevProduct.id)}
        />
        <Paragraph isLink isCenter isMarginTop clickFunction={handleOnCloseButtonClick}>
          商品管理へ戻る
        </Paragraph>
      </div>
    </EduITModal>
  );
};

export default ProductDeleteModal;
