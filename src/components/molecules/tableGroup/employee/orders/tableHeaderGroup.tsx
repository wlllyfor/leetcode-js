"use client";

import { ReactElement } from "react";
import ContentAreaWrapper from "@/components/atoms/div/wrapper/contentAreaWrapper";
import TableHeader from "@/components/atoms/table/tableHeader";
import TableHeaderTexts from "@/components/atoms/table/tableHeaderTexts";
import TableHeaderFist from "@/components/atoms/table/tableHeaderFirst";
import TableHeaderEnd from "@/components/atoms/table/tableHeaderEnd";
import TableRow from "@/components/atoms/table/tableRow";
import Table from "@/components/atoms/table/table";

const TableHeaderGroup = (): ReactElement => {
  const accountHeaderTexts = [ "顧客ID", "顧客名" ];
  const hubsHeaderTexts = [ "拠点", "班", "スタッフID/スタッフ名" ];
  const mallHeaderTexts = [ "モール追跡情報", "モール注文ID" ];
  const otherHeaderTexts = [ "その他金額総合計", "その他詳細：単価・数量・合計" ];
  const withdrawalHeaderTexts = [ "引落済み金額", "引落ステータス" ];
  const refundHeaderTexts = [ "返金額", "返金内容" ];

  return (
    <ContentAreaWrapper>
      <Table layout="table-fixed" width="w-[216rem]">
        <TableRow>
          <TableHeaderFist text="" minWidth="min-w-14" width="w-14" />
          <TableHeaderTexts texts={accountHeaderTexts} minWidth="min-w-24" />
          <TableHeaderTexts texts={hubsHeaderTexts} minWidth="min-w-52" />
          <TableHeader text="ステータス" minWidth="min-w-28" />
          <TableHeaderTexts texts={mallHeaderTexts} minWidth="min-w-36" />
          <TableHeader text="商品URL" minWidth="min-w-24" />
          <TableHeader text="商品名" minWidth="min-w-24" />
          <TableHeader text="お客様SKU" minWidth="min-w-28" />
          <TableHeader text="写真" minWidth="min-w-24" />
          <TableHeader text="バリエーション" minWidth="min-w-36" />
          <TableHeader text="数量" minWidth="min-w-24" />
          <TableHeader text="単価" minWidth="min-w-24" />
          <TableHeader text="小計" minWidth="min-w-24" />
          <TableHeader text="買付手数料" minWidth="min-w-28" />
          <TableHeader text="送料" minWidth="min-w-24" />
          <TableHeaderTexts texts={otherHeaderTexts} minWidth="min-w-80" />
          <TableHeader text="内税" minWidth="min-w-24" />
          <TableHeader text="合計" minWidth="min-w-24" />
          <TableHeader text="引落予定金額" minWidth="min-w-36" />
          <TableHeaderTexts texts={withdrawalHeaderTexts} minWidth="min-w-56" />
          <TableHeaderTexts texts={refundHeaderTexts} minWidth="min-w-56" />
          <TableHeader text="備考" minWidth="min-w-24" />
          <TableHeader text="注文明細" minWidth="min-w-28" />
          <TableHeaderEnd text="" />
        </TableRow>
      </Table>
    </ContentAreaWrapper>
  );
};

export default TableHeaderGroup;

