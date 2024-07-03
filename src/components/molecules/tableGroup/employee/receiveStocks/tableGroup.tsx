"use client";

import { Dispatch, ReactElement, SetStateAction, Suspense } from "react";
import ContentAreaWrapper from "@/components/atoms/div/wrapper/contentAreaWrapper";
import FlexWrapperColumn from "@/components/atoms/div/wrapper/flexWrapperColumn";
import TableHeader from "@/components/atoms/table/tableHeader";
import TableHeaderTexts from "@/components/atoms/table/tableHeaderTexts";
import TableHeaderEnd from "@/components/atoms/table/tableHeaderEnd";
import TableRow from "@/components/atoms/table/tableRow";
import Table from "@/components/atoms/table/table";
import TableDataText from "@/components/atoms/table/tableDataText";
import TableDataTexts from "@/components/atoms/table/tableDataTexts";
import TableDataImage from "@/components/atoms/table/tableDataImage";
import TableDataLabel from "@/components/atoms/table/tableDataLabel";
import TableDataEnd from "@/components/atoms/table/tableDataEnd";
import TableButton from "@/components/atoms/button/tableButton";
import { useEffect, useState } from "react";
import { useIndex as useHubIndex } from "@/hooks/common/hub/useIndex";

import { TableGroupType } from "@/types/components/molecules/tableGroup/employee/receiveStocks/TableGroupType";

import { FallbackRow, TableRowItem } from "@/components/molecules/tableGroup/employee/receiveStocks/tableRowItem";

import { useIndex } from "@/hooks/employee/receiveStock/useIndex";
import React from "react";
import { HubDbTableType } from "@/types/db/hub";
import { ReceiveStockDbTableType } from "@/types/db/receiveStock/receiveStock";
import { EmployeeDbTableType } from "@/types/db/employee";


const TableGroup = ({ hubs, employees, receiveStocks, setSelectedReceiveStock, handleOnClickEditLink, handleOnClickDeleteLink }: {
  hubs: HubDbTableType[];
  employees: EmployeeDbTableType[];
  receiveStocks: ReceiveStockDbTableType[];
  setSelectedReceiveStock: Dispatch<SetStateAction<ReceiveStockDbTableType | null>>;
  handleOnClickEditLink: (receiveStock: ReceiveStockDbTableType) => void;
  handleOnClickDeleteLink: (receiveStock: ReceiveStockDbTableType) => void;
}): ReactElement => {

  return (
    <ContentAreaWrapper>
      <Table>
        <thead>
          <TableRow>
            <TableHeaderTexts texts={[ "顧客ID", "顧客名" ]} />
            <TableHeaderTexts texts={[ "入荷ID", "入荷依頼作成日", "入荷予定日"]} />
            <TableHeaderTexts texts={[ "関連ID", "注文ID" ]} />
            <TableHeaderTexts texts={[ "拠点", "スタッフ名" ]} />
            <TableHeaderTexts texts={[ "ステータス", "入庫日", "追跡番号" ]} />
            <TableRow>
              <TableHeaderTexts texts={[ "商品種別", "商品写真" ]}  minWidth={"min-w-28"}/>
              <TableHeaderTexts texts={[ "SKU", "商品ID"]} minWidth={"min-w-28"}/>
              <TableHeaderTexts texts={[ "商品名", "品名"]} minWidth={"min-w-36"}/>
              <TableHeader text="バーコード情報" minWidth={"min-w-36"}/>
              <TableHeaderTexts texts={[ "入荷依頼数", "入庫数"]} minWidth={"min-w-28"}/>
              <TableHeaderTexts texts={[ "サイズ(cm)", "重量(kg)"]} minWidth={"min-w-28"}/>
            </TableRow>
            <TableHeaderTexts texts={["その他金額総合計", "その他詳細：単価・数量・合計"]}  minWidth={"min-w-36"}/>
            <TableHeader text="内税" />
            <TableHeader text="総合計" />
            <TableHeader text="備考" />
            <TableHeaderEnd text="操作" />
          </TableRow>
        </thead>
        <tbody>
          {receiveStocks.length === 0 ? (
            <TableRow key="fallback">
              <FallbackRow />
            </TableRow>
          ) : (
            receiveStocks.map((receiveStock) => {
              const employee = employees.find((employee) => employee.id === receiveStock.customer?.customerPlans[0]?.employeeId);
              return (
                employee && (
                  <Suspense fallback={<FallbackRow />} key={receiveStock.id}>
                    <TableRow key={`row-${receiveStock.id}`}>
                      <TableRowItem
                        key={`item-${receiveStock.id}`}
                        receiveStock={receiveStock}
                        receiveStockDetails={receiveStock.receiveStockDetails}
                        hubs={hubs}
                        employee={employee}
                        setSelectedReceiveStock={setSelectedReceiveStock}
                        handleOnClickEditLink={() => handleOnClickEditLink(receiveStock)}
                        handleOnClickDeleteLink={() => handleOnClickDeleteLink(receiveStock)}
                      />
                    </TableRow>
                  </Suspense>
                )
              );
            })
          )}
        </tbody>
      </Table>
    </ContentAreaWrapper>
  );
};

export default TableGroup;
