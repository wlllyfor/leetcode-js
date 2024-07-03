"use client";

import { ChangeEvent, ReactElement, useEffect } from "react";
import H2 from "@/components/atoms/h2";
import InputAndLabel from "@/components/molecules/inputs/inputAndLabel";
import commonClasses from "@/styles/common/page.module.scss";
import Paragraph from "@/components/atoms/paragraph";
import ReceiveStockReceiveTable from "@/components/molecules/receiveStock/receiveStockReceiveTable";
import { EduITModal } from "@/components/molecules/eduITModal";
import { useReceive } from "@/hooks/employee/receiveStock/receive/useReceive";
import Error422 from "@/components/molecules/errors/error422";
import { useReceivableIndex } from "@/hooks/employee/product/useReceivableIndex";
import ImageSrc from "@/resource/img/dummy.jpg";
import Image from "next/image";
import { Integer } from "@/lib/integer";

const ReceiveStockReceiveModal = ({
  isOpen,
  handleOnCloseButtonClick,
  handleOnClickReceiveButton,
}: {
  isOpen: boolean;
  handleOnCloseButtonClick: () => void;
  handleOnClickReceiveButton: () => void;
}): ReactElement => {
  const classNames = [
    commonClasses.flex__wrapper,
    commonClasses.flex_nowrap,
    commonClasses.aline_center,
    commonClasses.mt_8,
  ];

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
    <EduITModal isOpen={isOpen}>
      <H2>入庫処理</H2>
      <Error422 errors={validationErrors} />
      <InputAndLabel
        id={"barcode"}
        text={"商品バーコード"}
        value={condition.barcode || ""}
        changeFunction={handleOnChangeBarcode}
      />
      {/* todo: PH2でロケーション */}
      {/*<InputAndLabel id={""} text={"ロケーション"} value={""} />*/}
      <div className={`${commonClasses.bb_solid} ${commonClasses.mb_16}`}></div>
      <Paragraph isLeft>該当する商品</Paragraph>
      {product && (
        <div className={classNames.join(" ")}>
          <Image src={product.productImageUrl || ImageSrc} alt={""} width={150} />
          <div className={commonClasses.ml_10}>
            <Paragraph isBold isLeft>
              {product.name}/{product.label}({product.productLabelType})
            </Paragraph>
            <Paragraph isLeft>SKU：{product.sku}</Paragraph>
            <Paragraph isLeft>バーコード情報：{product.label}</Paragraph>
          </div>
        </div>
      )}
      <div className={`${commonClasses.bb_solid}`}></div>
      <div className={commonClasses.mt_16}>
        <Paragraph isBold isLeft>
          入庫未完了在庫一覧
        </Paragraph>
        {receiveStockDetailEntities &&
          receiveStockDetailEntities.map(entity => {
            return (
              <ReceiveStockReceiveTable
                key={entity.receiveStockDetail.uuid}
                entity={entity}
                setReceiveStockForReceive={setReceiveStockForReceive}
                handleOnChangeReceiveQuantities={handleOnChangeReceiveQuantities}
              />
            );
          })}
      </div>
      <div className={commonClasses.mt_24}>
        <Paragraph isLink isCenter isMarginTop clickFunction={handleOnCloseButtonClick}>
          未入庫在庫一覧へ戻る
        </Paragraph>
      </div>
    </EduITModal>
  );
};

export default ReceiveStockReceiveModal;
