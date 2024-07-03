import { ReactElement } from "react";
import { LeaveStockTableType } from "@/types/components/molecules/leaveStock/LeaveStockTableType";
import Table from "@/components/atoms/table";
import Tr from "@/components/atoms/tr";
import Th from "@/components/atoms/th";
import Td from "@/components/atoms/td";

const LeaveStockTable = ({ productStock }: LeaveStockTableType): ReactElement => {
  return (
    <Table>
      <Tr>
        <Th>ロケーション</Th>
        <Th>バーコード</Th>
        <Th>状態</Th>
        <Th>商品名</Th>
      </Tr>
      <Tr>
        <Td isLeft>{"PH1では未実装"}</Td>
        <Td isLeft>{productStock.product?.label}</Td>
        <Td isLeft>{productStock.statusLabel}</Td>
        <Td isLeft>{productStock.product?.name}</Td>
      </Tr>
    </Table>
  );
};

export default LeaveStockTable;
