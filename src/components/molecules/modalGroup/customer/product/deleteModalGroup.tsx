"use client";

import ModalSm from "@/components/atoms/modal/modalSm";
import ModalTitle from "@/components/atoms/modal/modalTitle";
import FormButton from "@/components/atoms/button/formButton";
import ModalCloseButton from "@/components/atoms/modal/modalCloseButton";
import Paragraph from "@/components/atoms/text/paragraph";
import { ReactElement } from "react";
// import { ProductDbTableType } from "@/types/db/product/product";

const DeleteModalGroup = ({
  // prevProduct,
  isOpen,
  handleOnCloseButtonClick,
  handleOnClickDestroyButton,
}: {
  // prevProduct: ProductDbTableType;
  isOpen: boolean;
  handleOnCloseButtonClick: () => void;
  handleOnClickDestroyButton: () => void;
}): ReactElement => {
  // const { destroyProduct, isDestroyed, setIsDestroyed } = useDestroy();

  // useEffect((): void => {
  //   if (isOpen) {
  //     setIsDestroyed(prevState => false);
  //   }
  // }, [ isOpen, prevProduct, setIsDestroyed ]);

  // useEffect((): void => {
  //   if (isDestroyed) {
  //     handleOnClickDestroyButton();
  //   }
  // }, [ isDestroyed, handleOnClickDestroyButton ]);

  return (
    <ModalSm isOpen={isOpen} onRequestClose={handleOnCloseButtonClick}>
      <ModalTitle text={"商品マスタ削除"} />
      <div className="my-4">
        <Paragraph fontSize="13px">
          商品マスタから削除します。問題ないか確認のうえ、削除する場合は以下のボタンを押してください。
        </Paragraph>
      </div>
      <div>
        <FormButton
          text={"削除"}
          color={"red"}
          // onClick={async (): Promise<void> => {
          //   await destroyProduct(prevProduct.id);
          // }}
        />
        <ModalCloseButton handleClose={handleOnCloseButtonClick} />
      </div>
    </ModalSm>
  );
};

export default DeleteModalGroup;
