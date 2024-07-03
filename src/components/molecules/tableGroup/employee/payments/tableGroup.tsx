"use client";

import { ReactElement } from "react";
import ContentAreaWrapper from "@/components/atoms/div/wrapper/contentAreaWrapper";
import FlexWrapperColumn from "@/components/atoms/div/wrapper/flexWrapperColumn";
import TableHeader from "@/components/atoms/table/tableHeader";
import TableHeaderEnd from "@/components/atoms/table/tableHeaderEnd";
import TableRow from "@/components/atoms/table/tableRow";
import Table from "@/components/atoms/table/table";
import TableDataText from "@/components/atoms/table/tableDataText";
import TableDataEnd from "@/components/atoms/table/tableDataEnd";
import TableButton from "@/components/atoms/button/tableButton";

const TableGroup = (): ReactElement => {
  return (
    <ContentAreaWrapper>
      <Table>
        <TableRow>
          <TableHeader text="発生日" />
          <TableHeader text="入出金ID" />
          <TableHeader text="入出金種別" />
          <TableHeader text="口座" />
          <TableHeader text="科目" />
          <TableHeader text="内容" />
          <TableHeader text="顧客ID" />
          <TableHeader text="各種ID" />
          <TableHeader text="取引先" />
          <TableHeader text="入出金額" />
          <TableHeader text="内税" />
          <TableHeader text="口座残高" />
          <TableHeaderEnd text="" />
        </TableRow>
        <TableRow>
          <TableDataText text="2021/01/12/11:00" />
          <TableDataText text="YP-00000" />
          <TableDataText text="出金" />
          <TableDataText text="ABC銀行" />
          <TableDataText text="送料" />
          <TableDataText text="内容が入ります" />
          <TableDataText text="YP-0000" />
          <TableDataText text="YP-0000" />
          <TableDataText text="佐川急便" />
          <TableDataText text="-10000" isFormatNumber />
          <TableDataText text="1000" isFormatNumber />
          <TableDataText text="8900" isFormatNumber />
          <TableDataEnd>
            <FlexWrapperColumn>
              {/* Todo: モックアップのためonClickにalertを一旦設置。API組み込み時に編集の動作を行う。 */}
              <TableButton text="編集" color="blue" handleClick={() => alert("編集を行います")} />
              <TableButton text="削除" color="red" handleClick={() => alert("削除を行います")} />
            </FlexWrapperColumn>
          </TableDataEnd>
        </TableRow>
        <TableRow>
          <TableDataText text="2021/01/12/11:00" />
          <TableDataText text="YP-00000" />
          <TableDataText text="出金" />
          <TableDataText text="ABC銀行" />
          <TableDataText text="送料" />
          <TableDataText text="内容が入ります" />
          <TableDataText text="YP-0000" />
          <TableDataText text="YP-0000" />
          <TableDataText text="佐川急便" />
          <TableDataText text="-10000" isFormatNumber />
          <TableDataText text="1000" isFormatNumber />
          <TableDataText text="8900" isFormatNumber />
          <TableDataEnd>
            <FlexWrapperColumn>
              {/* Todo: モックアップのためonClickにalertを一旦設置。API組み込み時に編集の動作を行う。 */}
              <TableButton text="編集" color="blue" handleClick={() => alert("編集を行います")} />
              <TableButton text="削除" color="red" handleClick={() => alert("削除を行います")} />
            </FlexWrapperColumn>
          </TableDataEnd>
        </TableRow>
      </Table>
    </ContentAreaWrapper>
  );
};

export default TableGroup;
