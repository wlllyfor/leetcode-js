"use client";

import { ReactElement, useEffect, useState } from "react";
import commonClasses from "@/styles/common/page.module.scss";
import H2 from "@/components/atoms/h2";
import Paragraph from "@/components/atoms/paragraph";
import OrderOemItem from "@/components/molecules/listItem/customer/order/orderOemItem";
import OrderConfirmMessage from "@/components/molecules/bottomMessage/orderConfirmMessage";
import OrderErrorMessage from "@/components/molecules/bottomMessage/orderErrorMessage";
import OrderCompleteMessage from "@/components/molecules/bottomMessage/orderCompleteMessage";
import SmallButton from "@/components/atoms/button/smallButton";
import icon from "@/resource/img/plus.svg";
import AuthenticatedLayout from "@/components/molecules/layouts/customer/authenticatedLayout";
import Loading from "@/components/molecules/common/loading";
import { useStore } from "@/hooks/customer/order/useStore";
import { emptyOrderOemDetailType, OrderOemDetailType } from "@/types/entity/order/orderOemDetailType";
import Error422 from "@/components/molecules/errors/error422";
import { useFind } from "@/hooks/common/hub/useFind";
import { UUID } from "@/lib/uuid";
import { enumOrderType } from "@/types/enum/enumOrderType";
import { OrderDetailForPost } from "@/types/entity/order/orderDetailForPost";

