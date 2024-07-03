import { ReactElement } from "react";
import Paragraph from "@/components/atoms/text/paragraph";
import Table from "@/components/atoms/table";
import TableRow from "@/components/atoms/table/tableRow";
import TableHeader from "@/components/atoms/table/tableHeader";
import TableDataText from "@/components/atoms/table/tableDataText";
import TableDataInspectItem from "@/components/molecules/tableColumn/employee/receive/tableDataInspectItem";
import { ReceiveStockForInspectType } from "@/hooks/employee/receiveStock/receive/useInspect";

const ReceiveStockInspectionTable = ({
  receiveStockForInspect,
  inspectReceiveStock,
}: {
  receiveStockForInspect: ReceiveStockForInspectType | null;
  inspectReceiveStock: () => void;
}): ReactElement => {
  if (receiveStockForInspect === null) {
    return <></>;
  }

  const inputInspectQuantity = receiveStockForInspect.quantity;
  const receiveStockDetail = receiveStockForInspect.receiveStocksDetailOption?.receiveStockDetail;
  if (receiveStockDetail === null || receiveStockDetail === undefined) {
    return <></>;
  }

  const isDisable =
    inputInspectQuantity + receiveStockDetail.inspectedQuantity > receiveStockDetail.requestedReceiveQuantity;

  return (
    <div className="">
      <Paragraph isBold fontSize="14px">
        入庫候補一覧
      </Paragraph>
      <div className="mt-2 text-[11px] w-[360px] mx-auto">
        <Table>
          <TableRow>
            <TableHeader fontSize="11px" text="入荷依頼ID" />
            <TableHeader fontSize="11px" text="依頼数" />
            <TableHeader fontSize="11px" text="備考" />
            <TableHeader fontSize="11px" text="管理メモ" />
          </TableRow>
          <TableRow>
            <TableDataInspectItem
              clickFunction={inspectReceiveStock}
              text={receiveStockForInspect.receiveStocksDetailOption?.receiveStockDetail?.receiveStock.code}
              isDisable={isDisable}
            />
            <TableDataText
              text={`${
                receiveStockForInspect.receiveStocksDetailOption?.receiveStockDetail?.inspectedQuantity || 0
              }/${receiveStockForInspect.receiveStocksDetailOption?.receiveStockDetail?.requestedReceiveQuantity}`}
              isFormatNumber
            />
            <TableDataText
              text={receiveStockForInspect.receiveStocksDetailOption?.receiveStockDetail?.receiveStock.publicRemarks}
              width="w-[90px]"
            />
            <TableDataText
              text={receiveStockForInspect.receiveStocksDetailOption?.receiveStockDetail?.receiveStock.privateRemarks}
              width="w-[90px]"
            />
          </TableRow>
        </Table>
      </div>
    </div>
  );
};

export default ReceiveStockInspectionTable;
