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
          <TableHeader text="拠点" />
          <TableHeader text="班" />
          <TableHeader text="スタッフ" />
          <TableHeader text="金額" />
          <TableHeader text="内税" />
          <TableHeader text="決済種別" />
          <TableHeader text="口座" />
          <TableHeader text="科目" />
          <TableHeader text="内容" />
          <TableHeader text="取引先" />
          <TableHeader text="顧客ID" />
          <TableHeader text="各種ID" />
          <TableHeader text="管理メモ" />
          <TableHeaderEnd text="" />
        </TableRow>
        <TableRow>
          <TableDataText text="2021/01/12/11:00" />
          <TableDataText text="YP-00000" />
          <TableDataText text="義鳥" />
          <TableDataText text="A班" />
          <TableDataText text="山田太郎" />
          <TableDataText text="890000" isFormatNumber />
          <TableDataText text="890" isFormatNumber />
          <TableDataText text="顧客預かり金" />
          <TableDataText text="売上" />
          <TableDataText text="送料" />
          <TableDataText text="送料として" />
          <TableDataText text="佐川急便" />
          <TableDataText text="YP-0000" />
          <TableDataText text="YP-0000" />
          <TableDataText text="管理メモ" isMemoButton />
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
