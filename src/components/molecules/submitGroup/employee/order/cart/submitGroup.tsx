"use client";

import { ReactElement } from "react";
import FormButton from "@/components/atoms/button/formButton";
import ContentAreaWrapper from "@/components/atoms/div/wrapper/contentAreaWrapper";
import FlexWrapperColumnStart from "@/components/atoms/div/wrapper/flexWrapperColumnStart";
import Paragraph from "@/components/atoms/text/paragraph";
import { EmployeeCartDbType } from "@/types/db/employeeCart";

const SubmitGroup = ({
  employeeCartEntities,
}: {
  employeeCartEntities: (EmployeeCartDbType & {
    uuid: string;
    checked: boolean;
  })[];
}): ReactElement => {

  const filtered = employeeCartEntities.filter(item => item.checked);
  const disabled = filtered.length === 0;
  const quantity = filtered.length;
  const totalPrice = filtered.reduce((total, item) => {
    return total + (item.orderDetail.quantity * item.orderDetail.unitPrice);
  }, 0);

  return (
    <ContentAreaWrapper>
      <FlexWrapperColumnStart>
        <Paragraph text={`商品数量合計：${quantity.toLocaleString()}`} />
        <Paragraph text={`商品金額合計：${totalPrice.toLocaleString()}（通貨）`} />
        <FormButton
          color={"green"} text={"注文提出"} onClick={() => {
          }} disabled={disabled}
        />
      </FlexWrapperColumnStart>
    </ContentAreaWrapper>
  );
};

export default SubmitGroup;
