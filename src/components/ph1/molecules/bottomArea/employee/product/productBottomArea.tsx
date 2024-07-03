"use client";

import { ReactElement } from "react";
import BottomAreaWrapper from "@/components/atoms/div/wrapper/bottomAreaWrapper";
import BottomButton from "@/components/atoms/button/bottomButton";
import Paragraph from "@/components/atoms/paragraph";
import commonClasses from "@/styles/common/page.module.scss";

const ProductBottomArea = (): ReactElement => {
  return (
    <BottomAreaWrapper>
      <div className={commonClasses.mr_16}>
        <Paragraph isBold>3件 選択中</Paragraph>
      </div>
      <BottomButton text={"キャンセル"} color={"red"} />
    </BottomAreaWrapper>
  );
};

export default ProductBottomArea;
