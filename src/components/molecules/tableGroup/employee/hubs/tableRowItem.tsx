"use client";

import TableDataText from "@/components/atoms/table/tableDataText";
import TableDataEnd from "@/components/atoms/table/tableDataEnd";
import FlexWrapperColumn from "@/components/atoms/div/wrapper/flexWrapperColumn";
import TableButton from "@/components/atoms/button/tableButton";
import { ReactElement } from "react";
import { HubDbTableType } from "@/types/db/hub";

export const TableRowItem = ({ hub, handleOnClickEditLink, handleOnClickDeleteLink }: {
  hub: HubDbTableType;
  handleOnClickEditLink: (hub: HubDbTableType) => void;
  handleOnClickDeleteLink: (hub: HubDbTableType) => void;
}): ReactElement => {
  const companyAddress = `${hub.postalCode ?? ""}${hub.prefectureName ?? ""}${hub.cityName ?? ""}${hub.townName ?? ""}${hub.buildingName ?? ""}` ?? "";

  return (
    <>
      <TableDataText text={hub.updatedOn} />
      <TableDataText text={hub.name} />
      <TableDataText text={hub.code} />
      <TableDataText text={hub.iconPath ?? ""} />
      <TableDataText text={hub.currency.name} />
      <TableDataText text={hub.currency.nameToJp} />
      <TableDataText text={hub.companyName ?? ""} />
      <TableDataText text={companyAddress} />
      <TableDataText text={hub.description ?? ""} />
      <TableDataText text={hub.invoiceNo ?? ""} />
      <TableDataText text={hub.currentTaxRate?.toString() ?? "税率なし"} />
      <TableDataEnd>
        <FlexWrapperColumn>
          <TableButton
            text="編集" color="blue" handleClick={(): void => {
              handleOnClickEditLink(hub);
            }}
          />
          <TableButton
            text="削除" color="red" handleClick={(): void => {
              handleOnClickDeleteLink(hub);
            }}
          />
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
    <TableDataEnd>
      <FlexWrapperColumn>
        <TableButton text="" color="blue" handleClick={() => void 0} />
      </FlexWrapperColumn>
    </TableDataEnd>
  </>
);
