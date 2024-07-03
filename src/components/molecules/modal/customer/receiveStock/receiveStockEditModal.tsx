"use client";

import H2 from "@/components/atoms/h2";
import InputAndLabel from "@/components/molecules/inputs/inputAndLabel";
import FormButton from "@/components/atoms/button/formButton";
import commonClasses from "@/styles/common/page.module.scss";
import Paragraph from "@/components/atoms/paragraph";
import { EduITModal } from "@/components/molecules/eduITModal";
import { ChangeEvent, ReactElement, useEffect } from "react";
import SmallButton from "@/components/atoms/button/smallButton";
import InputOfRemark from "@/components/molecules/inputs/inputOfRemark";
import plusIcon from "@/resource/img/plus.svg";
import Error422 from "@/components/molecules/errors/error422";
import { useIndex } from "@/hooks/customer/product/useIndex";
import SelectAndLabel from "@/components/molecules/selectAndLabel";
import { ReactSelectOption } from "@/types/reactSelectOptions/ReactSelectOption";
import Loading from "@/components/molecules/common/loading";
import { ProductAndQuantityType, ReceiveStockForUpdateType, useUpdate } from "@/hooks/customer/receiveStock/useUpdate";
import { ReceiveStockDbTableType } from "@/types/db/receiveStock/receiveStock";
import { Integer } from "@/lib/integer";
import { UUID } from "@/lib/uuid";

