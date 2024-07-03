"use client";

import { ReactElement } from "react";
import commonClasses from "@/styles/common/page.module.scss";
import WhiteWideWrapper from "@/components/atoms/div/wrapper/whiteWideWrapper";
import Paragraph from "@/components/atoms/paragraph";
import BottomButton from "@/components/atoms/button/bottomButton";
import Span from "@/components/atoms/span";

const OrderConfirmMessage = ({
  postOrder,
  isSubmittable,
}: {
  postOrder: () => Promise<void>;
  isSubmittable: boolean;
}): ReactElement => {
  return (
    <WhiteWideWrapper>
      <Paragraph isBold isLarge isCenter>
        注文前のご確認
      </Paragraph>
      <div className={`${commonClasses.inner} ${commonClasses.mt_16}`}>
        <div className={commonClasses.mt_8}>
          <Paragraph>
            1.中国国内の<Span isBold>送料</Span>
            が発生する場合がございます。（基本複数ご注文頂いている場合は無料です）
          </Paragraph>
        </div>
        <div className={commonClasses.mt_8}>
          <Paragraph>
            2.検品内容を記載して頂いております場合、<Span isBold>検品費用</Span>
            が別途かかります。
            費用につきましては注文提出後、商品が届き、お見積りのご報告の上、検品を行い、検品完了後に、注文履歴より確認可能でございます。
            <br />
            {/* todo: https://eduit-inc.atlassian.net/browse/YIWUWMS-192 */}
            検品料金についてこちら
          </Paragraph>
        </div>
        <div className={commonClasses.mt_8}>
          <Paragraph>
            3,店舗によってリアルタイムの販売で在庫切れになる可能性もございます。その場合はスタッフの方で
            <Span isBold>別の仕入れ先</Span>または<Span isBold>類似品</Span>
            をご提案させて頂きますのでご安心くださいませ。
          </Paragraph>
        </div>
      </div>
      {isSubmittable && (
        <BottomButton
          color={"green"}
          text={"同意して注文する"}
          clickFunction={async (): Promise<void> => {
            await postOrder();
          }}
        />
      )}
    </WhiteWideWrapper>
  );
};

export default OrderConfirmMessage;
