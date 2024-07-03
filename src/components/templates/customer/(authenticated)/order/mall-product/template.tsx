"use client";

import React, { ReactElement, useEffect, useState } from "react";
import MallHeader from "@/components/molecules/mall/mallHeader";
import MallInner from "@/components/atoms/div/inner/mallInner";
import MallMenu from "@/components/molecules/mall/mallMenu";
import MallSlider from "@/components/molecules/mall/mallSlider";
import MallProductDetail from "@/components/molecules/mall/mallProductDetail";
import { AlibabaProductFindPageProps } from "@/pagePropInterfaces/alibabaProductFindPageProps";
import { useFind } from "@/hooks/customer/alibaba/product/useFind";
import { Integer } from "@/lib/integer";
import { Else, If, Then } from "react-if";
import { AlibabaProductFindType } from "@/types/alibaba/alibabaProductFindType";
import { useStore } from "@/hooks/customer/order/cart/useStore";
import { TabType } from "@/types/alibaba/order/product/tabType";
import { SizeType } from "@/types/alibaba/order/product/sizeType";
import { UUID } from "@/lib/uuid";
import AuthenticatedLayout from "@/components/molecules/layouts/customer/authenticatedLayout";

const Template = ({ params, searchParams }: AlibabaProductFindPageProps): ReactElement => {

  const { isLoading, findAlibabaProduct, alibabaProduct } = useFind();
  const {
    setCustomerCartForPost,
    setValidationErrors, validationErrors,
    postCustomerCart,
  } = useStore(params.hub_code);
  const [ selectedVariation, setSelectedVariation ] = useState<{
    text: string; imageUrl: string;
  }>({ text: "", imageUrl: "" });
  const [ sizeList, setSizeList ] = useState<SizeType[]>([]);
  /**
   *  タブについてはこちらを参照
   *  ph1/customer/(authenticated)/product/template.tsx
   *
   */
  const [ activeMallProductTypeTab, setActiveMallProductTypeTab ] = useState<TabType>("default");

  useEffect((): void => {
    (async (): Promise<void> => {
      await findAlibabaProduct(Integer.parseIntExceptZero(searchParams?.product_id ?? null));
    })();
    setValidationErrors(prevState => []);

  }, [ findAlibabaProduct, searchParams?.product_id, setValidationErrors ]);

  const handleQuantityOnChange = (productName: string, skuId: number, size: string, unitPrice: number, quantity: number): void => {
    setCustomerCartForPost(prevState => {

      const foundProduct = prevState.products.find(product => product.productId === searchParams?.product_id && product.skuId === skuId);
      // 商品が一つもない場合
      if (foundProduct) {
        const inputtedProduct = prevState.products.map(product => {
          if (product.productId === searchParams?.product_id && product.skuId === skuId) {
            product.quantity = quantity;
            product.unitPrice = unitPrice;
          }

          return product;
        });

        return {
          ...prevState,
          products: inputtedProduct,
        };
      } else {
        return {
          ...prevState,
          products: [
            ...prevState.products,
            {
              productId: searchParams?.product_id ?? "",
              productName: productName,
              skuId: skuId,
              variation: selectedVariation.text,
              imageUrl: selectedVariation.imageUrl,
              size: size,
              quantity: quantity,
              unitPrice: unitPrice,
            },
          ],
        };
      }

    });
  };

  /**
   * タブの変更イベント
   * @param mallProductType
   */
  const handleTabOnChange = (mallProductType: TabType): void => {
    setActiveMallProductTypeTab(prevState => mallProductType);
  };

  /**
   * バリエーション選択時のイベント
   * @param {React.MouseEvent<HTMLParagraphElement>} e
   */
  const handleVariationOnClick = (e: React.MouseEvent<HTMLParagraphElement>): void => {
    const color = e.currentTarget.dataset["color"];
    const imageUrl = e.currentTarget.dataset["image_url"];
    setSelectedVariation(prevState => {
      return {
        text: color || "",
        imageUrl: imageUrl || "",
      };
    });
  };

  /**
   * 個数増加イベント
   * @param {number} skuId
   */
  const handleQuantityOnIncrement = (skuId: number): void => {
    setSizeList(prevState => {

      if (prevState.length > 0) {
        return prevState.map(state => {
          if (state.skuId === skuId && state.inputtedQuantity < state.quantity) {
            handleQuantityOnChange(state.productName, skuId, state.sizeName, state.price, state.inputtedQuantity + 1);
            return {
              ...state,
              inputtedQuantity: state.inputtedQuantity + 1,
            };
          }
          return state;
        });
      }
      return [];
    });
  };

  /**
   * 個数減少イベント
   * @param {number} skuId
   */
  const handleQuantityOnDecrement = (skuId: number): void => {
    setSizeList(prevState => {

      if (prevState.length > 0) {
        return prevState.map(state => {
          if (state.skuId === skuId && state.inputtedQuantity > 0) {
            handleQuantityOnChange(state.productName, skuId, state.sizeName, state.price, state.inputtedQuantity - 1);
            return {
              ...state,
              inputtedQuantity: state.inputtedQuantity - 1,
            };
          }
          return state;
        });

      }
      return [];
    });
  };

  return (
    <AuthenticatedLayout hubCode={params.hub_code} showCustomerMenu={false}>
      <MallHeader
        keyword={""} onKeywordChange={() => {
        }}
      />
      <div className="flex">
        <MallMenu />
        <MallInner>
          <div className="w-[1200px] m-auto">
            <div className="flex justify-between bg-white p-6">

              <If condition={isLoading}>
                <Then>
                  <p>読込中...</p>
                </Then>
                <Else>
                  {/* 読み込み終わっても取得できなければnull */}
                  <If
                    condition={alibabaProduct !== null && alibabaProduct.success && alibabaProduct.status === "published"}
                  >
                    <Then>
                      <MallSlider product={alibabaProduct as AlibabaProductFindType} />
                      <MallProductDetail
                        product={alibabaProduct as AlibabaProductFindType}
                        selectedVariation={selectedVariation.text}
                        activeMallProductTypeTab={activeMallProductTypeTab}
                        handleTabOnChange={handleTabOnChange}
                        handleVariationOnClick={handleVariationOnClick}
                        sizeList={sizeList}
                        setSizeList={setSizeList}
                        handleQuantityOnIncrement={handleQuantityOnIncrement}
                        handleQuantityOnDecrement={handleQuantityOnDecrement}
                        postCustomerCart={postCustomerCart}
                      />
                    </Then>
                    <Else>
                      <p>商品情報が取得できませんでした。</p>
                    </Else>
                  </If>

                  {validationErrors.map(error => {
                    return <p key={UUID.generate()}>{error}</p>;
                  })}

                </Else>
              </If>
            </div>
          </div>
        </MallInner>
      </div>
    </AuthenticatedLayout>
  );
};

export default Template;
