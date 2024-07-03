"use client";

import { ReactElement } from "react";
import ContentAreaWrapper from "@/components/atoms/div/wrapper/contentAreaWrapper";
import TableHeader from "@/components/atoms/table/tableHeader";
import TableHeaderTexts from "@/components/atoms/table/tableHeaderTexts";
import TableRow from "@/components/atoms/table/tableRow";
import Table from "@/components/atoms/table/table";
import TableDataText from "@/components/atoms/table/tableDataText";
import TableDataTexts from "@/components/atoms/table/tableDataTexts";

const TableGroup = (): ReactElement => {
  const headingTexts = [ "拠点(通貨)", "班", "スタッフ：氏名", "スタッフ：ID" ];
  const texts = [ "日本(円)", "A班", "山田太郎(yamada taro)", "YP-0000" ];
  return (
    <ContentAreaWrapper>
      <Table>
        <TableRow>
          <TableHeader text="更新日時" />
          <TableHeaderTexts texts={headingTexts} />
          <TableHeader text="出入金ID" />
          <TableHeader text="入出金種別" />
          <TableHeader text="出入金(通貨)" />
          <TableHeader text="内税" />
          <TableHeader text="残高(通貨)" />
          <TableHeader text="科目" />
          <TableHeader text="各種ID" />
          <TableHeader text="内容" />
          <TableHeader text="決済方法" />
          <TableHeader text="管理メモ" />
        </TableRow>
        <TableRow>
          <TableDataText text="2024/00/00/11:00" />
          <TableDataTexts texts={texts} />
          <TableDataText text="YP-0000" />
          <TableDataText text="出金" />
          <TableDataText text="-1000" isFormatNumber />
          <TableDataText text="-100" isFormatNumber />
          <TableDataText text="5000" isFormatNumber />
          <TableDataText text="撮影費用" />
          <TableDataText text="YP-S1" textColor={"text-[#2563EB]"} />
          <TableDataText text="備考が入ります備考が入ります。" />
          <TableDataText text="預り金" />
          <TableDataText text="内容記載" />
        </TableRow>
      </Table>
    </ContentAreaWrapper>
  );
};

export default TableGroup;
