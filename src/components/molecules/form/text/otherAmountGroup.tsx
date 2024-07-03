"use client";
import { ReactElement } from "react";
import TextAndLabel24 from "@/components/molecules/form/text/textAndLabel24";
import FlexWrapper from "@/components/atoms/div/wrapper/flexWrapper";
import FlexWrapperColumnStart from "@/components/atoms/div/wrapper/flexWrapperColumnStart";
import ContentAreaWrapper from "@/components/atoms/div/wrapper/contentAreaWrapper";
import ContentGroupWrapper from "@/components/atoms/div/wrapper/contentGroupWrapper";
import Paragraph from "@/components/atoms/text/paragraph";

const OtherAmountGroup = (): ReactElement => {
  return (
    <>
      <FlexWrapperColumnStart>
        <ContentGroupWrapper width="w-full">
          <FlexWrapperColumnStart>
            <span
              className="block w-full text-[#6C757D] border-solid border-0 border-b border-[#6C757D] pb-1 mb-1"
            >その他金額</span>
            <FlexWrapper>
              <TextAndLabel24 labelText={"詳細"} paragraphText={"資材費"} />
              <TextAndLabel24 labelText={"金額"} paragraphText={"50元(cny)"} />
              <TextAndLabel24 labelText={"数量"} paragraphText={"1"} />
              <div className="min-w-24">
                <TextAndLabel24 labelText={"小計"} paragraphText={"5000円"} />
              </div>
              <div className="min-w-24">
                <TextAndLabel24 labelText={"合計"} paragraphText={"10000円"} />
              </div>
            </FlexWrapper>
            <ContentAreaWrapper>
              <FlexWrapper>
                <div className="min-w-24">
                  <Paragraph text="資材費" fontSize="14px" />
                </div>
                <div className="min-w-24">
                  <Paragraph text="50元(cny)" fontSize="14px" />
                </div>
                <div className="min-w-24">
                  <Paragraph text="1" fontSize="14px" />
                </div>
                <div className="min-w-24">
                  <Paragraph text="5000円" fontSize="14px" />
                </div>
                <div className="min-w-24">
                  <Paragraph text="10000円" fontSize="14px" />
                </div>
              </FlexWrapper>
            </ContentAreaWrapper>
          </FlexWrapperColumnStart>
        </ContentGroupWrapper>
      </FlexWrapperColumnStart>
    </>
  );
};

export default OtherAmountGroup;
