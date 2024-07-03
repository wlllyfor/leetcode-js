"use client";

import { ReactElement } from "react";
import ContentAreaWrapper from "@/components/atoms/div/wrapper/contentAreaWrapper";
import FlexWrapperColumn from "@/components/atoms/div/wrapper/flexWrapperColumn";
import TableHeader from "@/components/atoms/table/tableHeader";
import TableHeaderTexts from "@/components/atoms/table/tableHeaderTexts";
import TableHeaderEnd from "@/components/atoms/table/tableHeaderEnd";
import TableRow from "@/components/atoms/table/tableRow";
import Table from "@/components/atoms/table/table";
import TableDataText from "@/components/atoms/table/tableDataText";
import TableDataTexts from "@/components/atoms/table/tableDataTexts";
import TableDataEnd from "@/components/atoms/table/tableDataEnd";
import TableButton from "@/components/atoms/button/tableButton";
import { TableGroupType } from "@/types/components/molecules/tableGroup/employee/products/TableGroupType";

const TableGroup = ({ handleEditButtonOnClick }: TableGroupType): ReactElement => {
  const codeHeaderText = [ "FNSKU", "ASIN" ];
  const arrivalHeaderText = [ "入荷検品日", "班、担当スタッフ" ];
  const receivingStockHeaderText = [ "入庫日", "班,スタッフID,スタッフ名" ];
  const leavingShedHeaderText = [ "出庫日", "班、担当スタッフ" ];
  const arrivaltext = [ "2024/00/00 00:00", "A班,0001,山田太郎(yamada taro)" ];
  const receivingStocktext = [ "2024/00/00 00:00", "A班,0001,山田太郎(yamada taro)" ];
  const leavingShedText = [ "2024/00/00 00:00", "A班,0001,山田太郎(yamada taro)" ];

  return (
    <ContentAreaWrapper>
      <Table>
        <TableRow>
          <TableHeader text="商品ID" />
          <TableHeader text="商品種別" />
          <TableHeader text="商品ステータス" />
          <TableHeader text="SKU" />
          <TableHeaderTexts texts={codeHeaderText} />
          <TableHeader text="バーコード情報" />
          <TableHeader text="商品名" />
          <TableHeader text="入荷ID" />
          <TableHeader text="出荷ID" />
          <TableHeader text="サイズ(cm)" />
          <TableHeader text="重量(kg)" />
          <TableHeaderTexts texts={arrivalHeaderText} />
          <TableHeaderTexts texts={receivingStockHeaderText} />
          <TableHeaderTexts texts={leavingShedHeaderText} />
          <TableHeader text="ロケーション" />
          <TableHeaderEnd text="" />
        </TableRow>
        <TableRow>
          <TableDataText text="YP-00000" />
          <TableDataText text="通常商品" />
          <TableDataText text="入庫済み" />
          <TableDataText text="00000" />
          <TableDataText text="X0001233" />
          <TableDataText text="情報" />
          <TableDataText text="商品名が入ります" />
          <TableDataText text="YP-0000" />
          <TableDataText text="YP-0000" />
          <TableDataText text="10×20×10" />
          <TableDataText text="100" />
          <TableDataTexts texts={arrivaltext} />
          <TableDataTexts texts={receivingStocktext} />
          <TableDataTexts texts={leavingShedText} />
          <TableDataText text="@" />
          <TableDataEnd>
            <FlexWrapperColumn>
              <TableButton text="編集" color="blue" handleClick={handleEditButtonOnClick} />
            </FlexWrapperColumn>
          </TableDataEnd>
        </TableRow>
      </Table>
    </ContentAreaWrapper>
  );
};

export default TableGroup;
