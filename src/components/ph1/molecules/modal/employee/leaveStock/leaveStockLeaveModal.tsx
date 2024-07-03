"use client";

import { ChangeEvent, Dispatch, ReactElement, SetStateAction, useEffect, useState } from "react";
import H2 from "@/components/atoms/h2";
import FormButton from "@/components/atoms/button/formButton";
import commonClasses from "@/styles/common/page.module.scss";
import Paragraph from "@/components/atoms/paragraph";
import { ReactSelectOption } from "@/types/reactSelectOptions/ReactSelectOption";
import { UUID } from "@/lib/uuid";
import { ProductStockType } from "@/types/db/product/productStock";
import { LeaveStockTableDbType } from "@/types/db/leaveStock/leaveStock";
import { useLeave } from "@/hooks/employee/leaveStock/leave/useLeave";
import { Integer } from "@/lib/integer";
import { useFind } from "@/hooks/employee/leaveStock/leave/useFind";
import { EduITModal } from "@/components/molecules/eduITModal";
import Error422 from "@/components/molecules/errors/error422";
import InputAndLabel from "@/components/molecules/inputs/inputAndLabel";
import SmallButton from "@/components/atoms/button/smallButton";
import SelectAndLabel from "@/components/molecules/selectAndLabel";
import LeaveStockTable from "@/components/molecules/leaveStock/leaveStockTable";
import CheckAndLabel from "@/components/molecules/checkAndLabel";

