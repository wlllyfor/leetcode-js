"use client";

import H2 from "@/components/atoms/h2";
import InputAndLabel from "@/components/molecules/inputs/inputAndLabel";
import SelectAndLabel from "@/components/molecules/selectAndLabel";
import FormButton from "@/components/atoms/button/formButton";
import DeleteButton from "@/components/atoms/button/deleteButton";
import commonClasses from "@/styles/common/page.module.scss";
import Paragraph from "@/components/atoms/paragraph";
import { EduITModal } from "@/components/molecules/eduITModal";
import { ChangeEvent, ReactElement, useEffect, useState } from "react";
import SmallButton from "@/components/atoms/button/smallButton";
import { useStoreToCaseProduct } from "@/hooks/customer/product/useStoreToCaseProduct";
import { useIndex } from "@/hooks/customer/product/useIndex";
import { useIndex as useCaseProductTypeIndex } from "@/hooks/enum/caseProductType/useIndex";
import { defaultReactSelectOption, ReactSelectOption } from "@/types/reactSelectOptions/ReactSelectOption";
import ProductCaseAddChildProductInput from "@/components/molecules/product/productCaseAddChildProductInput";
import ProductCaseAddChildProductSelect from "@/components/molecules/product/productCaseAddChildProductSelect";
import Label from "@/components/atoms/label";
import Error422 from "@/components/molecules/errors/error422";
import { Integer } from "@/lib/integer";
import { UUID } from "@/lib/uuid";

