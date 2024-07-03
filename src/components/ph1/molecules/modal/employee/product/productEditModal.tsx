"use client";

import { ChangeEvent, ReactElement, useEffect } from "react";
import H2 from "@/components/atoms/h2";
import InputAndLabel from "@/components/molecules/inputs/inputAndLabel";
import FormButton from "@/components/atoms/button/formButton";
import commonClasses from "@/styles/common/page.module.scss";
import Paragraph from "@/components/atoms/paragraph";
import InputOfSize from "@/components/molecules/inputs/inputOfSize";
import { ProductDbTableType } from "@/types/db/product/product";
import { useUpdate } from "@/hooks/employee/product/useUpdate";
import Error422 from "@/components/molecules/errors/error422";
import { EduITModal } from "@/components/molecules/eduITModal";
import { Integer } from "@/lib/integer";

const ProductModal = ({
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
  // customHooks

  const {
    putProduct,
    productForUpdate,
    setProductForUpdate,
    validationErrors,
    setValidationErrors,
    isUpdated,
    setIsUpdated,
  } = useUpdate();

  // useEffects

  /**
   * 初期化
   */
  useEffect((): void => {
    if (isOpen && prevProduct) {
      setProductForUpdate(prevState => {
        return {
          id: prevProduct.id,
          weight: prevProduct.weight || 0,
          height: prevProduct.height || 0,
          width: prevProduct.width || 0,
          depth: prevProduct.depth || 0,
        };
      });
      setValidationErrors(prevState => []);
      setIsUpdated(prevState => false);
    }
  }, [ setProductForUpdate, setValidationErrors, setIsUpdated, isOpen, prevProduct ]);

  useEffect((): void => {
    if (isUpdated) {
      handleOnClickUpdateButton();
    }
  }, [ isUpdated, handleOnClickUpdateButton ]);

  // handles

  /**
   * 重量変更イベント
   * @param {React.ChangeEvent<HTMLInputElement>} e
   */
  const handleOnChangeWeight = (e: ChangeEvent<HTMLInputElement>) => {
    setProductForUpdate(prevState => {
      return {
        ...prevState,
        weight: Integer.parseIntExceptZero(e.target.value),
      };
    });
  };

  /**
   * 高さ変更イベント
   * @param {React.ChangeEvent<HTMLInputElement>} e
   */
  const handleOnChangeHeight = (e: ChangeEvent<HTMLInputElement>) => {
    setProductForUpdate(prevState => {
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
  const handleOnChangeWidth = (e: ChangeEvent<HTMLInputElement>) => {
    setProductForUpdate(prevState => {
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
  const handleOnChangeDepth = (e: ChangeEvent<HTMLInputElement>) => {
    setProductForUpdate(prevState => {
      return {
        ...prevState,
        depth: Integer.parseIntExceptZero(e.target.value),
      };
    });
  };

  return (
    <EduITModal isOpen={isOpen}>
      <H2>商品マスタ編集</H2>
      <Error422 errors={validationErrors} />
      <div className={`${commonClasses.flex__wrapper} ${commonClasses.flex_nowrap}`}>
        <InputAndLabel
          id={"weight"}
          text={"商品重量"}
          value={productForUpdate.weight.toString()}
          isRequired
          isSmall
          changeFunction={handleOnChangeWeight}
        />
        <InputOfSize
          id={"size"}
          text={"商品サイズ"}
          heightValue={productForUpdate.height.toString()}
          heightChangeFunction={handleOnChangeHeight}
          widthValue={productForUpdate.width.toString()}
          widthChangeFunction={handleOnChangeWidth}
          depthValue={productForUpdate.depth.toPrecision()}
          depthChangeFunction={handleOnChangeDepth}
          isRequired
          isMarginLeft
          isSmall
        />
      </div>
      <div className={commonClasses.mt_24}>
        <FormButton text={"編集する"} color={"green"} onClick={putProduct} />
        <Paragraph isLink isCenter isMarginTop clickFunction={handleOnCloseButtonClick}>
          商品管理へ戻る
        </Paragraph>
      </div>
    </EduITModal>
  );
};

export default ProductModal;
