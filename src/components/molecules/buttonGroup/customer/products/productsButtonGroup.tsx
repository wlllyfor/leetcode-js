"use client";

import { ReactElement } from "react";
import FlexWrapper from "@/components/atoms/div/wrapper/flexWrapper";
import ButtonAreaWrapper from "@/components/atoms/div/wrapper/buttonAreaWrapper";
import NormalClickableButton from "@/components/atoms/button/normalClickableButton";
import { ButtonGroupType } from "@/types/components/molecules/buttonGroup/customer/products/ButtonGroupType";
import Paragraph from "@/components/atoms/text/paragraph";

const ProductsButtonGroup = ({
  handleAddNormalProductButtonClick,
  handleAddCaseProductButtonClick,

}: ButtonGroupType): ReactElement => {
  return (
    <ButtonAreaWrapper>
      <FlexWrapper>
        <NormalClickableButton color="lightblue" text={"追加"} onClick={handleAddNormalProductButtonClick} />
        {/* <NormalClickableButton color="lightblue" text={"追加"} onClick={handleAddCaseProductButtonClick} /> */}
        <div className="ml-4 color-[#6C757D]">
          <Paragraph text={"2件選択中"} color={"#6C757D"} />
        </div>
        <NormalClickableButton color="lightblue" text={"国内出荷"} onClick={()=>{}} />
        <NormalClickableButton color="lightblue" text={"国際出荷"} onClick={()=>{}} />
        <NormalClickableButton color="gray" text={"amazon納品"} onClick={()=>alert("準備中")} />
        <NormalClickableButton color="lightblue" text={"入荷依頼"} onClick={()=>alert("準備中")} />
      </FlexWrapper>
    </ButtonAreaWrapper>
  );
};

export default ProductsButtonGroup;
