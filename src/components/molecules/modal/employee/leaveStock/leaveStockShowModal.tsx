"use client";

import { Dispatch, ReactElement, SetStateAction } from "react";
import H2 from "@/components/atoms/h2";
import commonClasses from "@/styles/common/page.module.scss";
import Paragraph from "@/components/atoms/paragraph";
import { EduITModal } from "@/components/molecules/eduITModal";
import { LeaveStockTableDbType } from "@/types/db/leaveStock/leaveStock";
import { LeaveStockProductDbTableType } from "@/types/db/leaveStock/leaveStockProduct";
import { UUID } from "@/lib/uuid";

const LeaveStockShowModal = ({
  isOpen,
  handleOnCloseButtonClick,
  selectedLeaveStockToShow,
  setSelectedLeaveStockToShow,
}: {
  isOpen: boolean;
  handleOnCloseButtonClick: () => void;
  selectedLeaveStockToShow: LeaveStockTableDbType | null;
  setSelectedLeaveStockToShow: Dispatch<SetStateAction<LeaveStockTableDbType | null>>;
}): ReactElement => {
  return (
    <EduITModal isOpen={isOpen}>
      <H2>出庫処理確認</H2>
      <div className={commonClasses.mt_16}>
        <Paragraph isBold isLeft>
          商品名
        </Paragraph>
        {selectedLeaveStockToShow?.leaveStockProducts.map((leaveStockProduct: LeaveStockProductDbTableType) => {
          return (
            <Paragraph key={UUID.generate()} isLeft>
              {leaveStockProduct.product.name}
            </Paragraph>
          );
        })}
      </div>
      <div className={commonClasses.mt_16}>
        <Paragraph isBold isLeft>
          バーコード情報
        </Paragraph>
        {selectedLeaveStockToShow?.leaveStockProducts.map((leaveStockProduct: LeaveStockProductDbTableType) => {
          return (
            <Paragraph key={UUID.generate()} isLeft>
              {leaveStockProduct.product.label}
            </Paragraph>
          );
        })}
      </div>
      <div className={commonClasses.mt_16}>
        <Paragraph isBold isLeft>
          数量
        </Paragraph>
        {selectedLeaveStockToShow?.leaveStockProducts.map((leaveStockProduct: LeaveStockProductDbTableType) => {
          return (
            <Paragraph key={UUID.generate()} isLeft>
              {leaveStockProduct.requestedLeaveQuantity}
            </Paragraph>
          );
        })}
      </div>
      <div className={commonClasses.mt_16}>
        <Paragraph isBold isLeft>
          備考
        </Paragraph>
        <Paragraph isLeft>{selectedLeaveStockToShow?.publicRemarks || ""}</Paragraph>
      </div>
      <div className={commonClasses.mt_24}>
        <Paragraph
          isLink
          isCenter
          isMarginTop
          clickFunction={(): void => {
            setSelectedLeaveStockToShow(prevState => null);
            handleOnCloseButtonClick();
          }}
        >
          出庫管理へ戻る
        </Paragraph>
      </div>
    </EduITModal>
  );
};

export default LeaveStockShowModal;
