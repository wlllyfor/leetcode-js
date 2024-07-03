"use client";

import React, { ChangeEvent, ReactElement, useId, useState } from "react";
import ContentAreaWrapper from "@/components/atoms/div/wrapper/contentAreaWrapper";
import FlexWrapperColumn from "@/components/atoms/div/wrapper/flexWrapperColumn";
import TableRow from "@/components/atoms/table/tableRow";
import Table from "@/components/atoms/table/table";
import TableDataText from "@/components/atoms/table/tableDataText";
import TableDataUrl from "@/components/atoms/table/tableDataUrl";
import TableDataImage from "@/components/atoms/table/tableDataImage";
import TableDataEnd from "@/components/atoms/table/tableDataEnd";
import TableDeleteIconButton from "@/components/atoms/button/tableDeleteIconButton";
import TableHeaderEnd from "@/components/atoms/table/tableHeaderEnd";
import TableHeader from "@/components/atoms/table/tableHeader";
import TableHeading from "@/components/molecules/tableColumn/employee/order/cart/tableHeading";
import TableHeadCheckbox from "@/components/molecules/tableColumn/employee/order/cart/tableHeadCheckbox";
import TableHeadingCheckbox from "@/components/molecules/tableColumn/employee/order/cart/tableHeadCheckbox";
import TableDataCheckbox from "@/components/molecules/tableColumn/employee/order/cart/tableDataCheckbox";
import { TableGroupType } from "@/types/components/molecules/tableGroup/employee/order/cart/TableGroupType";
import { If, Then } from "react-if";

const TableGroup = ({
  handleEditButtonClick,
  employeeCartEntities,
  setEmployeeCartEntities,
}: TableGroupType): ReactElement => {
  const inputId = useId();

  // 全チェックボックスの状態を管理するstate
  const [ allChecked, setAllChecked ] = useState<boolean>(false);

  // handles

  // 全てのチェックボックスを制御する関数
  const handleAllCheck = (checked: boolean): void => {
    setAllChecked(checked);
    setEmployeeCartEntities(prevState =>
      prevState.map(item => ({
        ...item,
        checked: checked,
      })));
  };

  const handleOnCheck = (e: ChangeEvent<HTMLInputElement>, uuid: string): void => {
    setEmployeeCartEntities(prevState =>
      prevState.map(item => {
        if (item.uuid === uuid) {
          return { ...item, checked: e.target.checked };
        }
        return item;
      }));
  };

  return (
    <div>
      <ContentAreaWrapper>
        <Table>
          <TableRow>
            <TableHeadCheckbox
              id={`${inputId}-all`} checked={allChecked} width="w-14" minWidth="min-w-14"
              changeFunction={handleAllCheck}
            />
            <TableHeader text="注文ID" minWidth="min-w-28" />
            <TableHeader text="商品名" minWidth="min-w-24" />
            <TableHeader text="お客様SKU" minWidth="min-w-28" />
            <TableHeader text="商品URL" minWidth="min-w-24" />
            <TableHeader text="バーコード情報" minWidth="min-w-36" />
            <TableHeader text="数量" minWidth="min-w-24" />
            <TableHeader text="単価" minWidth="min-w-24" />
            <TableHeader text="小計" minWidth="min-w-24" />
            <TableHeaderEnd text="" />
          </TableRow>
        </Table>
      </ContentAreaWrapper>
      <ContentAreaWrapper>
        <Table width="w-[216rem]">
          {employeeCartEntities.map(cart => {
            const subTotal = cart.orderDetail.quantity * cart.orderDetail.unitPrice;

            return (
              <React.Fragment key={cart.uuid}>
                <If condition={cart.mallToShowHeader}>
                  <Then>
                    <tr className="bg-[#FADE7B]">
                      <TableHeadingCheckbox id={inputId} checked={cart.checked} width="w-14" minWidth="min-w-14" />
                      {/*<TableHeading colSpan={23} text="1688：仕入先A (3件)" />*/}
                      <TableHeading colSpan={23} text={`${cart.orderDetail.mall}`} />
                    </tr>
                  </Then>
                </If>

                <TableRow>
                  <TableDataCheckbox
                    id={inputId} checked={cart.checked} width="w-14" minWidth="min-w-14"
                    onChange={e => {
                      handleOnCheck(e, cart.uuid);
                    }}
                  />
                  <TableDataText text={`${cart.orderDetail.order.id}`} width="w-28" />
                  <TableDataImage
                    text={`${cart.orderDetail.productName}`}
                    imageUrl={`${cart.orderDetail.mallProduct.imageUrl ?? "/images/dummy/dummy-image.png"}`}
                    width="w-24"
                  />
                  <TableDataText text={cart.orderDetail.mallProduct.variation} width="w-28" />
                  <TableDataText text={cart.orderDetail.product.sku ?? ""} width="w-24" />
                  <TableDataUrl text={cart.orderDetail.product.productUrl ?? ""} width="w-24" minWidth="min-w-24" />
                  <TableDataText text={cart.orderDetail.product.label} width="w-36" />
                  <TableDataText text={cart.orderDetail.quantity.toLocaleString()} width="w-24" />
                  <TableDataText text={cart.orderDetail.unitPrice.toLocaleString()} width="w-24" />
                  <TableDataText text={subTotal.toLocaleString()} width="w-28" />
                  <TableDataEnd align="align-middle">
                    <FlexWrapperColumn>
                      <TableDeleteIconButton handleClick={handleEditButtonClick} />
                    </FlexWrapperColumn>
                  </TableDataEnd>
                </TableRow>
              </React.Fragment>
            );
          })}
        </Table>
      </ContentAreaWrapper>
    </div>
  );
};

export default TableGroup;
