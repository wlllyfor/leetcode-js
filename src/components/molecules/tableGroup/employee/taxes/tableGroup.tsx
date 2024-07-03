"use client";

import { ReactElement, Suspense } from "react";
import ContentAreaWrapper from "@/components/atoms/div/wrapper/contentAreaWrapper";
import TableHeader from "@/components/atoms/table/tableHeader";
import TableHeaderEnd from "@/components/atoms/table/tableHeaderEnd";
import TableRow from "@/components/atoms/table/tableRow";
import Table from "@/components/atoms/table/table";
import { Else, If, Then } from "react-if";
import { FallbackRow, TableRowItem } from "@/components/molecules/tableGroup/employee/taxes/tableRowItem";
import { TaxDbTableType } from "@/types/db/tax";

const TableGroup = ({ taxes, handleOnClickEditLink, handleOnClickDeleteLink }: {
  taxes: TaxDbTableType[];
  handleOnClickEditLink: (tax: TaxDbTableType) => void;
  handleOnClickDeleteLink: (tax: TaxDbTableType) => void;
}): ReactElement => {

  return (
    <ContentAreaWrapper>
      <Table>
        <TableRow>
          <TableHeader text="拠点名" />
          <TableHeader text="名称" />
          <TableHeader text="税率" />
          <TableHeader text="税率開始日" />
          <TableHeaderEnd text="" />
        </TableRow>
        <If condition={taxes.length === 0}>
          <Then>
            <TableRow>
              <FallbackRow />
            </TableRow>
          </Then>
          <Else>
            <Suspense fallback={<FallbackRow />}>
              {taxes.map(tax => (
                <TableRow key={tax.id}>
                  <TableRowItem
                    tax={tax}
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
