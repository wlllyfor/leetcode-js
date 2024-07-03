import { Dispatch, ReactElement, SetStateAction } from "react";
import commonClasses from "@/styles/common/page.module.scss";
import WhiteWideWrapper from "@/components/atoms/div/wrapper/whiteWideWrapper";
import Image from "next/image";
import Paragraph from "@/components/atoms/paragraph";
import SmallButton from "@/components/atoms/button/smallButton";
import ImageSrc from "@/resource/img/dummy.jpg";
import Status from "@/components/molecules/status";
import Toggle from "@/components/molecules/toggle";
import Badge from "@/components/molecules/badge";
import { ReceiveStockDbTableType } from "@/types/db/receiveStock/receiveStock";
import { UUID } from "@/lib/uuid";
import { enumReceiveStockType } from "@/types/enum/enumReceiveStockType";

const ReceiveStockItem = ({
  receiveStock,
  setSelectedReceiveStock,
  handleOnClickOpenEditModal,
}: {
  receiveStock: ReceiveStockDbTableType;
  setSelectedReceiveStock: Dispatch<SetStateAction<ReceiveStockDbTableType | null>>;
  handleOnClickOpenEditModal: () => void;
}): ReactElement => {
  const classNames = [
    commonClasses.flex__wrapper,
    commonClasses.aline_center,
    commonClasses.mt_8,
    commonClasses.c_mr_16,
  ];

  const classNamesMbAuto = [
    commonClasses.flex__wrapper,
    commonClasses.aline_end,
    commonClasses.column,
    commonClasses.mb_auto,
  ];

  return (
    <WhiteWideWrapper>
      <div className={`${commonClasses.flex__wrapper} ${commonClasses.aline_center} ${commonClasses.justify_between}`}>
        <div className={`${commonClasses.flex__wrapper}`}>
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
          <div className={`${commonClasses.flex__wrapper} ${commonClasses.column}`}>
            <div className={`${commonClasses.ml_16}`}>
              <div className={classNames.join(" ")}>
                <Paragraph>
                  {receiveStock.customer?.name} /{receiveStock.customer?.code}
                </Paragraph>
              </div>
              <div className={classNames.join(" ")}>
                <Paragraph isBold>{receiveStock.code}</Paragraph>
                <Paragraph>{receiveStock.createdOn} 依頼</Paragraph>
                {receiveStock.expectedArrivedOn ? (
                  <Paragraph>{receiveStock.expectedArrivedOn} 入荷予定</Paragraph>
                ) : (
                  <Paragraph>入荷予定日未設定</Paragraph>
                )}
                {receiveStock.receivedOn ? (
                  <Paragraph>{receiveStock.receivedOn} 入庫</Paragraph>
                ) : (
                  <Paragraph>未入庫</Paragraph>
                )}
              </div>
              <div className={classNames.join(" ")}>
                <Paragraph>追跡番号：{receiveStock.trackingNo || "なし"}</Paragraph>
                <Paragraph>注文ID：{receiveStock.orderDetail?.order.code || "なし"}</Paragraph>
                {/* https://eduit-inc.atlassian.net/browse/YIWUWMS-262 */}
                {/*<Paragraph>拠点：日本</Paragraph>*/}
                <Paragraph>
                  対応スタッフ：
                  {receiveStock.customer?.employee?.name || "なし"}
                </Paragraph>
              </div>
              {receiveStock.receiveStockDetails.map(item => {
                return (
                  <div key={UUID.generate()}>
                    <div className={classNames.join(" ")}>
                      <Paragraph>
                        商品名：{item.product.name}
                        <Badge color={"blue"}>{item.product.productTypeLabel}</Badge>
                      </Paragraph>
                      <Paragraph>SKU：{item.product.sku}</Paragraph>
                      <Paragraph>
                        バーコード管理：{item.product.label} {item.product.productLabelType}
                      </Paragraph>
                    </div>
                    <div className={classNames.join(" ")}>
                      <Paragraph>入荷依頼数：{item.requestedReceiveQuantity}</Paragraph>
                      <Paragraph>入庫数：{item.receiveQuantity}</Paragraph>
                    </div>
                  </div>
                );
              })}
              <div className={classNames.join(" ")}>
                <Paragraph>備考：{receiveStock.publicRemarks}</Paragraph>
              </div>
              <div className={classNames.join(" ")}>
                <Paragraph>管理メモ：{receiveStock.privateRemarks}</Paragraph>
              </div>
            </div>
            <div className={`${commonClasses.ml_16} ${commonClasses.mt_8}`}>
              <Toggle receiveStock={receiveStock} />
            </div>
          </div>
        </div>
        <div className={classNamesMbAuto.join(" ")}>
          <Status color={"dark"}>{receiveStock.statusLabel}</Status>
          {receiveStock.status !== enumReceiveStockType.received && (
            <>
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
            </>
          )}
        </div>
      </div>
    </WhiteWideWrapper>
  );
};

export default ReceiveStockItem;