const LeaveStockLeaveModal = ({
  isOpen,
  handleOnCloseButtonClick,
  handleOnClickLeaveButton,
  handleOnClickOpenReceiveToShowModal,
  selectedLeaveStockToShow,
  setSelectedLeaveStockToShow,
}: {
  isOpen: boolean;
  handleOnCloseButtonClick: () => void;
  handleOnClickLeaveButton: () => void;
  handleOnClickOpenReceiveToShowModal: () => void;
  selectedLeaveStockToShow: LeaveStockTableDbType | null;
  setSelectedLeaveStockToShow: Dispatch<SetStateAction<LeaveStockTableDbType | null>>;
}): ReactElement => {
  // useStates
  const [ productOptions, setProductOptions ] = useState<ReactSelectOption[]>([]);
  const [ productStocks, setProductStocks ] = useState<ProductStockType[]>([]);
  const [ isDisabled, setIsDisabled ] = useState<boolean>(false);
  const [ isAgree, setIsAgree ] = useState<boolean>(false);

  // custom hooks
  const { leaveStock: foundLeaveStock, getLeaveStock, setCondition, condition } = useFind();

  const {
    leaveStock,
    leaveStockForLeave,
    setLeaveStockForLeave,
    validationErrors,
    setValidationErrors,
    isLeaved,
    setIsLeaved,
  } = useLeave();

  // useEffects

  useEffect((): void => {
    if (isOpen) {
      setCondition(prevState => {
        return {
          ...prevState,
          isUnLeaved: false,
        };
      });
      setLeaveStockForLeave(prevState => {
        return {
          leaveStockId: null,
          productOption: null,
          leaveQuantity: 0,
          barCode: null,
        };
      });
      setIsDisabled(prevState => false);
      setIsAgree(prevState => false);
      setIsLeaved(prevState => false);
      setSelectedLeaveStockToShow(prevState => null);
      setValidationErrors(prevState => []);
    }
  }, [
    isOpen,
    setCondition,
    setIsDisabled,
    setIsAgree,
    setLeaveStockForLeave,
    setIsLeaved,
    setSelectedLeaveStockToShow,
    setValidationErrors,
  ]);

  useEffect((): void => {
    if (isOpen && condition.trackingNo) {
      (async (): Promise<void> => {
        await getLeaveStock();
      })();
    }
  }, [ isOpen, condition.trackingNo, getLeaveStock ]);

  useEffect((): void => {
    if (isOpen && condition.trackingNo) {
      // leaveStocksから全てのproductを取得
      const allProducts = foundLeaveStock?.leaveStockProducts.map(lsp => lsp.product);
      if (!allProducts) {
        return;
      }

      // productsから全ての在庫を取得（ローカル変数）
      const productStocksWithProductInfo: ProductStockType[] = allProducts.flatMap(product =>
        product.productStocks.map(productStock => ({
          ...productStock,
          product: product,
        })));

      setProductStocks((prevState: ProductStockType[]) => productStocksWithProductInfo);
      // 重複を排除
      const uniqueProducts = Array.from(new Set(allProducts.map(p => p.id))).map(id => {
        return allProducts.find(p => p.id === id);
      });

      // ReactSelectOptionの形式でproductOptionsを設定
      const options: ReactSelectOption[] = uniqueProducts.map(product => ({
        label: product?.name || "",
        value: product?.id || "",
      }));
      if (options) {
        setProductOptions(prevState => options);
      }
    }
  }, [ condition.trackingNo, isOpen, foundLeaveStock, setProductOptions, setProductStocks, leaveStockForLeave.barCode ]);

  /**
   * 出荷依頼が見つかるか監視
   */
  useEffect((): void => {
    if (isOpen && foundLeaveStock) {
      setLeaveStockForLeave(prevState => {
        return {
          ...prevState,
          leaveStockId: foundLeaveStock.id,
        };
      });
    }
  }, [ isOpen, foundLeaveStock, setLeaveStockForLeave ]);

  /**
   * 出庫依頼確認状況の監視
   */
  useEffect((): void => {
    if (selectedLeaveStockToShow) {
      handleOnClickOpenReceiveToShowModal();
    }
  }, [ handleOnClickOpenReceiveToShowModal, selectedLeaveStockToShow ]);

  /**
   * バーコードの監視
   */
  useEffect((): void => {
    (async (): Promise<void> => {
      const length = leaveStockForLeave.barCode?.length || 0;
      if (length > 0) {
        await leaveStock(true);
      }
      setLeaveStockForLeave(prevState => {
        return {
          ...prevState,
          barCode: null,
        };
      });
    })();
  }, [ leaveStockForLeave.barCode, setLeaveStockForLeave ]);

  /**
   * 出庫状況の監視
   */
  useEffect((): void => {
    if (isOpen && isLeaved) {
      (async (): Promise<void> => {
        await getLeaveStock();
      })();
    }
  }, [ isOpen, isLeaved, handleOnClickLeaveButton, getLeaveStock ]);

  // handles

  /**
   * 追跡番号変更イベント
   * @param {React.ChangeEvent<HTMLInputElement>} e
   */
  const handleOnChangeTrackingNo = (e: ChangeEvent<HTMLInputElement>): void => {
    setCondition(prevState => {
      return {
        ...prevState,
        trackingNo: e.target.value,
      };
    });
    setLeaveStockForLeave(prevState => {
      return {
        ...prevState,
        productOption: null,
        leaveQuantity: 0,
      };
    });
  };

  /**
   * 対応完了変更イベント
   * @param {React.ChangeEvent<HTMLInputElement>} e
   */
  const handleOnChangeCheckBox = (e: ChangeEvent<HTMLInputElement>): void => {
    setIsDisabled(prevState => e.target.checked);
    setIsAgree(prevState => !prevState);
  };

  /**
   * 出庫数変更イベント
   * @param {React.ChangeEvent<HTMLInputElement>} e
   */
  const handleOnChangeLeaveQuantity = (e: ChangeEvent<HTMLInputElement>): void => {
    setLeaveStockForLeave(prevState => {
      return {
        ...prevState,
        leaveQuantity: Integer.parseIntExceptZero(e.target.value),
      };
    });
  };

  /**
   * バーコード変更イベント
   * @param {React.ChangeEvent<HTMLInputElement>} e
   */
  const handleOnChangeBarCode = (e: ChangeEvent<HTMLInputElement>): void => {
    setLeaveStockForLeave(prevState => {
      return {
        ...prevState,
        barCode: e.target.value,
      };
    });
  };

  /**
   * 商品変更イベント
   *
   * @param {ReactSelectOption} e
   */
  const handleOnChangeProductOption = (e: ReactSelectOption): void => {
    setLeaveStockForLeave(prevState => {
      return {
        ...prevState,
        productOption: e,
      };
    });
  };

  return (
    <EduITModal isOpen={isOpen}>
      <H2>出庫処理</H2>
      <Error422 errors={validationErrors} />
      <InputAndLabel
        id={"trackingNo"}
        text={"追跡番号"}
        value={condition.trackingNo || ""}
        changeFunction={handleOnChangeTrackingNo}
      />
      <div className={`${commonClasses.bb_solid} ${commonClasses.mb_16}`} />
      <Paragraph isLeft isBold>
        見つかった出荷依頼
      </Paragraph>
      {foundLeaveStock && (
        <div className={`${commonClasses.flex__wrapper} ${commonClasses.aline_center} ${commonClasses.mt_16}`}>
          <Paragraph isBold isLeft>
            {foundLeaveStock.code}
          </Paragraph>
          <div className={commonClasses.ml_10}>
            <SmallButton
              text={"確認"}
              isBlue
              clickFunction={() => {
                setSelectedLeaveStockToShow(prevState => foundLeaveStock);
              }}
            />
          </div>
        </div>
      )}

      <SelectAndLabel
        id={"productOptions"}
        options={productOptions}
        text={"商品"}
        isSmall
        value={leaveStockForLeave.productOption}
        changeFunction={handleOnChangeProductOption}
      />
      <InputAndLabel
        text={"出庫数"}
        id={"leaveQuantity"}
        value={leaveStockForLeave.leaveQuantity.toString()}
        isHalf
        changeFunction={handleOnChangeLeaveQuantity}
      />
      <div className={`${commonClasses.bb_solid}`}></div>
      <div className={commonClasses.mt_16}>
        <div className={`${commonClasses.flex__wrapper} ${commonClasses.justify_right} ${commonClasses.mb_16}`}>
          <InputAndLabel
            text={"バーコード"}
            id={"barCode"}
            value={leaveStockForLeave.barCode || ""}
            isSmall
            changeFunction={handleOnChangeBarCode}
          />
        </div>
        {productStocks &&
          productStocks.map((productStock: ProductStockType) => {
            return <LeaveStockTable key={UUID.generate()} productStock={productStock} />;
          })}
      </div>
      <div className={commonClasses.mt_16}>
        <CheckAndLabel
          checked={isAgree}
          id="agree"
          text={"添付資料備考に記載があります。対応完了しましたか？"}
          changeFunction={handleOnChangeCheckBox}
        />
      </div>
      <div className={commonClasses.mt_24}>
        <FormButton
          text={"出庫処理のピッキングを完了する"}
          color={"green"}
          disabled={!isDisabled}
          onClick={() => leaveStock(false)}
        />
        <Paragraph isLink isCenter isMarginTop clickFunction={handleOnCloseButtonClick}>
          出庫管理へ戻る
        </Paragraph>
      </div>
    </EduITModal>
  );
};

export default LeaveStockLeaveModal;