const ProductCaseProductCreateModal = ({
  hubCode,
  isOpen,
  handleOnCloseButtonClick,
  handleOnClickStoreButton,
}: {
  hubCode: string;
  isOpen: boolean;
  handleOnCloseButtonClick: () => void;
  handleOnClickStoreButton: () => void;
}): ReactElement => {
  const {
    postProduct,
    productForStore,
    setProductForStore,
    validationErrors,
    setValidationErrors,
    isStored,
    setIsStored,
  } = useStoreToCaseProduct(hubCode);

  // 明細商品用のフック
  const { getProducts, condition, setCondition, products: productForCaseChild } = useIndex();

  const { getEnums, enums } = useCaseProductTypeIndex();

  // 内容種別をもとに取得される商品をもとに生成されるSelectのOption
  const [ productsForCaseDetailOption, setProductsForCaseDetailOption ] = useState<ReactSelectOption[]>([]);

  useEffect((): void => {
    if (isOpen) {
      setProductForStore(prevState => {
        return {
          name: "",
          sku: "",
          janCode: "",
          nameToSlip: "",
          caseProductType: "",
          childProducts: [
            {
              keyId: UUID.generate(),
              id: null,
              quantity: null,
            },
          ],
        };
      });
      setValidationErrors(prevState => []);
      const option: ReactSelectOption = defaultReactSelectOption;
      setProductsForCaseDetailOption(prevState => [ ...prevState, option ]);
      setIsStored(prevState => false);

      getEnums();
    }
  }, [ isOpen, setProductForStore, setProductsForCaseDetailOption, setIsStored, setValidationErrors, getEnums ]);

  useEffect((): void => {
    if (isStored) {
      handleOnClickStoreButton();
    }
  }, [ isStored, handleOnClickStoreButton ]);

  useEffect((): void => {
    // 明細商品の更新を行う
    if (productForCaseChild) {
      const options = productForCaseChild.map(
        product =>
          ({
            value: product.id,
            label: product.name,
          }) as ReactSelectOption,
      );
      setProductsForCaseDetailOption(prevState => options);
    }
  }, [ productForCaseChild ]);

  /**
   * 取得商品変更
   */
  useEffect((): void => {
    (async (): Promise<void> => {
      if (isOpen) {
        await getProducts();
      }
    })();
  }, [ getProducts, isOpen, condition ]);

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
   * 内容種別変更イベント
   * @param e
   */
  const handleOnCaseProductTypeChange = async (e: ReactSelectOption): Promise<void> => {
    setProductForStore(prevState => {
      return {
        ...prevState,
        caseProductType: e.value.toString(),
        childProducts: [
          {
            keyId: UUID.generate(),
            id: null,
            quantity: null,
          },
        ],
      };
    });
    setProductsForCaseDetailOption(prevState => []);
    setCondition(prevState => {
      return {
        ...prevState,
        productType: e.value.toString(),
      };
    });
  };

  /**
   * 明細商品変更イベント
   * @param uuid
   * @param e
   */
  const handleOnDetailItemChange = async (uuid: string, e: ReactSelectOption): Promise<void> => {
    setProductForStore(prevState => {
      const updateProductValues = !prevState.childProducts
        ? null
        : prevState.childProducts.map(item => {
          if (item.keyId === uuid) {
            // `e.value` が `number | null` 型であることを確認し、型に合わせて変更
            const updatedValue = Integer.parseIntExceptNull(e.value);

            // 更新した値で要素を更新
            return { ...item, id: updatedValue };
          }
          return item;
        });

      return {
        ...prevState,
        childProducts: updateProductValues,
      };
    });
  };

  /**
   * 明細数量変更イベント
   * @param uuid
   * @param e
   */
  const handleOnDetailItemQuantityChange = async (uuid: string, e: ChangeEvent<HTMLInputElement>): Promise<void> => {
    setProductForStore(prevState => {
      const updateProductValues = !prevState.childProducts
        ? null
        : prevState.childProducts.map((item, i) => {
          if (item.keyId === uuid) {
            // 新しい値で要素を更新
            if (e.target.value) {
              return {
                ...item,
                quantity: Integer.parseIntExceptZero(e.target.value),
              };
            } else {
              return { ...item, quantity: 0 };
            }
          }
          return item;
        });

      return {
        ...prevState,
        childProducts: updateProductValues,
      };
    });
  };

  /**
   * 明細追加ボタン押下イベント
   */
  const handleOnClickAddDetail = async (): Promise<void> => {
    setProductForStore(prevState => {
      const newElement = {
        keyId: UUID.generate(),
        id: null,
        quantity: null,
      };
      if (prevState.childProducts) {
        return {
          ...prevState,
          childProducts: [ ...prevState.childProducts, newElement ],
        };
      }
      return {
        ...prevState,
        childProducts: [ newElement ],
      };
    });
  };

  /**
   * 明細削除ボタン押下イベント
   */
  const handleOnClickDeleteDetail = async (uuid: string): Promise<void> => {
    setProductForStore(prevState => {
      if (prevState.childProducts) {
        return {
          ...prevState,
          childProducts: prevState.childProducts.filter(item => item.keyId !== uuid),
        };
      }
      return prevState;
    });
  };

  const classNamesMt16 = [
    commonClasses.flex__wrapper,
    commonClasses.flex_nowrap,
    commonClasses.aline_end,
    commonClasses.mt_16,
  ];

  const classNamesWrapper = [
    commonClasses.flex__wrapper,
    commonClasses.flex_nowrap,
    commonClasses.aline_end,
    commonClasses.justify_between,
  ];

  return (
    <EduITModal isOpen={isOpen}>
      <H2>商品追加 (ケース)</H2>
      <Error422 errors={validationErrors} />
      <InputAndLabel
        id={"name"}
        text={"商品名"}
        value={productForStore.name}
        isRequired
        placeholder={"商品名 ○個"}
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
      <SelectAndLabel
        id={"type"}
        options={enums}
        text={"内容種別"}
        isRequired
        isSmall
        isMulti={false}
        changeFunction={handleOnCaseProductTypeChange}
      />
      <div className={classNamesMt16.join(" ")}>
        <Label text={"商品名"} isHalf isRequired />
        <Label text={"数量"} isHalf isRequired />
      </div>
      {productForStore.childProducts?.map(childProduct => {
        return (
          <div key={childProduct.keyId} className={classNamesWrapper.join(" ")}>
            <ProductCaseAddChildProductSelect
              options={productsForCaseDetailOption}
              changeFunction={(e: ReactSelectOption) => handleOnDetailItemChange(childProduct.keyId, e)}
            />
            <ProductCaseAddChildProductInput
              id={"quantity"}
              value={childProduct.quantity?.toString() || ""}
              changeFunction={async (e: ChangeEvent<HTMLInputElement>): Promise<void> => {
                await handleOnDetailItemQuantityChange(childProduct.keyId, e);
              }}
            />
            <DeleteButton clickFunction={() => handleOnClickDeleteDetail(childProduct.keyId)} />
          </div>
        );
      })}
      <div className={` ${commonClasses.flex__wrapper} ${commonClasses.mt_8}`}>
        <SmallButton text={"追加"} isBlue clickFunction={handleOnClickAddDetail} />
      </div>

      <div className={commonClasses.mt_24}>
        <FormButton text={"商品を追加する"} color={"green"} onClick={postProduct} />
        <Paragraph isLink isCenter isMarginTop clickFunction={handleOnCloseButtonClick}>
          商品追加をやめる
        </Paragraph>
      </div>
    </EduITModal>
  );
};

export default ProductCaseProductCreateModal;
