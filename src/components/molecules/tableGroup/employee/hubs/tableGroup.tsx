"use client";

import { ReactElement, Suspense } from "react";
import ContentAreaWrapper from "@/components/atoms/div/wrapper/contentAreaWrapper";
import TableHeader from "@/components/atoms/table/tableHeader";
import TableHeaderEnd from "@/components/atoms/table/tableHeaderEnd";
import TableRow from "@/components/atoms/table/tableRow";
import Table from "@/components/atoms/table/table";
import { FallbackRow, TableRowItem } from "@/components/molecules/tableGroup/employee/hubs/tableRowItem";
import { Else, If, Then } from "react-if";
import { HubDbTableType } from "@/types/db/hub";

const TableGroup = ({ hubs, handleOnClickEditLink, handleOnClickDeleteLink }: {
  hubs: HubDbTableType[];
  handleOnClickEditLink: (hub: HubDbTableType) => void;
  handleOnClickDeleteLink: (hub: HubDbTableType) => void;
}): ReactElement => {

  return (
    <ContentAreaWrapper>
      <Table>
        <TableRow>
          <TableHeader text="更新日時" />
          <TableHeader text="拠点名" />
          <TableHeader text="拠点コード" />
          <TableHeader text="拠点アイコン" />
          <TableHeader text="通貨(英語)" />
          <TableHeader text="通貨(日本語)" />
          <TableHeader text="法人名" />
          <TableHeader text="法人住所" />
          <TableHeader text="但し書き" />
          <TableHeader text="インボイス番号" />
          <TableHeader text="税率" />
          <TableHeaderEnd text="" />
        </TableRow>
        <If condition={hubs.length === 0}>
          <Then>
            <TableRow>
              <FallbackRow />
            </TableRow>
          </Then>
          <Else>
            <Suspense fallback={<FallbackRow />}>
              {hubs.map(hub => (
                <TableRow key={hub.id}>
                  <TableRowItem
                    hub={hub}
                    handleOnClickEditLink={handleOnClickEditLink}
                    handleOnClickDeleteLink={handleOnClickDeleteLink}
                  />
                </TableRow>
              ))}
            </Suspense>
          </Else>
        </If>
      </Table>
    </ContentAreaWrapper>
  );
};

export default TableGroup;
