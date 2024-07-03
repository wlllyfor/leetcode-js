"use client";

import H2 from "@/components/atoms/h2";
import InputAndLabel from "@/components/molecules/inputs/inputAndLabel";
import FormButton from "@/components/atoms/button/formButton";
import commonClasses from "@/styles/common/page.module.scss";
import Paragraph from "@/components/atoms/paragraph";
import { ChangeEvent, ReactElement, useEffect } from "react";
import { EduITModal } from "@/components/molecules/eduITModal";
import { useUpdate } from "@/hooks/customer/product/useUpdate";
import { ProductDbTableType } from "@/types/db/product/product";
import Error422 from "@/components/molecules/errors/error422";
import { Integer } from "@/lib/integer";

const ProductNormalProductEditModal = ({
  prevProduct,
  isOpen,
  handleOnCloseButtonClick,
  handleOnClickUpdateButton,
}: {
  prevProduct: ProductDbTableType;
  isOpen: boolean;
  handleOnCloseButtonClick: () => void;
  handleOnClickUpdateButton: () => void;
}): ReactElement => {
  const {
    putProduct,
    productForUpdate,
    setProductForUpdate,
    isUpdated,
    setIsUpdated,
    validationErrors,
    setValidationErrors,
  } = useUpdate();

  useEffect((): void => {
    if (isOpen && prevProduct) {
      setProductForUpdate(prevState => {
        return {
          name: prevProduct.name ?? "",
          sku: prevProduct.sku ?? "",
          janCode: prevProduct.janCode ?? "",
          nameToSlip: prevProduct.nameToSlip ?? "",
          unitPrice: prevProduct.unitPrice,
          caseProductType: null,
          childProducts: null,
        };
      });
      setValidationErrors(prevState => []);
      setIsUpdated(prevState => false);
    }
  }, [ isOpen, prevProduct, setProductForUpdate, setValidationErrors, setIsUpdated ]);

  useEffect((): void => {
    if (isOpen && isUpdated) {
      handleOnClickUpdateButton();
    }
  }, [ isOpen, isUpdated, handleOnClickUpdateButton ]);

  /**
   * 商品名変更イベント
   * @param e
   */
  const handleOnNameChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setProductForUpdate(prevState => {
      return {
        ...prevState,
        name: e.target.value,
      };
    });
  };

  /**
   * SKU変更イベント
   * @param e
   */
  const handleOnSkuChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setProductForUpdate(prevState => {
      return {
        ...prevState,
        sku: e.target.value,
      };
    });
  };

  /**
   * JanCode変更イベント
   * @param e
   */
  const handleOnJanCodeChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setProductForUpdate(prevState => {
      return {
        ...prevState,
        janCode: e.target.value,
      };
    });
  };

  /**
   * 品名変更イベント
   * @param e
   */
  const handleOnNameToSlipChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setProductForUpdate(prevState => {
      return {
        ...prevState,
        nameToSlip: e.target.value,
      };
    });
  };

  /**
   * 単価変更イベント
   * @param e
   */
  const handleOnUnitPriceChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setProductForUpdate(prevState => {
      return {
        ...prevState,
        unitPrice: Integer.parseIntExceptZero(e.target.value),
      };
    });
  };

  if (isOpen && prevProduct === null) {
    // todo:Loadingコンポーネント
    return <Paragraph>Loading...</Paragraph>;
  }

  return (
    <EduITModal isOpen={isOpen}>
      <H2>商品編集 (通常)</H2>
      <Error422 errors={validationErrors} />
      <InputAndLabel
        id={"name"}
        text={"商品名"}
        value={productForUpdate.name}
        isRequired
        changeFunction={handleOnNameChange}
      />
      <InputAndLabel
        id={"sku"}
        text={"お客様SKU"}
        value={productForUpdate.sku ?? ""}
        isRequired
        changeFunction={handleOnSkuChange}
      />
      <InputAndLabel
        id={"janCode"}
        text={"JANコードまたはバーコード情報"}
        value={productForUpdate.janCode ?? ""}
        changeFunction={handleOnJanCodeChange}
      />
      <InputAndLabel
        id={"nameToSlip"}
        text={"品名(12文字以内)"}
        value={productForUpdate.nameToSlip ?? ""}
        changeFunction={handleOnNameToSlipChange}
      />
      <InputAndLabel
        id={"unitPrice"}
        text={"単価"}
        value={productForUpdate.unitPrice.toString()}
        changeFunction={handleOnUnitPriceChange}
      />
      <div className={commonClasses.mt_24}>
        <FormButton
          text={"商品を編集する"}
          color={"green"}
          onClick={async (): Promise<void> => {
            putProduct(prevProduct);
          }}
        />
        <Paragraph isLink isCenter isMarginTop clickFunction={handleOnCloseButtonClick}>
          商品編集をやめる
        </Paragraph>
      </div>
    </EduITModal>
  );
};

export default ProductNormalProductEditModal;
