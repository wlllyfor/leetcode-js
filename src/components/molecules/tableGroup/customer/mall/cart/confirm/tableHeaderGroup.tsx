"use client";

import { ReactElement } from "react";
import ContentAreaWrapper from "@/components/atoms/div/wrapper/contentAreaWrapper";
import TableHeader from "@/components/atoms/table/tableHeader";
import TableRow from "@/components/atoms/table/tableRow";
import Table from "@/components/atoms/table/table";

const TableHeaderGroup = (): ReactElement => {
  // const customer = useAuth();

  // const dummy = async (): Promise<void> => {};
  // if (!customer || !hubCode) {
  //   return <Loading />;
  // }

  return (
    <ContentAreaWrapper>
      <Table layout="w-[1400px]">
        <TableRow>
          <TableHeader text="商品画像" width="w-28" />
          <TableHeader text="商品名" width="w-28" />
          <TableHeader text="バリエーション" width="w-40" />
          <TableHeader text="SKU" width="w-28" />
          <TableHeader text="バーコード情報" width="w-40" />
          <TableHeader text="数量" width="w-28" />
          <TableHeader text="単価" width="w-28" />
          <TableHeader text="小計" width="w-28" />
          <TableHeader text="備考" width="w-56" />
          <TableHeader text="" />
        </TableRow>
      </Table>
    </ContentAreaWrapper>
  );
};

export default TableHeaderGroup;
