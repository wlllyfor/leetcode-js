"use client";

import { ChangeEvent, ReactElement, useId, useState } from "react";
import Image from "next/image";
import TextAndLabel24 from "@/components/molecules/form/text/textAndLabel24";
import ModalClickableButton from "@/components/atoms/button/modalClickableButton";
import FlexWrapper from "@/components/atoms/div/wrapper/flexWrapper";
import FlexWrapperColumnStart from "@/components/atoms/div/wrapper/flexWrapperColumnStart";
import ContentAreaWrapper from "@/components/atoms/div/wrapper/contentAreaWrapper";
import ContentGroupWrapper from "@/components/atoms/div/wrapper/contentGroupWrapper";
import InputWrapper24 from "@/components/atoms/div/wrapper/inputWrapper24";
import InputWrapper44 from "@/components/atoms/div/wrapper/inputWrapper44";
import Input from "@/components/atoms/form/input";
import InputGroup24 from "@/components/molecules/form/input/inputGroup24";
import InputGroup44 from "@/components/molecules/form/input/inputGroup44";
import Paragraph from "@/components/atoms/text/paragraph";
import { OrderDetailDbTableType } from "@/types/db/order/orderDetail";

const OtherAmountGroup = ({
  orderDetail,
  handleOtherNameOnChange,
  handleOtherUnitPriceOnChange,
  handleOtherQuantityOnChange,
}: {
  orderDetail: OrderDetailDbTableType;
  handleOtherNameOnChange: (e: ChangeEvent<HTMLInputElement>, uuid: string, orderOtherUuid: string) => void;
  handleOtherUnitPriceOnChange: (e: ChangeEvent<HTMLInputElement>, uuid: string, orderOtherUuid: string) => void;
  handleOtherQuantityOnChange: (e: ChangeEvent<HTMLInputElement>, uuid: string, orderOtherUuid: string) => void;
}): ReactElement => {
  const inputId = useId();
  const [ contentCount, setContentCount ] = useState<number>(1);

  const handleClick = () => {
    setContentCount(contentCount + 1);
  };

  // 単位
  const name = orderDetail.order.hub.currency.name;
  const nameTpJp = orderDetail.order.hub.currency.nameToJp;
  const unitName = `${nameTpJp}(${name})`;

  // その他合計
  const amountPrice = orderDetail.orderDetailOthers.reduce((total, other) => {
    return total + (other.price * other.quantity);
  }, 0);

  return (
    <>
      <FlexWrapperColumnStart>
        <ContentGroupWrapper width="w-full">
          <FlexWrapperColumnStart>
            <span
              className="block w-full text-[#6C757D] border-solid border-0 border-b border-[#6C757D] pb-1 mb-1"
            >その他金額</span>

            {orderDetail.orderDetailOthers.map((other, index) => {

              const subTotal = other.quantity * other.price;

              // 先頭行はヘッダを付ける
              if (index === 0) {
                return (
                  <ContentAreaWrapper key={other.uuid}>
                    <FlexWrapper>
                      <InputGroup44
                        id={`${inputId}-detail`} text={"詳細"} value={other.name} onChange={e => {
                          handleOtherNameOnChange(e, orderDetail.uuid, other.uuid);
                        }}
                      />
                      <InputGroup44
                        id={`${inputId}-amount`} text={"金額"} value={other.price.toLocaleString()}
                        onChange={e => {
                          handleOtherUnitPriceOnChange(e, orderDetail.uuid, other.uuid);
                        }}
                      />
                      <InputGroup24
                        id={`${inputId}-quantity`} text={"数量"} value={other.quantity.toLocaleString()}
                        onChange={e => {
                          handleOtherQuantityOnChange(e, orderDetail.uuid, other.uuid);
                        }}
                      />
                      <div className="min-w-24">
                        <TextAndLabel24 labelText={"小計"} paragraphText={`${subTotal.toLocaleString()}${unitName}`} />
                      </div>
                      <div className="min-w-24">
                        <TextAndLabel24
                          labelText={"合計"}
                          paragraphText={`${amountPrice.toLocaleString()}${unitName}`}
                        />
                      </div>
                    </FlexWrapper>
                  </ContentAreaWrapper>
                );
              }

              return (
                <ContentAreaWrapper key={other.uuid}>
                  <FlexWrapper>
                    <InputWrapper44>
                      <Input
                        id={`${inputId}-${other.uuid}-detail`}
                        value={other.name}
                        placeholder={""}
                        isRequired={false}
                        isDisabled={false}
                        isAutocomplete={false}
                      />
                    </InputWrapper44>
                    <InputWrapper44>
                      <Input
                        id={`${inputId}-${other.uuid}-amount`}
                        value={other.price.toLocaleString()}
                        placeholder={""}
                        isRequired={false}
                        isDisabled={false}
                        isAutocomplete={false}
                      />
                    </InputWrapper44>
                    <InputWrapper24>
                      <Input
                        id={`${inputId}-${other.uuid}-quantity`}
                        value={other.quantity.toLocaleString()}
                        placeholder={""}
                        isRequired={false}
                        isDisabled={false}
                        isAutocomplete={false}
                      />
                    </InputWrapper24>
                    <div className="min-w-24">
                      <FlexWrapper>
                        <Paragraph text={`${subTotal.toLocaleString()}${unitName}`} fontSize="14px" />
                        <button type="button" className="cursor-pointer p-1">
                          <Image src="/images/icon/icon_cross.svg" alt="" width={8} height={8} />
                        </button>
                      </FlexWrapper>
                    </div>
                    <div className="min-w-24" />
                  </FlexWrapper>
                </ContentAreaWrapper>
              );
            })}
          </FlexWrapperColumnStart>
        </ContentGroupWrapper>
        <ModalClickableButton color="blue" text="明細追加" onClick={handleClick} />
      </FlexWrapperColumnStart>
    </>
  );
};

export default OtherAmountGroup;
