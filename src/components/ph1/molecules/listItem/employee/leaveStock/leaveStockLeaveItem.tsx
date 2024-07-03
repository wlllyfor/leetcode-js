import { Dispatch, ReactElement, SetStateAction } from "react";
import commonClasses from "@/styles/common/page.module.scss";
import Image from "next/image";
import Paragraph from "@/components/atoms/paragraph";
import ImageSrc from "@/resource/img/dummy.jpg";
import { LeaveStockTableDbType } from "@/types/db/leaveStock/leaveStock";
import { LeaveStockProductDbTableType } from "@/types/db/leaveStock/leaveStockProduct";
import { UUID } from "@/lib/uuid";
import WhiteWideWrapper from "@/components/atoms/div/wrapper/whiteWideWrapper";
import Status from "@/components/molecules/status";
import SmallButton from "@/components/atoms/button/smallButton";

const LeaveStockLeaveItem = ({
  leaveStock,
  setSelectedLeaveStock,
  handleOnClickOpenEditModal,
}: {
  leaveStock: LeaveStockTableDbType;
  setSelectedLeaveStock: Dispatch<SetStateAction<LeaveStockTableDbType | null>>;
  handleOnClickOpenEditModal: () => void;
}): ReactElement => {
  const classNamesMr16 = [
    commonClasses.flex__wrapper,
    commonClasses.aline_center,
    commonClasses.mt_8,
    commonClasses.c_mr_16,
  ];
  return (
    <WhiteWideWrapper>
      <div className={`${commonClasses.flex__wrapper} ${commonClasses.aline_center} ${commonClasses.justify_between}`}>
        <div className={`${commonClasses.flex__wrapper} ${commonClasses.aline_center}`}>
          <div className={commonClasses.ml_16}>
            {leaveStock.leaveStockProducts.map((leaveProduct: LeaveStockProductDbTableType) => {
              return (
                <Image
                  key={UUID.generate()}
                  src={leaveProduct.product.productImageUrl || ImageSrc}
                  alt={""}
                  width={120}
                  height={80}
                />
              );
            })}
          </div>
          <div className={commonClasses.ml_16}>
            <div className={classNamesMr16.join(" ")}>
              <Paragraph>顧客名：{leaveStock.customer?.name}</Paragraph>
              <Paragraph>出庫ID：{leaveStock.code}</Paragraph>
            </div>
          </div>
          {leaveStock.leaveStockProducts.map((leaveProduct: LeaveStockProductDbTableType) => {
            return (
              <div key={UUID.generate()} className={commonClasses.ml_16}>
                <div className={classNamesMr16.join(" ")}>
                  <Paragraph>{leaveProduct.product.code}</Paragraph>
                  <Paragraph>{leaveProduct.product.name}</Paragraph>
                  <Paragraph>
                    バーコード管理：{leaveProduct.product.label}({leaveProduct.product.productLabelType})
                  </Paragraph>
                </div>
                {/* todo: PH2 */}
                {/*<div className={`${commonClasses.mt_8} ${commonClasses.c_mr_16}`}>*/}
                {/*  <Paragraph>ロケーションID：111111</Paragraph>*/}
                {/*</div>*/}
              </div>
            );
          })}
          <div className={commonClasses.ml_16}>
            <div className={classNamesMr16.join(" ")}>
              <Paragraph isBold>{leaveStock.code}</Paragraph>
              {leaveStock.receivedOn ? (
                <Paragraph>{leaveStock.receivedOn} 入庫</Paragraph>
              ) : (
                <Paragraph>未入庫</Paragraph>
              )}
            </div>
          </div>
        </div>
        <div className={`${commonClasses.flex__wrapper} ${commonClasses.aline_end} ${commonClasses.column}`}>
          <Status color={"dark"}>{leaveStock.statusLabel}</Status>
          <div className={commonClasses.mt_16}>
            <SmallButton
              text={"編集"}
              isBlue
              clickFunction={(): void => {
                setSelectedLeaveStock(prevState => leaveStock);
                handleOnClickOpenEditModal();
              }}
            />
          </div>
        </div>
      </div>
    </WhiteWideWrapper>
  );
};

export default LeaveStockLeaveItem;
