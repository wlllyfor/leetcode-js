import { ReactElement } from "react";
import Table from "@/components/atoms/table";
import Tr from "@/components/atoms/tr";
import Th from "@/components/atoms/th";
import Td from "@/components/atoms/td";
import SmallButton from "@/components/atoms/button/smallButton";
import EditButton from "@/components/atoms/button/editButton";
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
    <Table>
      <Tr>
        <Th>入荷依頼ID</Th>
        <Th>検品数/依頼数</Th>
        <Th>備考</Th>
        <Th>管理メモ</Th>
      </Tr>
      <Tr>
        <Td isLeft>
          {receiveStockForInspect.receiveStocksDetailOption?.receiveStockDetail?.receiveStock.code}
          <EditButton />

          <SmallButton text={"入荷検品完了"} isGreen clickFunction={inspectReceiveStock} isDisable={isDisable} />
        </Td>
        <Td isRight>
          {receiveStockForInspect.receiveStocksDetailOption?.receiveStockDetail?.inspectedQuantity || 0}/
          {receiveStockForInspect.receiveStocksDetailOption?.receiveStockDetail?.requestedReceiveQuantity}
        </Td>
        <Td isLeft>
          {receiveStockForInspect.receiveStocksDetailOption?.receiveStockDetail?.receiveStock.publicRemarks}
        </Td>
        <Td isLeft>
          {receiveStockForInspect.receiveStocksDetailOption?.receiveStockDetail?.receiveStock.privateRemarks}
        </Td>
      </Tr>
    </Table>
  );
};

export default ReceiveStockInspectionTable;
