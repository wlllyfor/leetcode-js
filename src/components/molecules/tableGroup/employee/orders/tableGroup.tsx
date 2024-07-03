"use client";

import React, { ReactElement, useId, useState } from "react";
import ContentAreaWrapper from "@/components/atoms/div/wrapper/contentAreaWrapper";
import FlexWrapperColumn from "@/components/atoms/div/wrapper/flexWrapperColumn";
import TableRow from "@/components/atoms/table/tableRow";
import Table from "@/components/atoms/table/table";
import TableDataText from "@/components/atoms/table/tableDataText";
import TableDataUrl from "@/components/atoms/table/tableDataUrl";
import TableDataTexts from "@/components/atoms/table/tableDataTexts";
import TableDataTextsWithLabel from "@/components/atoms/table/tableDataTextsWithLabel";
import TableDataImage from "@/components/atoms/table/tableDataImage";
import TableDataEnd from "@/components/atoms/table/tableDataEnd";
import TableButton from "@/components/atoms/button/tableButton";
import TableHeader from "@/components/molecules/tableColumn/employee/orders/tableHeader";
import TableTitle from "@/components/molecules/tableColumn/employee/orders/tableTitle";
import TableHeadCheckbox from "@/components/molecules/tableColumn/employee/orders/tableHeadCheckbox";
import TableDataCheckbox from "@/components/molecules/tableColumn/employee/orders/tableDataCheckbox";
import { TableGroupType } from "@/types/components/molecules/tableGroup/employee/orders/TableGroupType";
import { UUID } from "@/lib/uuid";
import { Else, If, Then } from "react-if";
import { enumOrderType } from "@/types/enum/enumOrderType";
import { enumOrderStatus } from "@/types/enum/enumOrderStatus";

