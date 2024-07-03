import { Dispatch, ReactElement, SetStateAction } from "react";
import commonClasses from "@/styles/common/page.module.scss";
import WhiteWideWrapper from "@/components/atoms/div/wrapper/whiteWideWrapper";
import Image from "next/image";
import Paragraph from "@/components/atoms/paragraph";
import SmallButton from "@/components/atoms/button/smallButton";
import ImageSrc from "@/resource/img/dummy.jpg";
import Status from "@/components/molecules/status";
import { ReceiveStockDbTableType } from "@/types/db/receiveStock/receiveStock";
import { UUID } from "@/lib/uuid";
import Badge from "@/components/molecules/badge";

const ReceiveStockReceiveItem = ({
  receiveStock,
  setSelectedReceiveStock,
  handleOnClickOpenEditModal,
}: {
  receiveStock: ReceiveStockDbTableType;
  setSelectedReceiveStock: Dispatch<SetStateAction<ReceiveStockDbTableType | null>>;
  handleOnClickOpenEditModal: () => void;
}): ReactElement => {
  return (
    <WhiteWideWrapper>
      <div className={`${commonClasses.flex__wrapper} ${commonClasses.aline_center} ${commonClasses.justify_between}`}>
        <div className={`${commonClasses.flex__wrapper} ${commonClasses.aline_center}`}>
          <div className={commonClasses.ml_16}>
            {receiveStock.receiveStockDetails.map(item => {
              return (
                <Image
                  key={UUID.generate()}
                  src={item.product.productImageUrl || ImageSrc}
                  alt={""}
                  width={120}
                  height={80}
                />
              );
            })}
          </div>
          <div className={commonClasses.ml_16}>
            <div className={`${commonClasses.flex__wrapper} ${commonClasses.aline_center} ${commonClasses.c_mr_16}`}>
              <Paragraph>
                {receiveStock.customer?.name} /{receiveStock.customer?.code}
              </Paragraph>
            </div>
            <div className={`${commonClasses.flex__wrapper} ${commonClasses.aline_center} ${commonClasses.c_mr_16}`}>
              <Paragraph isBold>{receiveStock.code}</Paragraph>
              {receiveStock.receivedOn ? (
                <Paragraph>{receiveStock.receivedOn} 入荷</Paragraph>
              ) : (
                <Paragraph>未入荷</Paragraph>
              )}
            </div>
            <div className={`${commonClasses.flex__wrapper} ${commonClasses.aline_center} ${commonClasses.c_mr_16}`}>
              {receiveStock.receiveStockDetails.map(item => {
                return (
                  <div key={UUID.generate()}>
                    <Paragraph>
                      商品名：{item.product.name}
                      <Badge color={"blue"}>{item.product.productTypeLabel}</Badge>
                    </Paragraph>
                    <Paragraph>
                      バーコード管理：{item.product.label} {item.product.productLabelType}
                    </Paragraph>
                  </div>
                );
              })}
            </div>
            <div className={`${commonClasses.c_mr_16}`}>
              {/* todo: PH2 */}
              <Paragraph>ロケーションID：111111</Paragraph>
            </div>
          </div>
        </div>
        <div className={`${commonClasses.flex__wrapper} ${commonClasses.aline_end} ${commonClasses.column}`}>
          <Status color={"dark"}>{receiveStock.statusLabel}</Status>
          <div className={commonClasses.mt_16}>
            <SmallButton
              text={"編集"}
              isBlue
              clickFunction={(): void => {
                setSelectedReceiveStock(prevState => receiveStock);
                handleOnClickOpenEditModal();
              }}
            />
          </div>
        </div>
      </div>
    </WhiteWideWrapper>
  );
};

export default ReceiveStockReceiveItem;
