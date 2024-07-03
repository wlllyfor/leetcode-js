"use client";

import { ChangeEvent, ReactElement, useId } from "react";
import FlexWrapperLg from "@/components/atoms/div/wrapper/flexWrapperLg";
import ContentAreaWrapper from "@/components/atoms/div/wrapper/contentAreaWrapper";
import InputGroup44 from "@/components/molecules/form/input/inputGroup44";
import OtherAmountGroup from "@/components/molecules/form/input/order/otherAmountGroup";
import SelectGroup44 from "@/components/molecules/form/select/selectGroup44";
import TextAndLabel24 from "@/components/molecules/form/text/textAndLabel24";
import ImageGroup from "@/components/molecules/form/image/imageGroup";
import FileUploadIconTextareaGroup from "@/components/molecules/form/textarea/fileUploadIconTextareaGroup";
import { ReactSelectOption } from "@/types/reactSelectOptions/ReactSelectOption";
import { OrderDetailDbTableType } from "@/types/db/order/orderDetail";
import { Else, If, Then } from "react-if";
import { enumOrderType } from "@/types/enum/enumOrderType";
import TextAndLabel44 from "@/components/molecules/form/text/textAndLabel44";

const DepositModalItem = ({
  orderDetail,
  orderStatusOptions,
  handleOrderStatusOnChange,
  handleMallOrderIdOnChange,
  handleShopNameOnChange,
  handleProductNameOnChange,
  handleVariationOnChange,
  handleUnitPriceOnChange,
  handleQuantityOnChange,
  handlePostageOnChange,
  handlePublicRemarksOnChange,
  handlePublicRemarksFileOnChange,
  handleReceiptOnChange,
  handleReceiptFileOnChange,
  handleOtherNameOnChange,
  handleOtherUnitPriceOnChange,
  handleOtherQuantityOnChange,
}: {
  orderDetail: OrderDetailDbTableType;
  orderStatusOptions: ReactSelectOption[];
  handleOrderStatusOnChange: (e: ReactSelectOption, uuid: string) => void;
  handleMallOrderIdOnChange: (e: ChangeEvent<HTMLInputElement>, uuid: string) => void;
  handleShopNameOnChange: (e: ChangeEvent<HTMLInputElement>, uuid: string) => void;
  handleProductNameOnChange: (e: ChangeEvent<HTMLInputElement>, uuid: string) => void;
  handleUnitPriceOnChange: (e: ChangeEvent<HTMLInputElement>, uuid: string) => void;
  handleVariationOnChange: (e: ChangeEvent<HTMLInputElement>, uuid: string) => void;
  handleQuantityOnChange: (e: ChangeEvent<HTMLInputElement>, uuid: string) => void;
  handlePostageOnChange: (e: ChangeEvent<HTMLInputElement>, uuid: string) => void;
  handlePublicRemarksOnChange: (e: ChangeEvent<HTMLTextAreaElement>, uuid: string) => void;
  handlePublicRemarksFileOnChange: (e: ChangeEvent<HTMLInputElement>, uuid: string) => void;
  handleReceiptOnChange: (e: ChangeEvent<HTMLTextAreaElement>, uuid: string) => void;
  handleReceiptFileOnChange: (e: ChangeEvent<HTMLInputElement>, uuid: string) => void;
  handleOtherNameOnChange: (e: ChangeEvent<HTMLInputElement>, uuid: string, orderOtherUuid: string) => void;
  handleOtherUnitPriceOnChange: (e: ChangeEvent<HTMLInputElement>, uuid: string, orderOtherUuid: string) => void;
  handleOtherQuantityOnChange: (e: ChangeEvent<HTMLInputElement>, uuid: string, orderOtherUuid: string) => void;
}): ReactElement => {
  const inputId = useId();

  // 単位
  const name = orderDetail.order.hub.currency.name;
  const nameTpJp = orderDetail.order.hub.currency.nameToJp;
  const unitName = `${nameTpJp}(${name})`;

  // その他金額合計
  const otherAmountPrice = orderDetail.orderDetailOthers.reduce((total, other) => {
    return total + (other.price * other.quantity);
  }, 0);

  // 内税計算用
  const currentTax = orderDetail.order.hub.currentTaxRate?.rate ?? 0;

  // 小計
  const subTotal = orderDetail.unitPrice * orderDetail.quantity + orderDetail.postage + otherAmountPrice;

  // 内税
  const includeTax = subTotal * (currentTax / 100);

  // 総合計
  const total = subTotal + includeTax;

  return (
    <>
      <ContentAreaWrapper>
        <FlexWrapperLg>
          <div className="mt-8">
            <SelectGroup44
              text={"モールステータス"} isRequired={true} options={orderStatusOptions} isMulti={false}
              value={
                orderStatusOptions.find(option => option.value === orderDetail.orderStatus)
              } changeFunction={e => handleOrderStatusOnChange(e, orderDetail.uuid)}
            />
          </div>
          <div className="mt-8">
            <InputGroup44
              id={`${inputId}-mall-order-id`} text={"モール注文ID"} value={orderDetail.mallOrderId ?? ""}
              onChange={e => handleMallOrderIdOnChange(e, orderDetail.uuid)}
            />
          </div>
          <div className="mt-8">
            <InputGroup44
              id={`${inputId}-supplier`} text={"仕入先"} value={orderDetail.shopName ?? ""}
              onChange={e => handleShopNameOnChange(e, orderDetail.uuid)}
            />
          </div>
          <div className="mt-8">
            <TextAndLabel24 labelText={"商品URL"} paragraphText={orderDetail.product.productImageUrl ?? ""} />
          </div>
          <div className="mt-8">
            <InputGroup44
              id={`${inputId}-product-name`} text={"商品名"} value={orderDetail.productName ?? ""}
              onChange={e => handleProductNameOnChange(e, orderDetail.uuid)}
            />
          </div>
          <div className="mt-8">
            <TextAndLabel24 labelText={"お客様SKU"} paragraphText={orderDetail.product.sku ?? ""} />
          </div>
          <div className="mt-8">
            <ImageGroup
              text="写真" imageUrl={orderDetail.product.productImageUrl ?? "/images/dummy/dummy-image.png"} alt=""
              width={50} height={33}
            />
          </div>
          <div className="mt-8">
            <If condition={orderDetail.order.orderType === enumOrderType.oem}>
              <Then>
                <InputGroup44
                  id={`${inputId}-variation`} text={"バリエーション"} value={orderDetail.variation ?? ""}
                  onChange={e => handleVariationOnChange(e, orderDetail.uuid)}
                />
              </Then>
              <Else>
                <TextAndLabel44 labelText={"バリエーション"} paragraphText={orderDetail.variation ?? ""} />
              </Else>
            </If>

          </div>
          <div className="mt-8">
            <InputGroup44
              id={`${inputId}-unit-price`} text={"単価"} isRequired value={orderDetail.unitPrice.toLocaleString()}
              onChange={e => handleUnitPriceOnChange(e, orderDetail.uuid)}
            />
          </div>
          <div className="mt-8">
            <InputGroup44
              id={`${inputId}-quantity`} text={"数量"} isRequired value={orderDetail.quantity.toLocaleString()}
              onChange={e => handleQuantityOnChange(e, orderDetail.uuid)}
            />
          </div>
          <div className="mt-8">
            <TextAndLabel24
              labelText={"小計"}
              paragraphText={`${(orderDetail.unitPrice * orderDetail.quantity).toLocaleString()}${unitName}`}
            />
          </div>
          <div className="mt-8">
            <InputGroup44
              id={`${inputId}-shipping-fee`} text={"送料"} value={orderDetail.postage.toLocaleString()}
              onChange={e => handlePostageOnChange(e, orderDetail.uuid)}
            />
          </div>
          <div className="min-w-[560px]">
            <OtherAmountGroup
              orderDetail={orderDetail} handleOtherNameOnChange={handleOtherNameOnChange}
              handleOtherQuantityOnChange={handleOtherQuantityOnChange}
              handleOtherUnitPriceOnChange={handleOtherUnitPriceOnChange}
            />
          </div>
          <div className="mt-8">
            <TextAndLabel24 labelText={"内税"} paragraphText={`${includeTax.toLocaleString()}${unitName}`} />
          </div>
          <div className="mt-8">
            <TextAndLabel24 labelText={"総合計"} paragraphText={`${total.toLocaleString()}${unitName}`} />
          </div>
          <div className="mt-8">
            <FileUploadIconTextareaGroup
              textareaId={`${inputId}-file`} inputFileUploadIconId={"file"}
              labelText={"備考"} rows={3} value={orderDetail.privateRemarks}
              onChange={e => handlePublicRemarksOnChange(e, orderDetail.uuid)}
              handleFileOnChange={e => handlePublicRemarksFileOnChange(e, orderDetail.uuid)}
            />
          </div>
          <div className="mt-8">
            <FileUploadIconTextareaGroup
              textareaId={`${inputId}-file-order`} inputFileUploadIconId={"file"}
              labelText={"注文明細"} rows={3} value={""}
              onChange={e => handleReceiptOnChange(e, orderDetail.uuid)}
              handleFileOnChange={e => handleReceiptFileOnChange(e, orderDetail.uuid)}
            />
          </div>
        </FlexWrapperLg>
      </ContentAreaWrapper>
    </>
  );
};

export default DepositModalItem;
