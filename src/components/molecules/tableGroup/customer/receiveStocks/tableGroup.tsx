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
import TableDataTextsWithLabel from "@/components/atoms/table/tableDataTextsWithLabel";
import TableDataAmount from "@/components/atoms/table/tableDataAmount";
import TableDataUrl from "@/components/atoms/table/tableDataUrl";
import TableDataImageAndTag from "@/components/atoms/table/tableDataImageAndTag";
import TableDataEnd from "@/components/atoms/table/tableDataEnd";
import TableButton from "@/components/atoms/button/tableButton";
import { TableGroupType } from "@/types/components/molecules/tableGroup/employee/receiveStocks/TableGroupType";

const TableGroup = ({ handleModalButtonClick, handleDeleteColumn }: TableGroupType): ReactElement => {
  const arrivalHeaderTexts = [ "入荷ID", "入荷依頼作成日", "入荷予定日" ];
  const connectionHeaderTexts = [ "関連ID", "注文ID" ];
  const statusHeaderTexts = [ "ステータス", "入庫日", "追跡番号" ];
  const productHeaderTexts = [ "商品種別", "写真" ];
  const productIdHeaderTexts = [ "SKU", "商品ID" ];
  const productNameHeaderTexts = [ "商品名", "品名" ];
  const quantityInStockHeaderTexts = [ "入荷依頼数", "入庫数" ];
  const sizeHeaderTexts = [ "サイズcm", "重量(kg)" ];
  const otherHeaderTexts = [ "その他金額総合計", "その他詳細：単価・数量・合計" ];
  const arrivalTexts = [ "YP2-W2", "2024/00/00", "2024/00/00" ];
  const statusTexts = [ "入庫中", "", "123456789" ];
  const productText = [ "123456789", "YP2-2" ];
  const productNameText = [ "Tシャツブルー…", "Tシャツ" ];
  const quantityInStockText = [ "30", "30" ];
  const sizeTexts = [ "20×30×10cm", "2kg" ];
  const otherTexts = [ "資材費 :10元(cny)x10=1000元 ", "資材費 :10元(cny)x10=1000元" ];

  return (
    <ContentAreaWrapper>
      <Table>
        <TableRow>
          <TableHeaderTexts texts={arrivalHeaderTexts} />
          <TableHeaderTexts texts={connectionHeaderTexts} />
          <TableHeaderTexts texts={statusHeaderTexts} />
          <TableHeaderTexts texts={productHeaderTexts} />
          <TableHeaderTexts texts={productIdHeaderTexts} />
          <TableHeaderTexts texts={productNameHeaderTexts} />
          <TableHeader text="バーコード情報" />
          <TableHeaderTexts texts={quantityInStockHeaderTexts} />
          <TableHeaderTexts texts={sizeHeaderTexts} />
          <TableHeaderTexts texts={otherHeaderTexts} />
          <TableHeader text="内税" />
          <TableHeader text="総合計" />
          <TableHeader text="備考" />
          <TableHeaderEnd text="" />
        </TableRow>
        <TableRow bgColor="bg-[#FFF0A2]">
          <TableDataTexts texts={arrivalTexts} rowSpan={2} />
          <TableDataUrl text="YP2-O2" linkColor="text-[#2563EB]" rowSpan={2} />
          <TableDataTexts texts={statusTexts} rowSpan={2} />
          <TableDataImageAndTag labelText="通常" imageUrl="/images/dummy/dummy-image.png" noRightBorder />
          <TableDataTexts texts={productText} topAndBottomBorder />
          <TableDataTexts texts={productNameText} topAndBottomBorder />
          <TableDataText text="JAN:123456" topAndBottomBorder />
          <TableDataTexts texts={quantityInStockText} topAndBottomBorder />
          <TableDataTexts texts={sizeTexts} topAndBottomBorder />
          <TableDataAmount totalText={"2000元(cny)"} texts={otherTexts} rowSpan={2} />
          <TableDataText text="200元(cny)" rowSpan={2} />
          <TableDataText text="2200元(cny)" rowSpan={2} />
          <TableDataText text="備考が入ります。" isMemoButton rowSpan={2} />
          <TableDataEnd rowSpan={2} align="align-middle">
            <FlexWrapperColumn>
              <TableButton text="編集" color="blue" handleClick={handleModalButtonClick} />
              <TableButton text="削除" color="red" handleClick={handleDeleteColumn} />
            </FlexWrapperColumn>
          </TableDataEnd>
        </TableRow>
        <TableRow bgColor="bg-[#FFF0A2]">
          <TableDataImageAndTag labelText="通常" imageUrl="/images/dummy/dummy-image.png" noRightBorder />
          <TableDataTexts texts={productText} topAndBottomBorder />
          <TableDataTexts texts={productNameText} topAndBottomBorder />
          <TableDataText text="JAN:123456" topAndBottomBorder />
          <TableDataTexts texts={quantityInStockText} topAndBottomBorder />
          <TableDataTexts texts={sizeTexts} topAndBottomBorder />
        </TableRow>
        <TableRow>
          <TableDataTextsWithLabel
            texts={arrivalTexts}
            labelType={"staff"}
            labelText={"スタッフ作成:111"}
            rowSpan={2}
          />
          <TableDataUrl text="YP2-O2" linkColor="text-[#2563EB]" rowSpan={2} />
          <TableDataTexts texts={statusTexts} rowSpan={2} />
          <TableDataImageAndTag labelText="通常" imageUrl="/images/dummy/dummy-image.png" noRightBorder />
          <TableDataTexts texts={productText} topAndBottomBorder />
          <TableDataTexts texts={productNameText} topAndBottomBorder />
          <TableDataText text="JAN:123456" topAndBottomBorder />
          <TableDataTexts texts={quantityInStockText} topAndBottomBorder />
          <TableDataTexts texts={sizeTexts} topAndBottomBorder />
          <TableDataAmount totalText={"2000元(cny)"} texts={otherTexts} rowSpan={2} />
          <TableDataText text="200元(cny)" rowSpan={2} />
          <TableDataText text="2200元(cny)" rowSpan={2} />
          <TableDataText text="備考が入ります。" isMemoButton rowSpan={2} />
          <TableDataEnd rowSpan={2} align="align-middle">
            <FlexWrapperColumn>
              <TableButton text="編集" color="blue" handleClick={handleModalButtonClick} />
              <TableButton text="削除" color="red" handleClick={handleDeleteColumn} />
            </FlexWrapperColumn>
          </TableDataEnd>
        </TableRow>
        <TableRow>
          <TableDataImageAndTag labelText="通常" imageUrl="/images/dummy/dummy-image.png" noRightBorder />
          <TableDataTexts texts={productText} topAndBottomBorder />
          <TableDataTexts texts={productNameText} topAndBottomBorder />
          <TableDataText text="JAN:123456" topAndBottomBorder />
          <TableDataTexts texts={quantityInStockText} topAndBottomBorder />
          <TableDataTexts texts={sizeTexts} topAndBottomBorder />
        </TableRow>
        <TableRow bgColor="bg-[#AFAFAF]">
          <TableDataTextsWithLabel
            texts={arrivalTexts}
            labelType={"staff"}
            labelText={"スタッフ作成:111"}
            rowSpan={2}
          />
          <TableDataUrl text="YP2-O2" linkColor="text-[#2563EB]" rowSpan={2} />
          <TableDataTexts texts={statusTexts} rowSpan={2} />
          <TableDataImageAndTag labelText="通常" imageUrl="/images/dummy/dummy-image.png" noRightBorder />
          <TableDataTexts texts={productText} topAndBottomBorder />
          <TableDataTexts texts={productNameText} topAndBottomBorder />
          <TableDataText text="JAN:123456" topAndBottomBorder />
          <TableDataTexts texts={quantityInStockText} topAndBottomBorder />
          <TableDataTexts texts={sizeTexts} topAndBottomBorder />
          <TableDataAmount totalText={"2000元(cny)"} texts={otherTexts} rowSpan={2} />
          <TableDataText text="200元(cny)" rowSpan={2} />
          <TableDataText text="2200元(cny)" rowSpan={2} />
          <TableDataText text="備考が入ります。" isMemoButton rowSpan={2} />
          <TableDataEnd rowSpan={2} align="align-middle">
            <FlexWrapperColumn>
              <TableButton text="編集" color="blue" handleClick={handleModalButtonClick} />
              <TableButton text="削除" color="red" handleClick={handleDeleteColumn} />
            </FlexWrapperColumn>
          </TableDataEnd>
        </TableRow>
        <TableRow bgColor="bg-[#AFAFAF]">
          <TableDataImageAndTag labelText="通常" imageUrl="/images/dummy/dummy-image.png" noRightBorder />
          <TableDataTexts texts={productText} topAndBottomBorder />
          <TableDataTexts texts={productNameText} topAndBottomBorder />
          <TableDataText text="JAN:123456" topAndBottomBorder />
          <TableDataTexts texts={quantityInStockText} topAndBottomBorder />
          <TableDataTexts texts={sizeTexts} topAndBottomBorder />
        </TableRow>
      </Table>
    </ContentAreaWrapper>
  );
};

export default TableGroup;