const TableGroup = ({
  handleEditButtonClick,
  orderDetails,
  handleOnChecked,
  checkedOrderDetails,
}: TableGroupType): ReactElement => {
  const inputId = useId();
  const refundTexts = [ "12345", "返金内容が入ります。" ];

  // 全チェックボックスの状態を管理するstate
  const [ allChecked, setAllChecked ] = useState<boolean>(false);

  // 全てのチェックボックスを制御する関数
  const handleAllCheck = (checked: boolean) => {
    setAllChecked(checked);
  };

  return (
    <ContentAreaWrapper>
      <Table layout="table-fixed" width="w-[216rem]" key={UUID.generate()}>
        {orderDetails?.map(orderDetail => {
          const unitName: string = `${orderDetail.order.hub.currency.nameToJp}(${orderDetail.order.hub.currency.name})`;

          const getColorCode = (): string => {
            const isRed = (orderDetail.orderStatus === enumOrderStatus.canceling);
            const isGray = (
              orderDetail.orderStatus === enumOrderStatus.canceled ||
              orderDetail.orderStatus === enumOrderStatus.paid
            );
            const isCreamColor = (orderDetail.orderStatus === enumOrderStatus.unProcessed);

            if (isRed) {
              return "bg-[#FFC6C6]";
            }
            if (isGray) {
              return "bg-[#D3D3D3]";
            }
            if (isCreamColor) {
              return "bg-[#FFFEE2]";
            }

            return "bg-white";
          };


          const isChecked = !!checkedOrderDetails.find(item => item.uuid === orderDetail.uuid);

          const subTotal = orderDetail.quantity * orderDetail.unitPrice;
          const postage = orderDetail.postage;
          const sumOtherPrices = orderDetail.orderDetailOthers.reduce((sum, currentValue) => {
            return sum + currentValue.quantity * currentValue.price;
          }, 0);
          const currentTaxRate = orderDetail.order.hub.currentTaxRate?.rate ?? 0;
          const includedTax = (subTotal + postage + sumOtherPrices) * (currentTaxRate / 100);
          const total = subTotal + postage + sumOtherPrices + includedTax;

          // 買付手数料計算 := 小計(subTotal)に対して。
          const purchaseFeeRate = (orderDetail.order.hub.currentCustomerPlan?.purchaseFee ?? 0) / 100;
          const purchaseFee = subTotal * purchaseFeeRate;

          // 引落済み金額
          const depositedTransaction = orderDetail.depositTransactions;
          const sumDepositedPrice = depositedTransaction.reduce((sum, currentValue) => {
            return sum + currentValue.price;
          }, 0);

          return (
            <React.Fragment key={orderDetail.uuid}>
              <If condition={orderDetail.orderToShowHeader}>
                <Then>
                  <tr className="bg-[#FADE7B]">
                    <th className="w-14 min-w-14 rounded-tl-lg"></th>
                    <TableTitle
                      colSpan={3} fontSize="text-lg"
                      text={`${orderDetail?.order?.customer?.code ?? ""}  ${orderDetail?.order?.createdOn} (${orderDetail?.order?.detailCount}件)`}
                    />
                  </tr>
                </Then>
              </If>
              <If condition={orderDetail.shopNameToShowHeader}>
                <Then>
                  <tr className="bg-[#FADE7B]">
                    <TableHeadCheckbox
                      id={`${inputId}-all`} checked={allChecked} width="w-14" minWidth="min-w-14"
                      changeFunction={handleAllCheck}
                    />
                    <TableHeader colSpan={23} text={`${orderDetail.mall}：${orderDetail.shopName}`} />
                    {/* モールごとの件数は一旦保留 */}
                    {/*<TableHeader colSpan={23} text="1688：仕入先A (3件)" />*/}
                  </tr>
                </Then>
              </If>
              <TableRow bgColor={getColorCode()}>
                <TableDataCheckbox
                  id={orderDetail.uuid} checked={isChecked} width="w-14" minWidth="min-w-14"
                  onChange={e => {
                    handleOnChecked(e, orderDetail.uuid);
                  }}
                />
                <TableDataTexts
                  texts={[ orderDetail.order.customer?.code ?? "", orderDetail.order.customer?.name ?? "" ]}
                  width="w-24"
                />
                <TableDataTexts
                  texts={[
                    orderDetail.order.hub.name ?? "",
                    (orderDetail.order.customer?.currentCustomerPlan?.employee?.id.toString() ?? "") + "/" + (orderDetail.order.customer?.currentCustomerPlan?.employee?.name ?? ""),
                  ]}
                  width="w-52"
                />
                {/* ステータス */}
                <TableDataText text={orderDetail.orderStatusLabel} width="w-28" />
                <TableDataTextsWithLabel
                  texts={[ orderDetail.trackingNo ?? "追跡番号なし", orderDetail.mallOrderId ?? "モール注文番号なし" ]}
                  labelType={orderDetail.mall ? enumOrderType.cart : enumOrderType.oem}
                  labelText={orderDetail.mall ? "カート" : "OEM"}
                  width="w-36"
                />
                <TableDataUrl text={orderDetail.product.productUrl ?? ""} width="w-24" minWidth="min-w-24" />
                <TableDataText text={orderDetail.product.name ?? ""} width="w-24" />
                <TableDataText text={orderDetail.product.sku ?? ""} width="w-28" />
                <TableDataImage
                  text="" imageUrl={orderDetail.product.productImageUrl ?? "/images/dummy/dummy-image.png"}
                  width="w-24"
                />
                <TableDataText text={orderDetail.variation ?? ""} width="w-36" />
                <TableDataText text={orderDetail.quantity.toLocaleString()} width="w-24" />
                <TableDataText
                  text={`${orderDetail.unitPrice.toLocaleString()}${unitName}`}
                  width="w-24"
                />
                {/* 小計 */}
                <TableDataText
                  text={`${subTotal.toLocaleString()}${unitName}`}
                  width="w-24"
                />
                {/* 買付手数料とは？ */}
                <TableDataText
                  text={`${purchaseFee.toLocaleString()}${unitName}`}
                  width="w-28"
                />
                <TableDataText
                  text={`${postage.toLocaleString()}${unitName}`}
                  width="w-24"
                />
                {/* その他金額 others */}
                <If condition={orderDetail.orderDetailOthers.length > 0}>
                  <Then>
                    <TableDataTexts
                      texts={
                        [ ...[ sumOtherPrices.toLocaleString() + unitName ],
                          ...orderDetail.orderDetailOthers.map(other => {
                            return `${other.name}: ${other.price.toLocaleString()}${unitName}×${other.quantity.toLocaleString()}=${(other.price * other.quantity).toLocaleString()}${unitName}`;
                          }) ]} width="w-80"
                    /></Then>
                  <Else>
                    <TableDataTexts texts={[]} width="w-80" />
                  </Else>
                </If>
                {/* 内税 */}
                <TableDataText text={`${includedTax.toLocaleString()}${unitName}`} />
                {/* 合計 */}
                <TableDataText
                  text={`${total.toLocaleString()}${unitName}`}
                  width="w-24"
                />
                {/* 引落予定金額 */}
                <TableDataText
                  text={`${total.toLocaleString()}${unitName}`}
                  width="w-24"
                />
                {/* 引落済み金額、引落ステータス */}
                <TableDataTexts
                  texts={[ `${sumDepositedPrice.toLocaleString()}${unitName}` ]}
                  width="w-36"
                />
                {/* 返金額、返金内容 */}
                <TableDataTexts texts={refundTexts} width="w-56" />

                {/* 備考 */}
                <TableDataText text={orderDetail.publicRemarks} width="w-24" />

                {/* 注文明細 */}
                <TableDataText text="注文明細が入ります。" width="w-28" />

                <TableDataEnd>
                  <FlexWrapperColumn>
                    <TableButton text="編集" color="blue" handleClick={handleEditButtonClick} />
                  </FlexWrapperColumn>
                </TableDataEnd>
              </TableRow>
            </React.Fragment>
          );
        })}
      </Table>
    </ContentAreaWrapper>
  );
};

export default TableGroup;
