"use client";

import { ChangeEvent, ReactElement, useEffect } from "react";
import H2 from "@/components/atoms/h2";
import InputAndLabel from "@/components/molecules/inputs/inputAndLabel";
import SelectAndLabel from "@/components/molecules/selectAndLabel";
import commonClasses from "@/styles/common/page.module.scss";
import Paragraph from "@/components/atoms/paragraph";
import InputOfSize from "@/components/molecules/inputs/inputOfSize";
import InputOfCustomerId from "@/components/molecules/inputs/inputOfCustomerId";
import ReceiveStockInspectionTable from "@/components/molecules/receiveStock/receiveStockInspectionTable";
import { EduITModal } from "@/components/molecules/eduITModal";
import { useIndex as useEmployeeIndex } from "@/hooks/common/employee/useIndex";
import { useInspect } from "@/hooks/employee/receiveStock/receive/useInspect";
import Error422 from "@/components/molecules/errors/error422";
import { useInspectableIndex } from "@/hooks/employee/product/useInspectableIndex";
import { ReactSelectOption } from "@/types/reactSelectOptions/ReactSelectOption";
import { Integer } from "@/lib/integer";
import { ReactSelectInspectOption } from "@/types/reactSelectOptions/ReactSelectInspectOption";

const ReceiveStockInspectModal = ({
  isOpen,
  handleOnCloseButtonClick,
  handleOnClickInspectButton,
}: {
  isOpen: boolean;
  handleOnCloseButtonClick: () => void;
  handleOnClickInspectButton: () => void;
}): ReactElement => {
  // customHooks
  const {
    inspectReceiveStock,
    receiveStockForInspect,
    setReceiveStockForInspect,
    validationErrors,
    setValidationErrors,
    isInspected,
    setIsInspected,
  } = useInspect();

  const { getEmployees, options: employeeOptions } = useEmployeeIndex();

  const {
    getProducts,
    options: productOptions,
    setOptions: setProductOptions,
    condition,
    setCondition,
  } = useInspectableIndex();

  // use effects

  /**
   * 初期化
   */
  useEffect((): void => {
    setValidationErrors(prevState => []);
    setIsInspected(prevState => false);
    setProductOptions(prevState => []);
    (async (): Promise<void> => {
      await getEmployees();
    })();
  }, [ setValidationErrors, setIsInspected, getEmployees, setProductOptions ]);

  /**
   * 商品取得
   */
  useEffect((): void => {
    // 追跡番号が入力済みの場合のみ検索する。
    (async (): Promise<void> => {
      setProductOptions(prevState => []);
      setReceiveStockForInspect(prevState => {
        return {
          ...prevState,
          productOption: null,
          receiveStocksDetailOption: null,
          quantity: 0,
          height: 0,
          width: 0,
          depth: 0,
        };
      });

      if (
        (condition.keyword !== null && condition.keyword.length > 0) ||
        (condition.customerId && condition.receiveStockId)
      ) {
        await getProducts();
      }
    })();
  }, [ condition, getProducts, setProductOptions, setReceiveStockForInspect ]);

  /**
   * 入荷検品状況の監視
   */
  useEffect((): void => {
    if (isOpen && isInspected) {
      handleOnClickInspectButton();
    }
  }, [ isOpen, isInspected, handleOnClickInspectButton ]);

  // handles

  /**
   * 検索キーワード変更イベント
   * @param {React.ChangeEvent<HTMLInputElement>} e
   */
  const handleOnChangeKeyword = (e: ChangeEvent<HTMLInputElement>): void => {
    setCondition(prevState => {
      return {
        ...prevState,
        keyword: e.target.value,
      };
    });
  };

  /**
   * 顧客ID変更イベント
   * @param {React.ChangeEvent<HTMLInputElement>} e
   */
  const handleOnChangeCustomerId = (e: ChangeEvent<HTMLInputElement>): void => {
    setCondition(prevState => {
      return {
        ...prevState,
        customerId: Integer.parseIntExceptNull(e.target.value),
      };
    });
  };

  /**
   * 入荷ID変更イベント
   * @param {React.ChangeEvent<HTMLInputElement>} e
   */
  const handleOnChangeReceiveStockId = (e: ChangeEvent<HTMLInputElement>): void => {
    setCondition(prevState => {
      return {
        ...prevState,
        receiveStockId: Integer.parseIntExceptNull(e.target.value),
      };
    });
  };

  /**
   * 従業員変更イベント
   * @param {ReactSelectOption} e
   */
  const handleOnChangeEmployee = (e: ReactSelectOption): void => {
    setCondition(prevState => {
      return {
        ...prevState,
        employee: e,
      };
    });
  };

  /**
   * 商品変更イベント
   * @param {ReceiveStockDetailType} e
   */
  const handleOnChangeProduct = (e: ReactSelectInspectOption): void => {
    setReceiveStockForInspect(prevState => {
      return {
        ...prevState,
        productOption: {
          value: e.value,
          label: e.label,
        },
        receiveStocksDetailOption: e,
        height: e.receiveStockDetail?.product.height || 0,
        width: e.receiveStockDetail?.product.width || 0,
        depth: e.receiveStockDetail?.product.depth || 0,
      };
    });
  };

  /**
   * 検品数変更イベント
   * @param {React.ChangeEvent<HTMLInputElement>} e
   */
  const handleOnChangeInspectQuantity = (e: ChangeEvent<HTMLInputElement>): void => {
    setReceiveStockForInspect(prevState => {
      return {
        ...prevState,
        quantity: Integer.parseIntExceptZero(e.target.value),
      };
    });
  };

  /**
   * 高さ数変更イベント
   * @param {React.ChangeEvent<HTMLInputElement>} e
   */
  const handleOnChangeProductHeight = (e: ChangeEvent<HTMLInputElement>): void => {
    setReceiveStockForInspect(prevState => {
      return {
        ...prevState,
        height: Integer.parseIntExceptZero(e.target.value),
      };
    });
  };

  /**
   * 幅変更イベント
   * @param {React.ChangeEvent<HTMLInputElement>} e
   */
  const handleOnChangeProductWidth = (e: ChangeEvent<HTMLInputElement>): void => {
    setReceiveStockForInspect(prevState => {
      return {
        ...prevState,
        width: Integer.parseIntExceptZero(e.target.value),
      };
    });
  };

  /**
   * 奥行き変更イベント
   * @param {React.ChangeEvent<HTMLInputElement>} e
   */
  const handleOnChangeProductDepth = (e: ChangeEvent<HTMLInputElement>): void => {
    setReceiveStockForInspect(prevState => {
      return {
        ...prevState,
        depth: Integer.parseIntExceptZero(e.target.value),
      };
    });
  };
  return (
    <EduITModal isOpen={isOpen}>
      <H2>入荷検品</H2>
      <Error422 errors={validationErrors} />
      <InputAndLabel
        id={"trackingNo"}
        text={"追跡番号または商品ラベル"}
        value={condition.keyword || ""}
        changeFunction={handleOnChangeKeyword}
      />
      <div className={`${commonClasses.flex__wrapper} ${commonClasses.flex_nowrap}`}>
        <InputOfCustomerId
          id={"customerId"}
          value={condition.customerId?.toString() || ""}
          text={"会員ID"}
          title={"YP"}
          changeFunction={handleOnChangeCustomerId}
        />
        <InputOfCustomerId
          id={"receiveStockId"}
          value={condition.receiveStockId?.toString() || ""}
          text={"入荷番号"}
          title={"W"}
          changeFunction={handleOnChangeReceiveStockId}
        />
      </div>
      <SelectAndLabel
        id={"status"}
        options={employeeOptions}
        text={"スタッフ検索"}
        changeFunction={handleOnChangeEmployee}
      />
      <div className={`${commonClasses.bb_solid}`} />
      <SelectAndLabel
        id={"product"}
        options={productOptions}
        text={"商品を確定"}
        value={receiveStockForInspect.productOption}
        changeInspectItemFunction={handleOnChangeProduct}
      />
      <InputAndLabel
        id={"quantity"}
        text={"検品数"}
        value={receiveStockForInspect.quantity.toString()}
        isSmall
        changeFunction={handleOnChangeInspectQuantity}
      />
      <InputOfSize
        id={"size"}
        text={"サイズ"}
        heightValue={receiveStockForInspect.height.toString()}
        widthValue={receiveStockForInspect.width.toString()}
        depthValue={receiveStockForInspect.depth.toString()}
        heightChangeFunction={handleOnChangeProductHeight}
        widthChangeFunction={handleOnChangeProductWidth}
        depthChangeFunction={handleOnChangeProductDepth}
        isSmall
      />
      <div className={`${commonClasses.bb_solid}`} />
      <div className={commonClasses.mt_16}>
        <Paragraph isBold isLeft>
          入庫候補一覧
        </Paragraph>
        {receiveStockForInspect.receiveStocksDetailOption && (
          <ReceiveStockInspectionTable
            receiveStockForInspect={receiveStockForInspect}
            inspectReceiveStock={inspectReceiveStock}
          />
        )}
      </div>
      <div className={commonClasses.mt_24}>
        <Paragraph isLink isCenter clickFunction={handleOnCloseButtonClick}>
          未入庫在庫一覧へ戻る
        </Paragraph>
      </div>
    </EduITModal>
  );
};

export default ReceiveStockInspectModal;
