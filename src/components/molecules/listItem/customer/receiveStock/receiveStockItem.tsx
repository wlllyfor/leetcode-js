"use client";

import { ReactElement, useEffect } from "react";
import commonClasses from "@/styles/common/page.module.scss";
import WhiteWideWrapper from "@/components/atoms/div/wrapper/whiteWideWrapper";
import Image from "next/image";
import Paragraph from "@/components/atoms/paragraph";
import ImageSrc from "@/resource/img/dummy.jpg";
import Status from "@/components/molecules/status";
import SmallButton from "@/components/atoms/button/smallButton";
import { ReceiveStockDbTableType } from "@/types/db/receiveStock/receiveStock";
import { ReceiveStockDetailDbTableType } from "@/types/db/receiveStock/receiveStockDetail";
import ReceiveStockEditModal from "@/components/molecules/modal/customer/receiveStock/receiveStockEditModal";
import ReceiveStockDeleteModal from "@/components/molecules/modal/customer/receiveStock/receiveStockDeleteModal";
import { useModal } from "@/hooks/useModal";

const ReceiveStockItem = ({
  receiveStock,
  receiveStockDetail,
}: {
  receiveStock: ReceiveStockDbTableType;
  receiveStockDetail: ReceiveStockDetailDbTableType;
}): ReactElement => {
  // 修正用モーダル変数
  const {
    isOpen: isEditModalOpen,
    setIsOpen: setIsEditModalOpen,
    handleOnCloseButtonClick: handleOnEditModalCloseButtonClick,
  } = useModal();

  // 削除用モーダル変数
  const {
    isOpen: isDeleteModalOpen,
    setIsOpen: setIsDeleteModalOpen,
    handleOnCloseButtonClick: handleOnDeleteModalCloseButtonClick,
  } = useModal();

  useEffect((): void => {
    setIsEditModalOpen(prevState => false);
    setIsDeleteModalOpen(prevState => false);
  }, [ setIsEditModalOpen, setIsDeleteModalOpen ]);

  /**
   * 更新ボタン押下イベント
   * 更新処理はモーダルで行う
   */
  const handleOnClickUpdateButton = (): void => {
    setIsEditModalOpen(prevState => false);
  };

  /**
   * 削除ボタン押下イベント
   * 削除処理はモーダルで行う
   */
  const handleOnClickDestroyButton = (): void => {
    setIsDeleteModalOpen(prevState => false);
  };

  const classNamesMr16 = [
    commonClasses.flex__wrapper,
    commonClasses.aline_center,
    commonClasses.mt_8,
    commonClasses.c_mr_16,
  ];

  const classNamesAlignEnd = [
    commonClasses.flex__wrapper,
    commonClasses.aline_end,
    commonClasses.column,
    commonClasses.ml_auto,
    commonClasses.mr_16,
  ];

  return (
    <>
      <WhiteWideWrapper>
        <div className={`${commonClasses.flex__wrapper} ${commonClasses.aline_center}`}>
          <div className={commonClasses.ml_16}>
            <Image src={receiveStockDetail.product?.productImageUrl || ImageSrc} alt={""} width={120} height={80} />
          </div>
          <div className={commonClasses.ml_16}>
            <div className={classNamesMr16.join(" ")}>
              <Paragraph isBold>{receiveStock.code}</Paragraph>
              <Paragraph>{receiveStockDetail.product?.name || "無効な商品"}</Paragraph>
            </div>
            <div className={classNamesMr16.join(" ")}>
              <Paragraph>お客様SKU：{receiveStockDetail.product?.sku}</Paragraph>
              <Paragraph>追跡番号：{receiveStock.trackingNo}</Paragraph>

              <Paragraph>
                手数料：
                {receiveStock.receiveStockCommissions
                  .reduce((total, receiveStockCommission) => {
                    return total + receiveStockCommission.price;
                  }, 0)
                  .toLocaleString()}
                円
              </Paragraph>
              <Paragraph>入庫数：{receiveStockDetail.receiveQuantity.toLocaleString()}</Paragraph>
            </div>
            <div className={classNamesMr16.join(" ")}>
              <Paragraph>注文ID：{receiveStock.orderDetail?.order.code || "なし"}</Paragraph>
              <Paragraph>入庫日：{receiveStock.receivedOn || "なし"}</Paragraph>
              <Paragraph>備考：{receiveStock.publicRemarks || "なし"}</Paragraph>
            </div>
          </div>
          <div className={classNamesAlignEnd.join(" ")}>
            <div className={`${commonClasses.flex__wrapper}`}>
              <div className={commonClasses.mr_8}>
                <Paragraph isGray>{receiveStock.createdOn} 依頼</Paragraph>
              </div>
              <div className={commonClasses.mr_8}>
                {receiveStock.expectedArrivedOn ? (
                  <Paragraph isGray>{`${receiveStock.expectedArrivedOn} 入荷予定`}</Paragraph>
                ) : (
                  <Paragraph isGray>入荷予定なし </Paragraph>
                )}
              </div>
              <Status color={"dark"}>入荷待ち</Status>
            </div>
            {receiveStock.isEditableStatus && (
              <div className={commonClasses.mt_16}>
                <div className={commonClasses.mt_4}>
                  <SmallButton
                    text={"編集"}
                    isBlue
                    clickFunction={() => {
                      setIsEditModalOpen(prevState => true);
                    }}
                  />
                </div>
                <div className={commonClasses.mt_4}>
                  <SmallButton text={"削除"} isRed clickFunction={() => alert("制作中")} />
                </div>
              </div>
            )}
          </div>
        </div>
      </WhiteWideWrapper>
      {receiveStock && (
        <ReceiveStockEditModal
          prevReceiveStock={receiveStock}
          isOpen={isEditModalOpen}
          handleOnCloseButtonClick={handleOnEditModalCloseButtonClick}
          handleOnClickUpdateButton={handleOnClickUpdateButton}
        />
      )}
      {receiveStock && (
        <ReceiveStockDeleteModal
          prevReceiveStock={receiveStock}
          isOpen={isDeleteModalOpen}
          handleOnCloseButtonClick={handleOnDeleteModalCloseButtonClick}
          handleOnClickDestroyButton={handleOnClickDestroyButton}
        />
      )}
    </>
  );
};

export default ReceiveStockItem;