const Template = ({ hubCode }: { hubCode: string; }): ReactElement => {
  // hooks
  const { isStored, setIsStored, postOrder, setToOrderProducts, validationErrors } = useStore(hubCode);

  const { hub, getHub, setCode, code: hubCodeForFind } = useFind();

  // useStates
  const [ orderProducts, setOrderProducts ] = useState<OrderOemDetailType[]>([]);
  const [ unitPriceTotal, setUnitPriceTotal ] = useState<number>(0);
  const [ total, setTotal ] = useState<number>(0);
  const [ totalQuantity, setTotalQuantity ] = useState<number>(0);

  // useEffects
  useEffect((): void => {
    setIsStored(prevState => false);

    setOrderProducts(prevOrderProducts => [ { ...emptyOrderOemDetailType, uuid: UUID.generate() } ]);
    setToOrderProducts(prevState => null);
  }, [ setIsStored, setOrderProducts, setToOrderProducts ]);

  /**
   * URLパラメータの拠点コードを設定
   */
  useEffect((): void => {
    if (hubCode) {
      setCode(prevState => hubCode);
    }
  }, [ hubCode, setCode ]);

  /**
   * 拠点コードが設定されたら検索
   */
  useEffect((): void => {
    if (hubCodeForFind) {
      (async (): Promise<void> => {
        await getHub();
      })();
    }
  }, [ hubCodeForFind, getHub ]);

  /**
   * 登録完了したら、リセット
   */
  useEffect((): void => {
    if (isStored) {
      setOrderProducts(prevOrderProducts => [ { ...emptyOrderOemDetailType, uuid: UUID.generate() } ]);
    }
  }, [ isStored ]);

  /**
   * 全明細取得
   */
  useEffect((): void => {
    const totalUnitPrice = orderProducts.reduce((total, product) => {
      return total + product.unitPrice * product.quantity;
    }, 0);
    const totalQuantity = orderProducts.reduce((total, orderProduct) => {
      return total + orderProduct.quantity;
    }, 0);

    setUnitPriceTotal(prevState => totalUnitPrice);
    setTotal(prevState => totalUnitPrice);
    setTotalQuantity(prevState => totalQuantity);

    // APIにPOSTする用の変数に設定
    setToOrderProducts(prevState => {
      return {
        orderType: enumOrderType.oem,
        products: orderProducts.map(orderProduct => {
          return {
            name: orderProduct.name,
            productUrl: orderProduct.productUrl,
            sku: orderProduct.sku,
            unitPrice: orderProduct.unitPrice,
            quantity: orderProduct.quantity,
            variation: orderProduct.variation,
            publicRemarks: orderProduct.publicRemarks,
            publicRemarksFile: orderProduct.publicRemarksFile,
          };
        }),
      } as OrderDetailForPost;
    });
  }, [ orderProducts, setToOrderProducts ]);

  // handle

  /**
   * 注文商品明細変更イベント
   * @param uuid
   * @param orderProduct
   */
  const handleOnChangeOrderOemItem = async (uuid: string, orderProduct: OrderOemDetailType): Promise<void> => {
    setOrderProducts(prevState => {
      if (!prevState) return [];

      return prevState.map(item => {
        if (item.uuid === uuid) {
          // 更新した値で要素を更新
          return {
            ...item,
            name: orderProduct.name,
            productUrl: orderProduct.productUrl,
            sku: orderProduct.sku,
            unitPrice: orderProduct.unitPrice,
            quantity: orderProduct.quantity,
            variation: orderProduct.variation,
            publicRemarks: orderProduct.publicRemarks,
            publicRemarksFile: orderProduct.publicRemarksFile,
          };
        }
        return item;
      });
    });
  };

  // loading condition
  if (!hubCode || !hub) {
    return <Loading />;
  }

  // handle

  /**
   * 明細追加ボタン押下イベント
   */
  const handleOnClickAddButton = async (): Promise<void> => {
    setOrderProducts(prevOrderProducts => [
      ...prevOrderProducts,
      { ...emptyOrderOemDetailType, uuid: UUID.generate() },
    ]);
    await setIsStored(prevState => false);
  };

  /**
   * 明細削除ボタン
   * @param {string} uuid
   * @returns {Promise<void>}
   */
  const handleOnClickDeleteDetail = async (uuid: string): Promise<void> => {
    setOrderProducts(prevProducts => {
      if (prevProducts) {
        // uuidに基づいて要素を削除
        return prevProducts.filter(item => item.uuid !== uuid);
      }
      return prevProducts;
    });
  };

  return (
    <AuthenticatedLayout hubCode={hubCode}>
      <H2 isPageTop>OEM注文依頼</H2>
      <Error422 errors={validationErrors} />
      {orderProducts &&
        orderProducts.map(orderProduct => {
          return (
            <OrderOemItem
              orderProduct={orderProduct}
              hub={hub}
              handleOnChangeOrderOemItem={async (newOrderProduct: OrderOemDetailType): Promise<void> => {
                await handleOnChangeOrderOemItem(orderProduct.uuid, newOrderProduct);
              }}
              handleOnClickDeleteDetail={async (): Promise<void> => {
                await handleOnClickDeleteDetail(orderProduct.uuid);
              }}
              key={orderProduct.uuid}
            />
          );
        })}
      <div className={commonClasses.ml_20}>
        <SmallButton
          text={"追加"}
          isBlue
          icon={icon}
          clickFunction={async (): Promise<void> => {
            await handleOnClickAddButton();
          }}
        />
      </div>
      <div className={`${commonClasses.mt_16} ${commonClasses.inner}`}>
        <div className={commonClasses.mt_8}>
          <Paragraph>商品数合計：{totalQuantity.toLocaleString()}</Paragraph>
        </div>
        <div className={commonClasses.mt_8}>
          <Paragraph>商品代金合計(概算)：{unitPriceTotal.toLocaleString()}</Paragraph>
        </div>
        <div className={commonClasses.mt_8}>
          <Paragraph isBold isLarge>
            合計金額（概算）: {total.toLocaleString()}
            {hub.currency.nameToJp}({hub.currency.name})
          </Paragraph>
        </div>
      </div>
      {!isStored && <OrderConfirmMessage isSubmittable={orderProducts.length > 0} postOrder={postOrder} />}

      {false && (
        // todo: PH3以降で対応予定
        <OrderErrorMessage />
      )}

      {isStored && <OrderCompleteMessage hubCode={hubCode} />}
    </AuthenticatedLayout>
  );
};

export default Template;
