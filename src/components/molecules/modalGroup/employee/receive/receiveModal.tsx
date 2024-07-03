"use client";

import { ChangeEvent, ReactElement, useEffect } from "react";
import ModalSm from "@/components/atoms/modal/modalSm";
import ModalTitle from "@/components/atoms/modal/modalTitle";
import ModalCloseButton from "@/components/atoms/modal/modalCloseButton";
import InputGroup80 from "@/components/molecules/form/input/inputGroup80";
import ContentAreaWrapper from "@/components/atoms/div/wrapper/contentAreaWrapper";
import Paragraph from "@/components/atoms/text/paragraph";
import ReceiveStockReceiveTable from "@/components/molecules/receiveStock/receiveStockReceiveTable";
import ReceiveProductItem from "@/components/molecules/modalItem/employee/receive/receiveProductItem";
import { useReceive } from "@/hooks/employee/receiveStock/receive/useReceive";
import Error422 from "@/components/molecules/errors/error422";
import { useReceivableIndex } from "@/hooks/employee/product/useReceivableIndex";
import { Integer } from "@/lib/integer";

const ReceiveModal = ({
  isOpen,
  handleCloseOnClick,
  handleOnClickReceiveButton,
}: {
  isOpen: boolean;
  handleCloseOnClick: () => void;
  handleOnClickReceiveButton: () => void;
}): ReactElement => {
  // customHooks
  const {
    receiveReceiveStock,
    receiveStockForReceive,
    setReceiveStockForReceive,
    validationErrors,
    setValidationErrors,
    isReceived,
    setIsReceived,
  } = useReceive();

  const {
    getReceiveStocks,
    product,
    receiveStockDetailEntities,
    setReceiveStockDetailEntities,
    condition,
    setCondition,
  } = useReceivableIndex();

  // use effects

  /**
   * 初期化
   */
  useEffect((): void => {
    setValidationErrors(prevState => []);
    setIsReceived(prevState => false);
    setReceiveStockDetailEntities(prevState => []);
    setReceiveStockForReceive(prevState => {
      return {
        receiveStockDetailEntities: [],
        uuid: "",
        quantity: 0,
        id: null,
      };
    });
  }, [ setValidationErrors, setIsReceived, setReceiveStockDetailEntities, setReceiveStockForReceive ]);

  /**
   * 商品取得
   */
  useEffect((): void => {
    (async (): Promise<void> => {
      await getReceiveStocks();
    })();
  }, [ condition, getReceiveStocks ]);

  /**
   * 入荷検品状況の監視
   */
  useEffect((): void => {
    if (isOpen && isReceived) {
      handleOnClickReceiveButton();
    }
  }, [ isOpen, isReceived, handleOnClickReceiveButton ]);

  /**
   * 入庫ボタンが押されてIDが設定されたか監視
   */
  useEffect((): void => {
    if (receiveStockForReceive && receiveStockForReceive.id !== null) {
      (async (): Promise<void> => {
        await receiveReceiveStock();
      })();
    }
  }, [ receiveReceiveStock, receiveStockForReceive ]);

  // handles

  /**
   * バーコード変更イベント
   * @param {React.ChangeEvent<HTMLInputElement>} e
   */
  const handleOnChangeBarcode = (e: ChangeEvent<HTMLInputElement>): void => {
    setCondition(prevState => {
      return {
        ...prevState,
        barcode: e.target.value,
      };
    });
  };

  const handleOnChangeReceiveQuantities = (e: ChangeEvent<HTMLInputElement>, uuid: string): void => {
    setReceiveStockDetailEntities(prevState => {
      return prevState.map(entity => {
        if (entity.uuid === uuid) {
          return {
            ...entity,
            receiveStockQuantity: Integer.parseIntExceptZero(e.target.value),
          };
        }
        return entity;
      });
    });
  };

  return (
    <ModalSm isOpen={isOpen} onRequestClose={handleCloseOnClick}>
      <ModalTitle text="入庫処理" />
      <Error422 errors={validationErrors} />
      <InputGroup80
        id={"barcode"}
        text={"商品バーコード"}
        value={condition.barcode || ""}
        onChange={handleOnChangeBarcode}
      />
      {/* todo: PH2でロケーション */}
      {/*<InputGroup80 id={""} text={"ロケーション"} value={""} onChange={()=>{}} />*/}
      {product && (
        // <div className="w-80 mx-auto mt-2">
        //   <Paragraph>見つかった商品</Paragraph>
        //   <div className="">
        //     <Image src={product.productImageUrl || ImageSrc} alt={""} width={150} />
        //     <div className="">
        //       <Paragraph isBold>
        //         {product.name}/{product.label}({product.productLabelType})
        //       </Paragraph>
        //       <Paragraph>SKU：{product.sku}</Paragraph>
        //       <Paragraph>バーコード情報：{product.label}</Paragraph>
        //     </div>
        //   </div>
        // </div>
        <div className="w-80 mx-auto">
          <ContentAreaWrapper>
            <Paragraph isBold fontSize="12px">
              見つかった商品
            </Paragraph>
            <div className="p-2 border border-solid border-gray-300 rounded-md">
              <ReceiveProductItem product={product} />
            </div>
          </ContentAreaWrapper>
          <ContentAreaWrapper>
            {/* <div className="">
          <Paragraph isBold>入庫未完了在庫一覧</Paragraph>
          {receiveStockDetailEntities &&
            receiveStockDetailEntities.map((entity) => {
              return (
                <ReceiveStockReceiveTable
                  key={entity.receiveStockDetail.uuid}
                  entity={entity}
                  setReceiveStockForReceive={setReceiveStockForReceive}
                  handleOnChangeReceiveQuantities={handleOnChangeReceiveQuantities}
                />
              );
            })}
        </div> */}
            <Paragraph isBold fontSize="12px" text="入庫未完了在庫一覧" />
            <div className="m-2">
              {receiveStockDetailEntities &&
                receiveStockDetailEntities.map(entity => {
                  return (
                    <ReceiveStockReceiveTable
                      key={""}
                      entity={entity}
                      setReceiveStockForReceive={setReceiveStockForReceive}
                      handleOnChangeReceiveQuantities={handleOnChangeReceiveQuantities}
                    />
                  );
                })}
            </div>
          </ContentAreaWrapper>
        </div>
      )}
      <ModalCloseButton handleClose={handleCloseOnClick} />
    </ModalSm>
  );
};

export default ReceiveModal;
