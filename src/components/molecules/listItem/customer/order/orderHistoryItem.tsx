"use client";

import { ReactElement, useCallback, useEffect, useState } from "react";
import commonClasses from "@/styles/common/page.module.scss";
import WhiteWideWrapper from "@/components/atoms/div/wrapper/whiteWideWrapper";
import Checkbox from "@/components/atoms/checkbox";
import Span from "@/components/atoms/span";
import Image from "next/image";
import Paragraph from "@/components/atoms/paragraph";
import Status from "@/components/molecules/status";
import { OrderDetailDbTableType } from "@/types/db/order/orderDetail";
import ImageSrc from "@/resource/img/dummy.jpg";
import { HubDbTableType } from "@/types/db/hub";
import { enumOrderStatus } from "@/types/enum/enumOrderStatus";
import Link from "next/link";

const OrderHistoryItem = ({
  orderDetail,
  handleOnChangeChecks,
  hub,
}: {
  orderDetail: OrderDetailDbTableType;
  handleOnChangeChecks: (checked: boolean, id: number) => Promise<void>;
  hub: HubDbTableType | null;
}): ReactElement => {
  // useStates
  const [ checked, setChecked ] = useState<boolean>(false);
  const [ otherPriceTotal, setOtherPriceTotal ] = useState<number>(0);

  // レンダリング中かどうかのフラグ
  const [ isFirstRender, setIsFirstRender ] = useState(true);

  // useCallbackを使用して関数をメモ化
  const memoizedHandleOnChangeChecks = useCallback(handleOnChangeChecks, [ checked, orderDetail.id, handleOnChangeChecks ]);

  // useEffects
  useEffect((): void => {
    if (!isFirstRender) {
      (async (): Promise<void> => {
        await memoizedHandleOnChangeChecks(checked, orderDetail.id);
      })();
    } else {
      setIsFirstRender(prevState => false);
    }
  }, [ checked, isFirstRender, memoizedHandleOnChangeChecks, orderDetail.id ]);

  /**
   * その他金額の合計
   */
  useEffect((): void => {
    if (orderDetail) {
      const totalUnitPrice = orderDetail.orderDetailOthers.reduce((total, orderDetailOther) => {
        return total + orderDetailOther.price;
      }, 0);
      setOtherPriceTotal(prevState => totalUnitPrice);
    }
  }, [ orderDetail ]);

  // handle
  const handleOnChangeChecked = async (newChecked: boolean): Promise<void> => {
    setChecked(prevState => newChecked);
  };

  /**
   * 明細背景色が赤かどうか
   * @returns {boolean}
   */
  const isRed = (): boolean => {
    if (orderDetail.orderStatus === enumOrderStatus.canceled) {
      return true;
    }
    if (orderDetail.orderStatus === enumOrderStatus.canceling) {
      return true;
    }
    return false;
  };

  const classNamesMr16 = [
    commonClasses.flex__wrapper,
    commonClasses.aline_center,
    commonClasses.mt_8,
    commonClasses.c_mr_16,
  ];

  const classNamesMbAuto = [
    commonClasses.flex__wrapper,
    commonClasses.aline_end,
    commonClasses.column,
    commonClasses.mb_auto,
    commonClasses.ml_auto,
  ];

  return (
    <WhiteWideWrapper isRed={isRed()}>
      <div className={`${commonClasses.flex__wrapper} ${commonClasses.aline_center}`}>
        <Checkbox
          id={orderDetail.id.toString()}
          isChecked={checked}
          value={orderDetail.id}
          changeFunction={async (): Promise<void> => {
            await handleOnChangeChecked(!checked);
          }}
        />
        <div className={commonClasses.ml_16}>
          <Image src={orderDetail.product.productImageUrl || ImageSrc} alt={""} width={120} height={80} />
        </div>
        <div className={commonClasses.ml_16}>
          <div className={classNamesMr16.join(" ")}>
            <Paragraph>
              <Span isBold>{orderDetail.productName}</Span> / {orderDetail.shopName}
            </Paragraph>
            <Paragraph>商品ラベル：{orderDetail.product.label}</Paragraph>
            <Paragraph>モール: {orderDetail.mall || "なし"}</Paragraph>
            <Paragraph>ショップ名：{orderDetail.shopName || "なし"}</Paragraph>
            <Paragraph>追跡入荷情報：{orderDetail.trackingNo ?? "なし"}</Paragraph>
          </div>
          <div className={classNamesMr16.join(" ")}>
            <Paragraph>お客様SKU：{orderDetail.product.sku}</Paragraph>
            <Paragraph>
              単価：{orderDetail.unitPrice.toLocaleString()}
              {hub?.currency.nameToJp} ({hub?.currency.name})
            </Paragraph>
            <Paragraph>
              その他金額：{otherPriceTotal}
              {hub?.currency.nameToJp} ({hub?.currency.name})
            </Paragraph>
            <Paragraph>数量：{orderDetail.quantity.toLocaleString()}</Paragraph>
            <Paragraph>
              小計：
              {(orderDetail.unitPrice * orderDetail.quantity).toLocaleString()}
              {hub?.currency.nameToJp} ({hub?.currency.name})
            </Paragraph>
          </div>
          <div className={classNamesMr16.join(" ")}>
            <Paragraph>バリエーション：{orderDetail.variation}</Paragraph>
            <Paragraph>備考：{orderDetail.publicRemarks || "なし"}</Paragraph>
            {orderDetail.publicRemarksFilePath ? (
              <Link href={orderDetail.publicRemarksFilePath} target={"_blank"}>
                {" "}
                備考添付ファイル{" "}
              </Link>
            ) : (
              <Paragraph>備考添付ファイル：{"添付なし"}</Paragraph>
            )}
          </div>
        </div>
        <div className={classNamesMbAuto.join(" ")}>
          <div className={`${commonClasses.flex__wrapper}`}>
            <div className={commonClasses.mr_8}>
              <Paragraph isGray>{orderDetail.order.code}</Paragraph>
            </div>
            <Paragraph isGray>{orderDetail.createdOn} 注文</Paragraph>
          </div>
          <div className={commonClasses.mt_16}>
            <Status color={"dark"}>{orderDetail.orderStatusLabel}</Status>
          </div>
        </div>
      </div>
    </WhiteWideWrapper>
  );
};

export default OrderHistoryItem;
