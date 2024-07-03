import { ChangeEvent, Dispatch, ReactElement, SetStateAction } from "react";
import Table from "@/components/atoms/table";
import Tr from "@/components/atoms/tr";
import Th from "@/components/atoms/th";
import Td from "@/components/atoms/td";
import SmallButton from "@/components/atoms/button/smallButton";
import commonClasses from "@/styles/common/page.module.scss";
import Input from "@/components/atoms/input";
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
      <Tr>
        <Th>入荷依頼ID</Th>
        <Th>検品数/依頼数</Th>
        <Th isLarge></Th>
      </Tr>
      <Tr>
        <Td isLeft>{entity.receiveStockDetail.receiveStock.code}</Td>
        <Td isRight>
          {entity.receiveStockDetail.inspectedQuantity} /{entity.receiveStockDetail.requestedReceiveQuantity}
        </Td>
        <Td isLarge>
          <div className={`${commonClasses.flex__wrapper} ${commonClasses.flex_nowrap} ${commonClasses.aline_center}`}>
            <Input
              value={entity.receiveStockQuantity}
              changeFunction={e => {
                handleOnChangeReceiveQuantities(e, entity.receiveStockDetail.uuid);
              }}
            />
            <div className={commonClasses.ml_10}>
              <SmallButton
                text={"入庫"}
                isGreen
                clickFunction={(): void => {
                  setReceiveStockForReceive(prevState => {
                    return {
                      ...prevState,
                      id: entity.receiveStockDetail.id,
                      quantity: entity.receiveStockQuantity,
                    };
                  });
                }}
                isDisable={isDisable}
              />
            </div>
          </div>
        </Td>
      </Tr>
    </Table>
  );
};

export default ReceiveStockReceiveTable;
