"use client";

import { ReactElement } from "react";
import FlexWrapperLg from "@/components/atoms/div/wrapper/flexWrapperLg";
import InputRadio from "@/components/molecules/form/input/inputRadio";
import FlexWrapperColumnStart from "@/components/atoms/div/wrapper/flexWrapperColumnStart";
import ContentAreaWrapper from "@/components/atoms/div/wrapper/contentAreaWrapper";
import TextAndLabel24 from "@/components/molecules/form/text/textAndLabel24";

const WithdrawalModalShippingFreeItem = (): ReactElement => {
  return (
    <>
      <ContentAreaWrapper>
        <FlexWrapperLg>
          <div className="min-w-[218px]">
            <TextAndLabel24 labelText={"送料合計"} paragraphText={""} />
          </div>
          <TextAndLabel24 labelText={"合計"} paragraphText={"1000"} />
          <div className="w-44">
            <FlexWrapperColumnStart>
              <InputRadio
                name="radioGroup"
                fontSize={"14px"}
                options={[
                  { id: "account", text: "口座仕訳" },
                  { id: "sales", text: "売上" },
                ]}
              />
            </FlexWrapperColumnStart>
          </div>
        </FlexWrapperLg>
      </ContentAreaWrapper>
    </>
  );
};

export default WithdrawalModalShippingFreeItem;
