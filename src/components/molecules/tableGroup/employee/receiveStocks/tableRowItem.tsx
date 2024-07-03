"use client";
import TableDataText from "@/components/atoms/table/tableDataText";
import TableDataTexts from "@/components/atoms/table/tableDataTexts";
import TableDataImage from "@/components/atoms/table/tableDataImage";
import TableDataLabel from "@/components/atoms/table/tableDataLabel";
import TableDataEnd from "@/components/atoms/table/tableDataEnd";
import FlexWrapperColumn from "@/components/atoms/div/wrapper/flexWrapperColumn";
import TableButton from "@/components/atoms/button/tableButton";
import TableRow from "@/components/atoms/table/tableRow";
import { Dispatch, ReactElement, SetStateAction } from "react";
import { HubDbTableType } from "@/types/db/hub";
import { ReceiveStockDbTableType } from "@/types/db/receiveStock/receiveStock";
import { ReceiveStockDetailDbTableType } from "@/types/db/receiveStock/receiveStockDetail";
import { EmployeeDbTableType } from "@/types/db/employee";

export const TableRowItem = ({
  receiveStock,
  receiveStockDetails,
  hubs,
  employee,
  setSelectedReceiveStock,
  handleOnClickEditLink,
  handleOnClickDeleteLink,
}: {
  receiveStock: ReceiveStockDbTableType;
  receiveStockDetails: ReceiveStockDetailDbTableType[];
  hubs: HubDbTableType[];
  employee: EmployeeDbTableType;
  setSelectedReceiveStock: Dispatch<SetStateAction<ReceiveStockDbTableType | null>>;
  handleOnClickEditLink: () => void;
  handleOnClickDeleteLink: () => void;
}): ReactElement => {
  const handleEditClick = (): void => {
    setSelectedReceiveStock(receiveStock);
    handleOnClickEditLink();
  };

  const handleDeleteClick = (): void => {
    setSelectedReceiveStock(receiveStock);
    handleOnClickDeleteLink();
  };

  return (
    <>
      <TableDataTexts texts={[receiveStock.customer?.id?.toString() ?? "", receiveStock.customer?.name || ""]} />
      <TableDataTexts texts={[receiveStockDetails[0].receiveStock.code, receiveStockDetails[0].receiveStock.createdAt?.toString() || "", receiveStockDetails[0].receiveStock.expectedArrivedOn?.toString() || ""]} />
      <TableDataTexts texts={[receiveStock.orderDetail?.order.id?.toString() || ""]} />
      <TableDataTexts texts={[employee?.name || '']} />
      <TableDataTexts texts={[receiveStock.statusLabel, receiveStock.expectedArrivedOn || "", receiveStock.trackingNo || ""]} />
      {receiveStockDetails.map(receiveStockDetail => (
        <TableRow key={receiveStockDetail.id}>
          <TableRow>
            <TableRow>
              <TableDataLabel text={""} labelText={receiveStockDetail.product?.productType?.toString() ?? ""} labelType="cart" />
            </TableRow>
            <TableRow>
              <TableDataImage isTextTop imageUrl={receiveStockDetail.product.productImageUrl || ""} width={"w-28"} />
            </TableRow>
          </TableRow>
          <TableDataTexts texts={[receiveStockDetail.product.sku ?? "", receiveStockDetail.product.id?.toString() ?? ""]} width={"w-28"} />
          <TableDataTexts texts={[receiveStockDetail.product.name ?? "", receiveStockDetail.product.nameToSlip ?? ""]} width={"w-36"} />
          <TableDataTexts texts={[receiveStockDetail.product.fnsku ?? "", receiveStockDetail.product.janCode ?? ""]} width={"w-36"} />
          <TableDataTexts texts={[receiveStockDetail.requestedReceiveQuantity.toString(), receiveStockDetail.receiveQuantity.toString()]} width={"w-28"} />
          <TableDataTexts texts={[`${receiveStockDetail.product.height} x ${receiveStockDetail.product.width} x ${receiveStockDetail.product.depth}`, receiveStockDetail.product.weight.toString()]} width={"w-28"} />
        </TableRow>
      ))}

      <TableDataTexts texts={["合計", "資材費 :", "梱包手数料 :"]} />
      <TableDataText text={"fff"} />
      <TableDataLabel text="500元(CNY)" labelText="残金あり" labelType={"balance"} />
      <TableDataText text={receiveStockDetails[0].receiveStock.publicRemarks} />
      <TableDataEnd>
        <FlexWrapperColumn>
          <TableButton text="編集" color="blue" handleClick={handleEditClick} />
          <TableButton text="削除" color="red" handleClick={handleDeleteClick} />
        </FlexWrapperColumn>
      </TableDataEnd>
    </>
  );
};

export default TableRowItem;

export const FallbackRow = (): ReactElement => (
  <>
    <TableDataText text="" />
    <TableDataText text="" />
    <TableDataText text="" />
    <TableDataText text="" />
    <TableDataText text="" />
    <TableDataText text="" />
    <TableDataText text="" />
    <TableDataText text="" />
    <TableDataText text="" />
    <TableDataText text="" />
    <TableDataText text="" />
    <TableDataText text="" />
    <TableDataText text="" />
    <TableDataText text="" />
    <TableDataText text="" />
    <TableDataText text="" />
    <TableDataText text="" />
    <TableDataText text="" />
    <TableDataText text="" />
    <TableDataEnd>
      <FlexWrapperColumn>
        <TableButton text="" color="blue" handleClick={() => void 0} />
      </FlexWrapperColumn>
    </TableDataEnd>
  </>
);
