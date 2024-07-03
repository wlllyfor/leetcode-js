import { ChangeEvent, Dispatch, ReactElement, SetStateAction } from "react";
import Table from "@/components/atoms/table";
import TableRow from "@/components/atoms/table/tableRow";
import TableHeader from "@/components/atoms/table/tableHeader";
import TableDataText from "@/components/atoms/table/tableDataText";
import TableDataReceiveItem from "@/components/molecules/tableColumn/employee/receive/tableDataReceiveItem";
import { ReceiveStockForReceiveType } from "@/hooks/employee/receiveStock/receive/useReceive";
import { ReceiveStockDetailEntityType } from "@/types/entity/ReceiveStockDetailEntityType";

const ReceiveStockReceiveTable = ({
  entity,
  handleOnChangeReceiveQuantities,
  setReceiveStockForReceive,
}: {
  entity: ReceiveStockDetailEntityType;
  handleOnChangeReceiveQuantities: (e: ChangeEvent<HTMLInputElement>, uuid: string) => void;
  setReceiveStockForReceive: Dispatch<SetStateAction<ReceiveStockForReceiveType>>;
}): ReactElement => {
  // 検品数 - 入庫数 が 残入庫可能数
  const receivableQuantity = entity.receiveStockDetail.inspectedQuantity - entity.receiveStockDetail.receiveQuantity;
  const isDisable = entity.receiveStockQuantity > receivableQuantity;

  return (
    <Table>
      <TableRow>
        <TableHeader text="依頼ID" fontSize="12px" />
        <TableHeader text="数量" fontSize="12px" />
        <TableHeader text="" />
      </TableRow>
      <TableRow>
        <TableDataText text={entity.receiveStockDetail.receiveStock.code} />
        <TableDataText
          text={entity.receiveStockDetail.inspectedQuantity + "/" + entity.receiveStockDetail.requestedReceiveQuantity}
          isFormatNumber
        />
        <TableDataReceiveItem isDisable={isDisable} clickFunction={() => {}} />
      </TableRow>
    </Table>
  );
};

export default ReceiveStockReceiveTable;
