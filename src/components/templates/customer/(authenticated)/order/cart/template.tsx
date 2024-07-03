"use client";

import { ChangeEvent, ReactElement, useEffect, useState } from "react";
import AuthenticatedLayout from "@/components/molecules/layouts/customer/authenticatedLayout";
import ContentAreaWrapper from "@/components/atoms/div/wrapper/contentAreaWrapper";
import MallHeader from "@/components/molecules/mall/mallHeader";
import MallMenu from "@/components/molecules/mall/mallMenu";
import MallInner from "@/components/atoms/div/inner/mallInner";
import TableHeaderGroup from "@/components/molecules/tableGroup/customer/mall/cart/tableHeaderGroup";
import TableGroup from "@/components/molecules/tableGroup/customer/mall/cart/tableGroup";
import SubmitGroup from "@/components/molecules/submitGroup/customer/order/cart/submitGroup";
import { AlibabaProductIndexPageProps } from "@/pagePropInterfaces/alibabaProductIndexPageProps";
import { useIndex } from "@/hooks/customer/order/cart/useIndex";
import { CartProductForConfirm, CustomerCartForConfirm } from "@/types/entity/order/cart/customerCartForConfirm";
import { UUID } from "@/lib/uuid";
import { If, Then } from "react-if";

const Template = ({ params, searchParams }: AlibabaProductIndexPageProps): ReactElement => {
  // DBから取得してきた値
  const { customerCarts, setCondition, condition, getCustomerCarts } = useIndex();

  // 確認ページように入力する値
  const [ customerCartsForConfirm, setCustomerCartsForConfirm ] = useState<CustomerCartForConfirm | null>(null);

  useEffect((): void => {
    setCondition(prevState => {
      return {
        isMyselfProducts: true,
      };
    });
  }, [ setCondition ]);

  useEffect((): void => {
    (async (): Promise<void> => {
      await getCustomerCarts();
    })();
  }, [ condition, getCustomerCarts ]);

  useEffect(() => {

    const customerCartProductsForConfirm: CartProductForConfirm[] = customerCarts.map(item => {
      return {
        uuid: UUID.generate(),
        checked: false,
        customerCart: item,
        quantity: item.quantity,
        sku: "",
        publicRemarks: "",
        publicRemarksFile: null,
        hub: item.hub,
      };
    });

    setCustomerCartsForConfirm(prevState => {
      return {
        ...prevState,
        products: customerCartProductsForConfirm,
      };
    });

  }, [ customerCarts ]);

  // handles

  /**
   * 同じモールの商品全部チェックつける。
   * @param e
   * @param cartProductForConfirm
   */
  const handleMallHeaderCheckOnClick = (e: ChangeEvent<HTMLInputElement>, cartProductForConfirm: CartProductForConfirm): void => {

    const filtered = customerCartsForConfirm?.products.filter(item => item.customerCart.mallProduct.mall === cartProductForConfirm.customerCart.mallProduct.mall);
    if (filtered) {
      setCustomerCartsForConfirm(prevState => {

        if (prevState) {
          const updatedProducts = prevState.products.map(item => {
            if (filtered.some(f => f.uuid === item.uuid)) {
              return {
                ...item,
                checked: true,
              };
            }
            return item;
          });
          return {
            ...prevState,
            products: updatedProducts,
          };
        }
        return null;
      });
    }
  };

  /**
   * 明細行のチェックイベント
   * @param e
   * @param {string} uuid
   */
  const handleCheckedProductOnClick = (e: ChangeEvent<HTMLInputElement>, uuid: string): void => {

    setCustomerCartsForConfirm(prevState => {
      if (prevState) {
        return {
          ...prevState,
          products: prevState.products.map(item => {
            if (item.uuid === uuid) {
              return {
                ...item,
                checked: e.target.checked,
              };
            }
            return item;
          }),
        };
      }
      return null;
    });
  };

  /**
   * SKU変更イベント
   * @param {React.ChangeEvent<HTMLInputElement>} e
   * @param {string} uuid
   */
  const handleSkuOnChange = (e: ChangeEvent<HTMLInputElement>, uuid: string): void => {
    setCustomerCartsForConfirm(prevState => {
      if (prevState) {
        return {
          ...prevState,
          products: prevState.products.map(item => {
            if (item.uuid === uuid) {
              return {
                ...item,
                sku: e.target.value,
              };
            }
            return item;
          }),
        };
      }
      return null;
    });
  };

  /**
   * インクリメント
   * @param {string} uuid
   */
  const handleQuantityOnIncremental = (uuid: string): void => {
    setCustomerCartsForConfirm(prevState => {
      if (prevState) {
        return {
          ...prevState,
          products: prevState.products.map(item => {
            if (item.uuid === uuid) {
              return {
                ...item,
                quantity: item.quantity + 1,
              };
            }
            return item;
          }),
        };
      }
      return null;
    });
  };

  /**
   * デクリメント
   * @param {string} uuid
   */
  const handleQuantityOnDecrement = (uuid: string): void => {
    setCustomerCartsForConfirm(prevState => {
      if (prevState) {
        return {
          ...prevState,
          products: prevState.products.map(item => {
            if (item.uuid === uuid) {
              return {
                ...item,
                quantity: item.quantity - 1,
              };
            }
            return item;
          }),
        };
      }
      return null;
    });
  };

  /**
   * 備考記入
   * @param {React.ChangeEvent<HTMLTextAreaElement>} e
   * @param {string} uuid
   */
  const handleRemarksOnChange = (e: ChangeEvent<HTMLTextAreaElement>, uuid: string): void => {
    setCustomerCartsForConfirm(prevState => {
      if (prevState) {
        return {
          ...prevState,
          products: prevState.products.map(item => {
            if (item.uuid === uuid) {
              return {
                ...item,
                publicRemarks: e.target.value,
              };
            }
            return item;
          }),
        };
      }
      return null;
    });
  };

  return (
    <>
      <AuthenticatedLayout hubCode={params.hub_code} showCustomerMenu={false}>
        <MallHeader
          keyword={""} onKeywordChange={() => {
          }}
        />
        <div className="flex">
          <MallMenu />
          <MallInner>
            <ContentAreaWrapper>
              <div className="mt-8 mx-auto max-w-[1400px]">
                <TableHeaderGroup />
                {customerCartsForConfirm?.products.map(value => {
                  return (
                    <TableGroup
                      key={value.uuid} cartProductForConfirm={value}
                      handleMallHeaderCheckOnClick={handleMallHeaderCheckOnClick}
                      handleCheckedProductOnClick={handleCheckedProductOnClick}
                      handleSkuOnChange={handleSkuOnChange}
                      handleQuantityOnIncrement={handleQuantityOnIncremental}
                      handleQuantityOnDecrement={handleQuantityOnDecrement}
                      handleRemarksOnChange={handleRemarksOnChange}
                    />
                  );
                })}
              </div>
            </ContentAreaWrapper>
            <div className="mt-12 w-[400px] ml-auto mr-20">
              <If condition={!!customerCartsForConfirm}>
                <Then>
                  <SubmitGroup
                    hubCode={params.hub_code}
                    customerCartsForConfirm={customerCartsForConfirm as CustomerCartForConfirm}
                  />
                </Then>
              </If>
            </div>
          </MallInner>
        </div>
      </AuthenticatedLayout>
    </>
  );
};

export default Template;
