"use client";

import { ReactElement } from "react";
import classes from "@/styles/components/molecules/groupHeader.module.scss";
import commonClass from "@/styles/common/page.module.scss";
import { OrderGroupHeaderType } from "@/types/components/molecules/order/OrderGroupHeaderType";
import Paragraph from "@/components/atoms/paragraph";
import Span from "@/components/atoms/span";

const OrderGroupHeader = ({ order }: OrderGroupHeaderType): ReactElement => {
  return (
    <div className={`${commonClass.flex__wrapper} ${commonClass.justify_between} ${classes.groupHeader__wrapper}`}>
      <Paragraph isBold>
        注文ID：{order.code}
        {order.customer?.name || ""}
        <Span isSmall>({order.customer?.code || ""})</Span>
        <Span isSmall>(スタッフID：{order.customer?.employee?.name || "スタッフ無し"})</Span>
      </Paragraph>

      <div className={`${commonClass.flex__wrapper}`}>
        <Paragraph isBold>
          送料合計：{order.postageTotal.toLocaleString()}({order.hub.currency.name})
        </Paragraph>
        <Paragraph isBold>
          その他金額合計：{order.otherPriceTotal.toLocaleString()}({order.hub.currency.name})
        </Paragraph>
        <Paragraph isBold>
          合計：{order.total.toLocaleString()}({order.hub.currency.name})
        </Paragraph>
      </div>
    </div>
  );
};

export default OrderGroupHeader;
