"use client";

import H2 from "@/components/atoms/h2";
import InputAndLabel from "@/components/molecules/inputs/inputAndLabel";
import FormButton from "@/components/atoms/button/formButton";
import commonClasses from "@/styles/common/page.module.scss";
import Paragraph from "@/components/atoms/paragraph";
import { EduITModal } from "@/components/molecules/eduITModal";
import { ChangeEvent, ReactElement, useEffect } from "react";
import { useStoreToNormalProduct } from "@/hooks/customer/product/useStoreToNormalProduct";
import Error422 from "@/components/molecules/errors/error422";
import { Integer } from "@/lib/integer";

const ProductNormalProductCreateModal = ({
  hubCode,
  activeProductTypeTab,
  isOpen,
  handleOnCloseButtonClick,
  handleOnClickStoreButton,
}: {
  hubCode: string;
  activeProductTypeTab: string;
  isOpen: boolean;
  handleOnCloseButtonClick: () => void;
  handleOnClickStoreButton: () => void;
}): ReactElement => {
  const {
    postProduct,
    productForStore,
    setProductForStore,
    isStored,
    setIsStored,
    validationErrors,
    setValidationErrors,
  } = useStoreToNormalProduct(hubCode, activeProductTypeTab);

  useEffect((): void => {
    if (isOpen) {
      setProductForStore(prevState => {
        return {
          name: "",
          sku: "",
          janCode: "",
          nameToSlip: "",
          unitPrice: 0,
        };
      });
      setValidationErrors(prevState => []);
      setIsStored(prevState => false);
    }
  }, [ isOpen, setProductForStore, setValidationErrors, setIsStored ]);

  useEffect((): void => {
    if (isOpen && isStored) {
      handleOnClickStoreButton();
    }
  }, [ isStored, handleOnClickStoreButton, isOpen ]);

  /**
   * 商品名変更イベント
   * @param e
   */
  const handleOnNameChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setProductForStore(prevState => {
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
    setProductForStore(prevState => {
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
    setProductForStore(prevState => {
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
    setProductForStore(prevState => {
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
    setProductForStore(prevState => {
      return {
        ...prevState,
        unitPrice: Integer.parseIntExceptZero(e.target.value),
      };
    });
  };

  return (
    <EduITModal isOpen={isOpen}>
      <H2>商品追加 (通常)</H2>
      <Error422 errors={validationErrors} />
      <InputAndLabel
        id={"name"}
        text={"商品名"}
        value={productForStore.name}
        isRequired
        changeFunction={handleOnNameChange}
      />
      <InputAndLabel
        id={"sku"}
        text={"お客様SKU"}
        value={productForStore.sku || ""}
        isRequired
        changeFunction={handleOnSkuChange}
      />
      <InputAndLabel
        id={"janCode"}
        text={"JANコードまたはバーコード情報"}
        value={productForStore.janCode || ""}
        changeFunction={handleOnJanCodeChange}
      />
      <InputAndLabel
        id={"nameToSlip"}
        text={"品名(12文字以内)"}
        value={productForStore.nameToSlip || ""}
        changeFunction={handleOnNameToSlipChange}
      />
      <InputAndLabel
        id={"unitPrice"}
        text={"単価"}
        value={productForStore.unitPrice.toString()}
        changeFunction={handleOnUnitPriceChange}
      />
      <div className={commonClasses.mt_24}>
        <FormButton text={"商品を追加する"} color={"green"} onClick={postProduct} />
        <Paragraph isLink isCenter isMarginTop clickFunction={handleOnCloseButtonClick}>
          商品追加をやめる
        </Paragraph>
      </div>
    </EduITModal>
  );
};

export default ProductNormalProductCreateModal;
