import { Dispatch, ReactElement, SetStateAction } from "react";
import commonClasses from "@/styles/common/page.module.scss";
import WhiteWideWrapper from "@/components/atoms/div/wrapper/whiteWideWrapper";
import Image from "next/image";
import Paragraph from "@/components/atoms/paragraph";
import SmallButton from "@/components/atoms/button/smallButton";
import ImageSrc from "@/resource/img/dummy.jpg";
import Status from "@/components/molecules/status";
import { LeaveStockTableDbType } from "@/types/db/leaveStock/leaveStock";
import { UUID } from "@/lib/uuid";

const LeaveStockItem = ({
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
            {leaveStock.leaveStockProducts.map(leaveStockProduct => {
              return (
                <Image
                  key={UUID.generate()}
                  src={leaveStockProduct.product.productImageUrl || ImageSrc}
                  alt={""}
                  width={120}
                  height={80}
                />
              );
            })}
          </div>
          <div className={`${commonClasses.flex__wrapper} ${commonClasses.column}`}>
            <div className={`${commonClasses.ml_16} ${commonClasses.bb_solid}`}>
              <div className={classNamesMr16.join(" ")}>
                <Paragraph>
                  {leaveStock.countryId === leaveStock.shipFromAddress?.countryId ? "国内出荷" : "国際出荷"}
                </Paragraph>
                <Paragraph>出荷作業開始日：{leaveStock.leaveStartedOn || "未設定"} </Paragraph>
                <Paragraph>追跡番号：{leaveStock.trackingNo || "未設定"}</Paragraph>
                <Paragraph>注文ID：{leaveStock.orderDetail?.order?.code || "注文未連携"} </Paragraph>

                {leaveStock.leaveStockProducts.map(leaveStockProduct => {
                  return <Paragraph key={UUID.generate()}>商品ID：{leaveStockProduct.product.code} </Paragraph>;
                })}
              </div>
              <div className={classNamesMr16.join(" ")}>
                {/* todo: PH2で拠点対応 */}
                <Paragraph>拠点：中国</Paragraph>
                <Paragraph>
                  対応スタッフ：
                  {leaveStock.customer?.employee?.name || "スタッフ無し"}
                </Paragraph>
                {/* todo: 配送業者はPH2対応 */}
                <Paragraph>配送業者：佐川急便</Paragraph>
                {leaveStock.leaveStockProducts.map(leaveStockProduct => {
                  return (
                    <Paragraph key={UUID.generate()}>
                      バーコード情報：{leaveStockProduct.product.label}({leaveStockProduct.product.productLabelType})
                    </Paragraph>
                  );
                })}
              </div>
              <div className={classNamesMr16.join(" ")}>
                {leaveStock.leaveStockProducts.map(leaveStockProduct => {
                  return (
                    <div key={UUID.generate()}>
                      <Paragraph>商品名：{leaveStockProduct.product.name} </Paragraph>
                      <Paragraph>SKU：{leaveStockProduct.product.sku}</Paragraph>
                      <Paragraph>
                        商品サイズ：
                        {leaveStockProduct.product.height}×{leaveStockProduct.product.width}×
                        {leaveStockProduct.product.depth}
                      </Paragraph>
                      <Paragraph>商品重量：{leaveStockProduct.product.weight}</Paragraph>
                      <Paragraph>商品出荷数：{leaveStockProduct.product.stockQuantity}</Paragraph>
                    </div>
                  );
                })}
              </div>
              <div className={classNamesMr16.join(" ")}>
                {leaveStock.leaveStockPacks.map(leaveStockPack => {
                  return (
                    <div key={UUID.generate()}>
                      <Paragraph>
                        梱包サイズ：{leaveStockPack.height}×{leaveStockPack.width}×{leaveStockPack.depth}
                      </Paragraph>
                      <Paragraph>梱包重量：{leaveStockPack.weight}</Paragraph>
                      <Paragraph>梱包箱数：{leaveStockPack.boxesQuantity} </Paragraph>
                    </div>
                  );
                })}
                <Paragraph>総合計金額：{"何の合計？？"}</Paragraph>
                <Paragraph>
                  注文番号：
                  {leaveStock.orderDetail?.order?.code || "注文番号なし"}
                </Paragraph>
              </div>
            </div>
            <div className={`${commonClasses.ml_16}`}>
              <div className={classNamesMr16.join(" ")}>
                <Paragraph>送料単価：20円</Paragraph>
                <Paragraph>送料合計：20円</Paragraph>
              </div>
              <div>{/*<Toggle receiveStock={} text={[]} />*/}</div>
              <div className={classNamesMr16.join(" ")}>
                <Paragraph>配送先：{leaveStock.country?.name} </Paragraph>
                <Paragraph>
                  {leaveStock.prefectureName}
                  {leaveStock.cityName}
                  {leaveStock.townName}
                  {leaveStock.buildingName}
                  {leaveStock.name}
                </Paragraph>
                <Paragraph>(TEL：{leaveStock.tel})</Paragraph>
                {/* todo: 配送指定日とは？？ */}
                <Paragraph>配送指定日時： 2023.10.22(10:00-12:00)</Paragraph>
              </div>
              <div className={classNamesMr16.join(" ")}>
                <Paragraph>配送元：{leaveStock.shipFromAddress?.country?.name} </Paragraph>
                <Paragraph>
                  {leaveStock.shipFromAddress?.prefectureName}
                  {leaveStock.shipFromAddress?.cityName}
                  {leaveStock.shipFromAddress?.townName}
                  {leaveStock.shipFromAddress?.buildingName}
                  {leaveStock.shipFromAddress?.name}
                </Paragraph>
                <Paragraph>(TEL：{leaveStock.shipFromAddress?.tel})</Paragraph>
                {/* todo: 配送指定日とは？？ */}
                <Paragraph>配送指定日時： 2023.10.22(10:00-12:00)</Paragraph>
              </div>
              <div className={classNamesMr16.join(" ")}>
                <Paragraph>備考：{leaveStock.publicRemarks || "未記載"}</Paragraph>
              </div>
              <div className={classNamesMr16.join(" ")}>
                <Paragraph>管理メモ：{leaveStock.privateRemarks || "未記載"}</Paragraph>
              </div>
            </div>
          </div>
        </div>
        <div className={classNamesMbAuto.join(" ")}>
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

export default LeaveStockItem;
