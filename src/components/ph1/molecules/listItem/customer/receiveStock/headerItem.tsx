"use client";

import { Dispatch, ReactElement, ReactNode, SetStateAction } from "react";
import commonClasses from "@/styles/common/page.module.scss";
import WhiteWideWrapper from "@/components/atoms/div/wrapper/whiteWideWrapper";
import Paragraph from "@/components/atoms/paragraph";
import Status from "@/components/molecules/status";
import SmallButton from "@/components/atoms/button/smallButton";
import { ReceiveStockDbTableType } from "@/types/db/receiveStock/receiveStock";
import ReceiveStockEditModal from "@/components/molecules/modal/customer/receiveStock/receiveStockEditModal";
import ReceiveStockDeleteModal from "@/components/molecules/modal/customer/receiveStock/receiveStockDeleteModal";
import Link from "next/link";

const HeaderItem = ({
  receiveStock,
  children,
  // 修正関連
  isEditModalOpen,
  setIsEditModalOpen,
  handleOnEditModalCloseButtonClick,
  // 削除関連
  isDeleteModalOpen,
  setIsDeleteModalOpen,
  handleOnDeleteModalCloseButtonClick,
}: {
  receiveStock: ReceiveStockDbTableType;
  children: ReactNode;
  isEditModalOpen: boolean;
  setIsEditModalOpen: Dispatch<SetStateAction<boolean>>;
  handleOnEditModalCloseButtonClick: () => void;
  isDeleteModalOpen: boolean;
  setIsDeleteModalOpen: Dispatch<SetStateAction<boolean>>;
  handleOnDeleteModalCloseButtonClick: () => void;
}): ReactElement => {
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
            <div className={classNamesMr16.join(" ")}>
              <Paragraph isBold>{receiveStock.code}</Paragraph>
              <Paragraph>追跡番号：{receiveStock.trackingNo}</Paragraph>
              <Paragraph>注文ID：{receiveStock.orderDetail?.order.code || "なし"}</Paragraph>
              <Paragraph>
                手数料：
                {receiveStock.receiveStockCommissions
                  .reduce((total, receiveStockCommission) => {
                    return total + receiveStockCommission.price;
                  }, 0)
                  .toLocaleString()}
                円
              </Paragraph>
            </div>
            <div className={classNamesMr16.join(" ")}>
              <Paragraph>入庫日：{receiveStock.receivedOn || "なし"}</Paragraph>
              <Paragraph>備考：{receiveStock.publicRemarks || "なし"}</Paragraph>
              {receiveStock.publicRemarksFilePath ? (
                <Paragraph isLink>
                  <Link href={receiveStock.publicRemarksFilePath} target={"_blank"}>
                    備考添付ファイル
                  </Link>
                </Paragraph>
              ) : (
                <Paragraph>備考添付ファイル：なし</Paragraph>
              )}
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
              <Status color={"dark"}>{receiveStock.statusLabel}</Status>
            </div>
            <div className={classNamesAlignEnd.join(" ")}>
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
                    <SmallButton
                      text={"削除"}
                      isRed
                      clickFunction={() => {
                        setIsDeleteModalOpen(prevState => true);
                      }}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
          {children}
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

export default HeaderItem;