const ReceiveStockEditModal = ({
  isOpen,
  prevReceiveStock,
  handleOnCloseButtonClick,
  handleOnClickUpdateButton,
}: {
  isOpen: boolean;
  prevReceiveStock: ReceiveStockDbTableType;
  handleOnCloseButtonClick: () => void;
  handleOnClickUpdateButton: () => void;
}): ReactElement => {
  // custom hooks
  const {
    updateReceiveStock,
    receiveStockForUpdate,
    setReceiveStockForUpdate,
    isUpdated,
    setIsUpdated,
    validationErrors,
    setValidationErrors,
  } = useUpdate();

  const { getProducts, options } = useIndex();

  // useStates

  // useEffects

  /**
   * 初期化
   */
  useEffect((): void => {
    if (isOpen) {
      setValidationErrors(prevState => []);
      setIsUpdated(prevState => false);

      const prevProductAndQuantities = prevReceiveStock.receiveStockDetails.map(prevItem => {
        return {
          uuid: UUID.generate(),
          quantity: prevItem.requestedReceiveQuantity,
          option: {
            value: prevItem.product.id,
            label: prevItem.product.name,
          },
        } as ProductAndQuantityType;
      });

      setReceiveStockForUpdate(prevState => {
        return {
          id: prevReceiveStock.id,
          productAndQuantities: prevProductAndQuantities,
          trackingNo: prevReceiveStock.trackingNo,
          publicRemarks: prevReceiveStock.publicRemarks,
          publicRemarksFile: null,
        } as ReceiveStockForUpdateType;
      });

      (async (): Promise<void> => {
        await getProducts();
      })();
    }
  }, [ isOpen, setValidationErrors, setIsUpdated, getProducts, setReceiveStockForUpdate, prevReceiveStock ]);

  /**
   * 更新後の処理
   */
  useEffect((): void => {
    if (isUpdated) {
      handleOnClickUpdateButton();
    }
  }, [ isUpdated, handleOnClickUpdateButton ]);

  // handles

  /**
   * 追加ボタンクリック
   */
  const handleOnClickAddButton = async (): Promise<void> => {
    setReceiveStockForUpdate(prevState => {
      if (!prevState) {
        return {
          id: null,
          productAndQuantities: [],
          trackingNo: "",
          publicRemarks: null,
          publicRemarksFile: null,
        } as ReceiveStockForUpdateType;
      }
      return {
        ...prevState,
        productAndQuantities: [
          ...prevState.productAndQuantities,
          {
            uuid: UUID.generate(),
            quantity: 0,
          },
        ],
      } as ReceiveStockForUpdateType;
    });
  };

  /**
   * 商品変更イベント
   * @param uuid
   * @param e
   */
  const handleOnChangeProduct = async (uuid: string, e: ReactSelectOption): Promise<void> => {
    setReceiveStockForUpdate(prevState => {
      if (!prevState) return prevState;

      const newProductAndQuantities = prevState.productAndQuantities.map(productAndQuantity => {
        if (productAndQuantity.uuid === uuid) {
          return { ...productAndQuantity, option: e };
        }
        return productAndQuantity;
      });

      return {
        ...prevState,
        productAndQuantities: newProductAndQuantities,
      };
    });
  };

  /**
   * 数量変更イベント
   * @param uuid
   * @param e
   */
  const handleOnChangeQuantity = async (uuid: string, e: ChangeEvent<HTMLInputElement>): Promise<void> => {
    const newQuantity = Integer.parseIntExceptZero(e.target.value);

    setReceiveStockForUpdate(prevState => {
      if (!prevState) return prevState;

      const newProductAndQuantities = prevState.productAndQuantities.map(productAndQuantity => {
        if (productAndQuantity.uuid === uuid) {
          return { ...productAndQuantity, quantity: newQuantity };
        }
        return productAndQuantity;
      });

      return {
        ...prevState,
        productAndQuantities: newProductAndQuantities,
      };
    });
  };

  /**
   * 追跡番号変更イベント
   * @param e
   */
  const handleOnChangeTrackingNo = async (e: ChangeEvent<HTMLInputElement>): Promise<void> => {
    setReceiveStockForUpdate(prevState => {
      if (!prevState) return prevState;

      return {
        ...prevState,
        trackingNo: e.target.value,
      };
    });
  };

  /**
   * 備考変更イベント
   * @param e
   */
  const handleOnChangePublicRemarks = async (e: ChangeEvent<HTMLInputElement>): Promise<void> => {
    setReceiveStockForUpdate(prevState => {
      if (!prevState) return prevState;

      return {
        ...prevState,
        publicRemarks: e.target.value,
      };
    });
  };

  /**
   * 備考添付ファイル変更イベント
   * @param e
   */
  const handleOnChangePublicRemarksFile = async (e: ChangeEvent<HTMLInputElement>): Promise<void> => {
    const selectedFile = e.target.files?.[0] ?? null;
    setReceiveStockForUpdate(prevState => {
      if (!prevState) return prevState;

      return {
        ...prevState,
        publicRemarksFile: selectedFile,
      };
    });
  };

  // loading condition
  if (isOpen && !receiveStockForUpdate && !prevReceiveStock) {
    return <Loading />;
  }

  const classNames = [ commonClasses.flex__wrapper, commonClasses.justify_between, commonClasses.aline_center ];

  const classNamesMt8 = [
    commonClasses.flex__wrapper,
    commonClasses.justify_between,
    commonClasses.aline_center,
    commonClasses.mt_8,
  ];

  return (
    <EduITModal isOpen={isOpen}>
      <H2>入荷依頼修正</H2>
      <Error422 errors={validationErrors} />
      {receiveStockForUpdate?.productAndQuantities &&
        receiveStockForUpdate.productAndQuantities.map((productAndQuantity, index) => {
          return (
            <div key={productAndQuantity.uuid} className={classNames.join(" ")}>
              <SelectAndLabel
                id={"product"}
                options={options}
                text={"商品名"}
                isRequired
                isLarge
                showLabel={index === 0}
                value={productAndQuantity.option}
                changeFunction={async e => {
                  await handleOnChangeProduct(productAndQuantity.uuid, e);
                }}
              />
              <InputAndLabel
                id={"quantity"}
                text={"数量"}
                value={productAndQuantity.quantity.toString()}
                isRequired
                isSmall
                showLabel={index === 0}
                changeFunction={async (e: ChangeEvent<HTMLInputElement>) => {
                  await handleOnChangeQuantity(productAndQuantity.uuid, e);
                }}
              />
            </div>
          );
        })}

      <div className={classNamesMt8.join(" ")}>
        <SmallButton text={"追加"} icon={plusIcon} isBlue clickFunction={handleOnClickAddButton} />
        <SmallButton text={"外箱ラベル"} isDark clickFunction={() => alert("別PHで対応")} />
      </div>
      <InputAndLabel
        id={"trackingNo"}
        text={"追跡番号"}
        value={receiveStockForUpdate?.trackingNo || ""}
        changeFunction={async (e: ChangeEvent<HTMLInputElement>) => await handleOnChangeTrackingNo(e)}
      />
      <InputOfRemark
        id={"publicRemarks"}
        text={"備考"}
        value={receiveStockForUpdate?.publicRemarks || ""}
        file={receiveStockForUpdate?.publicRemarksFile}
        changeTextFunction={async (e: ChangeEvent<HTMLInputElement>) => {
          await handleOnChangePublicRemarks(e);
        }}
        changeFileFunction={async (e: ChangeEvent<HTMLInputElement>) => {
          await handleOnChangePublicRemarksFile(e);
        }}
      />
      <Paragraph>前回のファイル：{prevReceiveStock.publicRemarksFilePath}</Paragraph>
      <div className={commonClasses.mt_24}>
        <FormButton
          text={"入荷依頼修正"}
          color={"green"}
          onClick={async (): Promise<void> => await updateReceiveStock()}
        />
        <Paragraph isLink isCenter isMarginTop clickFunction={handleOnCloseButtonClick}>
          入荷依頼修正をやめる
        </Paragraph>
      </div>
    </EduITModal>
  );
};

export default ReceiveStockEditModal;
