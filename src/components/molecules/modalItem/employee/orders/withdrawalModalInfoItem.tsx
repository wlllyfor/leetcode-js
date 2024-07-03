"use client";

import { ReactElement, useId } from "react";
import FlexWrapperLg from "@/components/atoms/div/wrapper/flexWrapperLg";
import ContentAreaWrapper from "@/components/atoms/div/wrapper/contentAreaWrapper";
import OtherAmountGroup from "@/components/molecules/form/text/otherAmountGroup";
import TextAndLabel24 from "@/components/molecules/form/text/textAndLabel24";
import ImageGroup from "@/components/molecules/form/image/imageGroup";
import FileUploadIconTextGroup from "@/components/molecules/form/textarea/fileUploadIconTextGroup";

const WithdrawalModalInfoItem = (): ReactElement => {
  const inputId = useId();
  return (
    <>
      <ContentAreaWrapper>
        <FlexWrapperLg>
          <div className="mt-8">
            <TextAndLabel24 labelText={"モール名"} paragraphText={"1688"} />
          </div>
          <div className="mt-8">
            <TextAndLabel24 labelText={"モールステータス"} paragraphText={"注文完了"} />
          </div>
          <div className="mt-8">
            <TextAndLabel24 labelText={"モール注文ID"} paragraphText={"111111"} />
          </div>
          <div className="mt-8">
            <TextAndLabel24 labelText={"仕入先"} paragraphText={"〇〇有限公司"} />
          </div>
          <div className="mt-8">
            <TextAndLabel24 labelText={"お客様SKU"} paragraphText={"1111111"} />
          </div>
          <div className="mt-8">
            <ImageGroup text="写真" imageUrl={"/images/dummy/dummy-image.png"} alt="" width={50} height={33} />
          </div>
          <div className="mt-8">
            <TextAndLabel24 labelText={"バリエーション"} paragraphText={"s_ブルー"} />
          </div>
          <div className="mt-8">
            <TextAndLabel24 labelText={"単価"} paragraphText={"1000元(cny)"} />
          </div>
          <div className="mt-8">
            <TextAndLabel24 labelText={"数量"} paragraphText={"2"} />
          </div>
          <div className="mt-8">
            <TextAndLabel24 labelText={"小計"} paragraphText={"2000元(CNY)"} />
          </div>
          <div className="mt-8">
            <TextAndLabel24 labelText={"送料"} paragraphText={"100元(CNY)"} />
          </div>
          <div className="min-w-[560px]">
            <OtherAmountGroup />
          </div>
          <div className="mt-8">
            <TextAndLabel24 labelText={"内税"} paragraphText={"10000円"} />
          </div>
          <div className="mt-8">
            <TextAndLabel24 labelText={"総合計"} paragraphText={"10000円"} />
          </div>
          <div className="mt-8 min-w-40">
            <FileUploadIconTextGroup
              inputFileUploadIconId={`${inputId}-file`} labelText={"備考"}
              paragraphText={"備考が入ります。備考が備考が入ります。"}
            />
          </div>
          <div className="mt-8 min-w-40">
            <FileUploadIconTextGroup
              inputFileUploadIconId={`${inputId}-file-order`} labelText={"注文明細"}
              paragraphText={"備考が入ります。備考が備考が入ります。"} isRequired
            />
          </div>
        </FlexWrapperLg>
      </ContentAreaWrapper>
    </>
  );
};

export default WithdrawalModalInfoItem;
