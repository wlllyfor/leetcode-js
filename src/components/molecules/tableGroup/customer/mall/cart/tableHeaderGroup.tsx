"use client";

import { ReactElement, useId, useState } from "react";
import ContentAreaWrapper from "@/components/atoms/div/wrapper/contentAreaWrapper";
import TableHeader from "@/components/atoms/table/tableHeader";
import TableRow from "@/components/atoms/table/tableRow";
import Table from "@/components/atoms/table/table";
import TableHeadCheckbox from "@/components/molecules/tableColumn/employee/orders/tableHeadCheckbox";

const TableHeaderGroup = (): ReactElement => {
  // const customer = useAuth();
  const inputId = useId();

  // const dummy = async (): Promise<void> => {};
  // if (!customer || !hubCode) {
  //   return <Loading />;
  // }

  // 全チェックボックスの状態を管理するstate
  const [ allChecked, setAllChecked ] = useState<boolean>(false);

  // 全てのチェックボックスを制御する関数
  const handleAllCheck = (checked: boolean) => {
    setAllChecked(checked);
  };
  return (
    <ContentAreaWrapper>
      <Table layout="w-[1400px]">
        <TableRow>
          <TableHeadCheckbox
            id={`${inputId}-all`}
            checked={allChecked}
            width="w-14"
            minWidth="min-w-14"
            changeFunction={handleAllCheck}
          />
          <TableHeader text="商品画像" width="w-28" />
          <TableHeader text="商品名" width="w-28" />
          <TableHeader text="バリエーション" width="w-40" />
          <TableHeader text="SKU" width="w-40" />
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
