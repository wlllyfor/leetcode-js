"use client";

import { ReactElement, useCallback, useEffect, useState } from "react";
import commonClasses from "@/styles/common/page.module.scss";
import WhiteWideWrapper from "@/components/atoms/div/wrapper/whiteWideWrapper";
import Checkbox from "@/components/atoms/checkbox";
import Image from "next/image";
import Paragraph from "@/components/atoms/paragraph";
import ImageSrc from "@/resource/img/dummy.jpg";
import Status from "@/components/molecules/status";
import SmallButton from "@/components/atoms/button/smallButton";
import Span from "@/components/atoms/span";
import { OrderItemType } from "@/types/components/molecules/listItem/employee/OrderItemType";
import Badge from "@/components/molecules/badge";
import { enumOrderStatus } from "@/types/enum/enumOrderStatus";
import classes from "@/styles/components/molecules/orderItem.module.scss";
import Link from "next/link";

const OrderItem = ({
  orderDetail,
  handleOnChangeChecks,
  setSelectedOrderDetail,
  handleOnClickOpenEditModal,
  handleOnClickOpenDeleteModal,
  handleOnClickReceiveStockButton,
  handleOnClickLeaveStockButton,
}: OrderItemType): ReactElement => {
  // useStates
  const [ checked, setChecked ] = useState<boolean>(false);

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

  /**
   * 明細背景色が黄色かどうか
   * @returns {boolean}
   */
  const isYellow = (): boolean => {
    if (orderDetail.orderStatus === enumOrderStatus.inCart) {
      return true;
    }
    return false;
  };

  // レンダリング中かどうかのフラグ
  const [ isFirstRender, setIsFirstRender ] = useState(true);

  // useCallbackを使用して関数をメモ化
  const memoizedHandleOnChangeChecks = useCallback(handleOnChangeChecks, [ checked, orderDetail.id ]);

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

  // handle
  const handleOnChangeChecked = async (newChecked: boolean): Promise<void> => {
    setChecked(prevState => newChecked);
  };

  const classNamesBbSolid = [
    commonClasses.flex__wrapper,
    commonClasses.aline_center,
    commonClasses.justify_between,
    commonClasses.bb_solid,
  ];

  const classNamesMr16 = [
    commonClasses.flex__wrapper,
    commonClasses.aline_center,
    commonClasses.mt_8,
    commonClasses.c_mr_16,
  ];

  const classNamesMt8 = [
    commonClasses.flex__wrapper,
    commonClasses.aline_end,
    commonClasses.column,
    commonClasses.ml_auto,
    commonClasses.mt_8,
  ];

  return (
    <WhiteWideWrapper isRed={isRed()} isYellow={isYellow()}>
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
          <Image src={ImageSrc} alt={""} width={120} height={80} />
        </div>
        <div className={`${commonClasses.ml_16} ${classes.detail__wrapper}`}>
          <div className={classNamesBbSolid.join(" ")}>
            <div className={commonClasses.column}>
              <div className={classNamesMr16.join(" ")}>
                <Paragraph>{orderDetail.product.hub?.name}</Paragraph>
                <Paragraph>モール名：{orderDetail.mall || "なし"}</Paragraph>
                <Paragraph>追跡入荷情報：{orderDetail.trackingNo || "なし"}</Paragraph>
                <Paragraph>送料：{orderDetail.postage?.toLocaleString() || "0"}</Paragraph>
              </div>
              <div className={commonClasses.mt_8}>
                <Paragraph>管理メモ：{orderDetail.privateRemarks || "なし"}</Paragraph>
                {orderDetail.privateRemarksFilePath ? (
                  <Link href={orderDetail.privateRemarksFilePath} target={"_blank"}>
                    {" "}
                    管理メモ添付ファイル{" "}
                  </Link>
                ) : (
                  <Paragraph>管理メモファイル：{"添付なし"}</Paragraph>
                )}
              </div>
            </div>
            <div className={commonClasses.flex__wrapper}>
              {/* 削除編集用ボタン */}
              <div>
                <div>
                  <SmallButton
                    text={"編集"}
                    isBlue
                    clickFunction={(): void => {
                      setSelectedOrderDetail(prevState => orderDetail);
                      handleOnClickOpenEditModal();
                    }}
                    isDisable={!orderDetail.processable}
                  />
                </div>
                <div className={commonClasses.mt_4}>
                  <SmallButton
                    text={"削除"}
                    isRed
                    clickFunction={(): void => {
                      setSelectedOrderDetail(prevState => orderDetail);
                      handleOnClickOpenDeleteModal();
                    }}
                    isDisable={!orderDetail.processable}
                  />
                </div>
              </div>
              {/* 入出荷用ボタン */}
              <div className={commonClasses.ml_10}>
                <div>
                  <SmallButton
                    text={"入荷依頼"}
                    isGreen
                    isDisable={!!orderDetail.receiveStock || !orderDetail.processable}
                    clickFunction={() => {
                      setSelectedOrderDetail(prevState => orderDetail);
                      handleOnClickReceiveStockButton();
                    }}
                  />
                </div>
                <div className={commonClasses.mt_4}>
                  <SmallButton
                    text={"出荷依頼"}
                    isGreen
                    isDisable={!!orderDetail.leaveStock || !orderDetail.processable}
                    clickFunction={() => {
                      setSelectedOrderDetail(prevState => orderDetail);
                      handleOnClickLeaveStockButton();
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className={`${commonClasses.flex__wrapper}`}>
            <div className={`${commonClasses.flex__wrapper} ${commonClasses.column}`}>
              <div className={classNamesMr16.join(" ")}>
                <Paragraph>
                  <Span isBold>{orderDetail.productName}</Span>
                  <Badge color={"blue"}>{orderDetail.product.productTypeLabel}</Badge>/{" "}
                  {orderDetail.shopName || "ショップ名なし"}
                </Paragraph>
                <Paragraph>商品ラベル：{orderDetail.product.label}</Paragraph>
              </div>
              <div className={classNamesMr16.join(" ")}>
                <Paragraph>お客様SKU：{orderDetail.product.sku}</Paragraph>
                <Paragraph>単価：{orderDetail.unitPrice.toLocaleString()} 元 (CNY)</Paragraph>
                <Paragraph>送料：{orderDetail.postage.toLocaleString()} 元 (CNY)</Paragraph>
                <Paragraph>その他金額：{orderDetail.otherPriceTotal.toLocaleString()} 元 (CNY)</Paragraph>
                <Paragraph>数量：{orderDetail.quantity.toLocaleString()}</Paragraph>
                <Paragraph>小計：{orderDetail.subTotal.toLocaleString()} (CNY)</Paragraph>
              </div>
              <div className={classNamesMr16.join(" ")}>
                <Paragraph>バリエーション：{orderDetail.variation}</Paragraph>
                <Paragraph>備考：{orderDetail.publicRemarks}</Paragraph>
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
            <div className={classNamesMt8.join(" ")}>
              <div className={`${commonClasses.flex__wrapper}`}>
                <div className={commonClasses.mr_8}>
                  <Paragraph isGray>{orderDetail.createdOn} 依頼</Paragraph>
                </div>
                <div className={commonClasses.mr_8}>
                  {orderDetail.receiveStock?.expectedArrivedOn ? (
                    <Paragraph isGray>{orderDetail.receiveStock?.expectedArrivedOn} 入荷予定</Paragraph>
                  ) : (
                    <Paragraph isGray> 入荷予定なし</Paragraph>
                  )}
                </div>
              </div>
              <Status color={"dark"}>{orderDetail.orderStatusLabel}</Status>
            </div>
          </div>
        </div>
      </div>
    </WhiteWideWrapper>
  );
};

export default OrderItem;
