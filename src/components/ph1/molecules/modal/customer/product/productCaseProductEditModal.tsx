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
import { useIndex as useIndexCaseProductTypeLabels } from "@/hooks/enum/caseProductType/useIndex";
import { useIndex } from "@/hooks/customer/product/useIndex";
import { ProductDbTableType } from "@/types/db/product/product";
import { CaseProductChildType, useUpdate } from "@/hooks/customer/product/useUpdate";
import { ReactSelectOption } from "@/types/reactSelectOptions/ReactSelectOption";
import Error422 from "@/components/molecules/errors/error422";
import { Integer } from "@/lib/integer";
import { UUID } from "@/lib/uuid";

const ProductCaseProductEditModal = ({
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

  const { getProducts, condition, setCondition } = useIndex();

  const { getEnums, enums } = useIndexCaseProductTypeLabels();

  // 内容種別を元に取得される商品
  const [ productsForCaseDetail, setProductsForCaseDetail ] = useState<ProductDbTableType[] | null>(null);

  // 内容種別をもとに取得される商品をもとに生成されるSelectのOption
  const [ productsForCaseDetailOption, setProductsForCaseDetailOption ] = useState<ReactSelectOption[]>([]);

  // 内容種別のデフォルト値
  const [ defaultProductCaseType, setDefaultProductCaseType ] = useState<ReactSelectOption | null>(null);

  useEffect((): void => {
    if (isOpen && prevProduct) {
      setProductForUpdate(prevState => {
        // 明細商品がある場合、初期値を設定
        const initialChileProducts: CaseProductChildType[] = prevProduct.caseChildrenProducts
          ? prevProduct.caseChildrenProducts.map(
            caseChildrenProduct =>
              ({
                keyId: UUID.generate(),
                id: caseChildrenProduct.childProductId,
                quantity: caseChildrenProduct.quantity,
                default: {
                  value: caseChildrenProduct.childProduct?.id,
                  label: caseChildrenProduct.childProduct?.name,
                },
              }) as CaseProductChildType,
          )
          : [
            {
              keyId: UUID.generate(),
              id: null,
              quantity: null,
              default: null,
            },
          ];

        return {
          name: prevProduct.name ?? "",
          sku: prevProduct.sku ?? "",
          janCode: prevProduct.janCode ?? "",
          nameToSlip: prevProduct.nameToSlip ?? "",
          caseProductType: prevProduct.caseProductType?.name ?? "",
          childProducts: initialChileProducts,
          unitPrice: prevProduct.unitPrice,
        };
      });
      setValidationErrors(prevState => []);

      setProductsForCaseDetailOption(prevState => []);

      setIsUpdated(prevState => false);

      getEnums();
    }
  }, [
    isOpen,
    prevProduct,
    setProductForUpdate,
    setProductsForCaseDetailOption,
    setValidationErrors,
    setIsUpdated,
    getEnums,
    getProducts,
  ]);

  useEffect((): void => {
    if (productForUpdate.caseProductType) {
      setCondition(prevState => {
        return {
          ...prevState,
          productType: productForUpdate.caseProductType,
        };
      });
    }
  }, [ productForUpdate.caseProductType, setCondition ]);

  useEffect((): void => {
    if (condition.productType) {
      // 明細の取得、設定
      (async (): Promise<void> => {
        const productsForDetail = await getProducts();
        if (Array.isArray(productsForDetail)) {
          setProductsForCaseDetail(productsForDetail);
        }
      })();
    }
  }, [ condition.productType, setProductsForCaseDetail, getProducts ]);

  useEffect((): void => {
    if (enums && productForUpdate.caseProductType) {
      const defaultProductCaseType = enums.find(
        (item: ReactSelectOption) => item.value === productForUpdate.caseProductType,
      ) as ReactSelectOption;
      setDefaultProductCaseType(prevState => defaultProductCaseType);
    }
  }, [ enums, productForUpdate.caseProductType, setDefaultProductCaseType ]);

  useEffect((): void => {
    if (isUpdated) {
      handleOnClickUpdateButton();
    }
  }, [ isUpdated, handleOnClickUpdateButton ]);

  useEffect((): void => {
    // 明細商品の更新を行う
    if (productsForCaseDetail !== null) {
      const options = productsForCaseDetail.map(
        item =>
          ({
            value: item.id,
            label: item.name,
          }) as ReactSelectOption,
      );
      setProductsForCaseDetailOption(prevState => options);
    }
  }, [ productsForCaseDetail ]);

  // 非表示条件
  if (isOpen && !defaultProductCaseType) {
    return <Paragraph>Loading...</Paragraph>;
  }

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
   * 内容種別変更イベント
   * @param e
   */
  const handleOnCaseProductTypeChange = async (e: ReactSelectOption): Promise<void> => {
    setProductForUpdate(prevState => {
      return {
        ...prevState,
        caseProductType: e.value.toString(),
        childProducts: [
          {
            keyId: UUID.generate(),
            id: null,
            quantity: null,
            default: null,
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
    setProductForUpdate(prevState => {
      const updateValues = !prevState.childProducts
        ? null
        : prevState.childProducts.map(item => {
          if (item.keyId === uuid) {
            // 新しい値で要素を更新
            const productId = Integer.parseIntExceptNull(e.value);

            // 更新した値で要素を更新
            return { ...item, id: productId };
          }
          return item;
        });

      return {
        ...prevState,
        childProducts: updateValues,
      };
    });
  };

  /**
   * 明細数量変更イベント
   * @param uuid
   * @param e
   */
  const handleOnDetailItemQuantityChange = async (uuid: string, e: ChangeEvent<HTMLInputElement>): Promise<void> => {
    setProductForUpdate(prevState => {
      const updateValues = !prevState.childProducts
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
        childProducts: updateValues,
      };
    });
  };

  /**
   * 明細追加ボタン押下イベント
   */
  const handleOnClickAddDetail = async (): Promise<void> => {
    setProductForUpdate(prevState => {
      const newElement = {
        keyId: UUID.generate(),
        id: null,
        quantity: null,
        default: null,
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
   * 明細追加ボタン押下イベント
   */
  const handleOnClickDeleteDetail = async (uuid: string): Promise<void> => {
    setProductForUpdate(prevState => {
      if (prevState.childProducts) {
        // uuidに基づいて要素を削除
        return {
          ...prevState,
          childProducts: prevState.childProducts.filter(item => item.keyId !== uuid),
        };
      }
      return {
        ...prevState,
        childProducts: prevState.childProducts,
      };
    });
  };

  const classNames = [
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
      <SelectAndLabel
        id={"type"}
        options={enums}
        text={"内容種別"}
        isRequired
        isSmall
        isMulti={false}
        value={defaultProductCaseType}
        changeFunction={handleOnCaseProductTypeChange}
      />

      {productForUpdate.childProducts?.map(childProduct => {
        return (
          <div key={childProduct.keyId} className={classNames.join(" ")}>
            <SelectAndLabel
              id={"product"}
              options={productsForCaseDetailOption}
              text={"商品名"}
              isRequired
              isSmall
              changeFunction={(e: ReactSelectOption) => handleOnDetailItemChange(childProduct.keyId, e)}
              value={childProduct.default}
            />
            <InputAndLabel
              id={"quantity"}
              text={"数量"}
              value={childProduct.quantity?.toString() || ""}
              isRequired
              isSmall
              changeFunction={async (e: ChangeEvent<HTMLInputElement>): Promise<void> => {
                await handleOnDetailItemQuantityChange(childProduct.keyId, e);
              }}
            />
            <DeleteButton clickFunction={() => handleOnClickDeleteDetail(childProduct.keyId)} />
          </div>
        );
      })}
      <SmallButton text={"追加"} isBlue clickFunction={handleOnClickAddDetail} />

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

export default ProductCaseProductEditModal;
