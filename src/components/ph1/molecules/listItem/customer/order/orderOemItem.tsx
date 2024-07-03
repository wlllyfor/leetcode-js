"use client";

import { ChangeEvent, ReactElement, useEffect, useState } from "react";
import commonClasses from "@/styles/common/page.module.scss";
import WhiteWideWrapper from "@/components/atoms/div/wrapper/whiteWideWrapper";
import Paragraph from "@/components/atoms/paragraph";
import Input from "@/components/atoms/input";
import CloseButton from "@/components/atoms/button/closeButton";
import { OrderOemDetailType } from "@/types/entity/order/orderOemDetailType";
import InputOfRemarks from "@/components/molecules/inputs/inputOfRemark";
import { useFind } from "@/hooks/customer/product/useFind";
import { HubDbTableType } from "@/types/db/hub";
import InputOfQuantity from "../../../inputs/inputOfQuantity";
import { Integer } from "@/lib/integer";

const LabelAndInput = ({
  label,
  id,
  value,
  isRequired = false,
  width50Per = false,
  changeFunction,
  isReadOnly = false,
  placeholder,
}: {
  label: string;
  id: string;
  value: string | number;
  isRequired?: boolean;
  isReadOnly?: boolean;
  width50Per?: boolean;
  placeholder?: string;
  changeFunction?: (e: ChangeEvent<HTMLInputElement>) => void;
}): ReactElement => {
  return (
    <>
      <Paragraph>
        {label}
        {isRequired && <span className={commonClasses.required}>*</span>}
      </Paragraph>
      <Input
        isReadOnly={isReadOnly}
        value={value}
        id={id}
        width50Per={width50Per}
        width15Per={!width50Per}
        placeholder={placeholder}
        changeFunction={changeFunction}
      />
    </>
  );
};
const OrderOemItem = ({
  orderProduct,
  handleOnChangeOrderOemItem,
  handleOnClickDeleteDetail,
  hub,
}: {
  orderProduct: OrderOemDetailType;
  handleOnChangeOrderOemItem: (orderProduct: OrderOemDetailType) => Promise<void>;
  handleOnClickDeleteDetail: (uuid: string) => Promise<void>;
  hub: HubDbTableType;
}): ReactElement => {
  // useState宣言
  const [ name, setName ] = useState<string>("");
  const [ productUrl, setProductUrl ] = useState<string>("");
  const [ sku, setSku ] = useState<string>("");
  const [ productLabel, setProductLabel ] = useState<string>("");
  const [ unitPrice, setUnitPrice ] = useState<number>(0);
  const [ quantity, setQuantity ] = useState<number>(1);
  const [ variation, setVariation ] = useState<string>("");
  const [ publicRemarks, setPublicRemarks ] = useState<string>("");
  const [ publicRemarksFile, setPublicRemarksFile ] = useState<File | null>(null);
  const [ subTotal, setSubTotal ] = useState<number>(0);

  // レンダリング中かどうかのフラグ
  const [ isFirstRender, setIsFirstRender ] = useState(true);

  const { product: productForLabel, getProduct, setSku: setSkuForFind, sku: skuForFind } = useFind();

  /**
   * 小計の計算
   */
  useEffect((): void => {
    setSubTotal(unitPrice * quantity);
  }, [ unitPrice, quantity ]);

  // 入力値が変更されたら、リスト全体更新
  useEffect((): void => {
    if (!isFirstRender) {
      const newValue = {
        ...orderProduct,
        name: name,
        productUrl: productUrl,
        sku: sku,
        unitPrice: unitPrice,
        quantity: quantity,
        variation: variation,
        publicRemarks: publicRemarks,
        publicRemarksFile: publicRemarksFile,
      };
      (async (): Promise<void> => {
        await handleOnChangeOrderOemItem(newValue);
      })();
    } else {
      setIsFirstRender(prevState => false);
    }
  }, [ name, productUrl, sku, unitPrice, quantity, variation, publicRemarks, publicRemarksFile, isFirstRender ]);

  /**
   * sku変更時にラベル取得
   */
  useEffect((): void => {
    if (sku) {
      setSkuForFind(prevState => sku);
    }
  }, [ sku, setSkuForFind ]);

  /**
   * sku変更時にラベル取得
   */
  useEffect((): void => {
    if (skuForFind) {
      (async (): Promise<void> => {
        await getProduct();
      })();
    }
  }, [ skuForFind, getProduct ]);

  /**
   * skuをもとに取得できた場合。
   */
  useEffect((): void => {
    if (productForLabel) {
      setProductLabel(prevState => productForLabel.label);
    }
  }, [ productForLabel ]);

  // handle
  /**
   * 商品名変更イベント
   * @param e
   */
  const handleOnChangeName = (e: ChangeEvent<HTMLInputElement>): void => {
    setName(prevState => e.target.value);
  };

  /**
   * 商品URL変更イベント
   * @param e
   */
  const handleOnChangeProductUrl = (e: ChangeEvent<HTMLInputElement>): void => {
    setProductUrl(prevState => e.target.value);
  };

  /**
   * SKU変更イベント
   * @param e
   */
  const handleOnChangeSku = (e: ChangeEvent<HTMLInputElement>): void => {
    setSku(prevState => e.target.value);
  };

  /**
   * 単価変更イベント
   * @param e
   */
  const handleOnChangeUnitPrice = (e: ChangeEvent<HTMLInputElement>): void => {
    setUnitPrice(prevState => Integer.parseIntExceptZero(e.target.value));
  };

  /**
   * 数量減少イベント
   */
  const handleQuantityOnDecrement = (): void => {
    setQuantity(prevState => prevState - 1);
  };

  /**
   * 数量増加イベント
   */
  const handleQuantityOnIncrement = (): void => {
    setQuantity(prevState => prevState + 1);
  };

  /**
   * バリエーション変更イベント
   * @param e
   */
  const handleOnChangeVariation = (e: ChangeEvent<HTMLInputElement>): void => {
    setVariation(prevState => e.target.value);
  };

  /**
   * 備考変更イベント
   * @param e
   */
  const handleOnChangeRemarks = (e: ChangeEvent<HTMLInputElement>): void => {
    setPublicRemarks(prevState => e.target.value);
  };

  /**
   * 商品添付ファイル変更イベント
   * @param event
   */
  const handleOnPublicRemarksFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    // event.target.filesはFileList型かnull
    const selectedFile = event.target.files?.[0] ?? null;
    setPublicRemarksFile(prevState => selectedFile);
  };

  const classNamesMr16 = [
    commonClasses.flex__wrapper,
    commonClasses.aline_center,
    commonClasses.mt_8,
    commonClasses.c_mr_16,
  ];

  return (
    <WhiteWideWrapper>
      <div className={`${commonClasses.flex__wrapper} ${commonClasses.aline_center}`}>
        <div className={commonClasses.ml_16}>
          <div className={classNamesMr16.join(" ")}>
            <LabelAndInput
              id={"name"}
              label={"商品名"}
              value={name}
              isRequired={true}
              changeFunction={handleOnChangeName}
            />
            <LabelAndInput
              id={"productUrl"}
              label={"商品URL"}
              value={productUrl}
              changeFunction={handleOnChangeProductUrl}
            />
          </div>
          <div className={classNamesMr16.join(" ")}>
            <LabelAndInput id={"sku"} label={"お客様SKU"} value={sku} changeFunction={handleOnChangeSku} />
            <LabelAndInput id={"productLabel"} label={"商品ラベル"} value={productLabel} isReadOnly={true} />
            <LabelAndInput id={"unitPrice"} label={"単価"} value={unitPrice} changeFunction={handleOnChangeUnitPrice} />
            <InputOfQuantity
              id={"quantity"} text={"数量"} value={quantity}
              incrementFunction={handleQuantityOnIncrement}
              decrementFunction={handleQuantityOnDecrement}
            />
          </div>
          <div className={classNamesMr16.join(" ")}>
            <LabelAndInput
              id={"variation"}
              label={"バリエーション"}
              value={variation}
              placeholder={"色やサイズなど"}
              changeFunction={handleOnChangeVariation}
            />
            <InputOfRemarks
              id={`publicRemarks-${orderProduct.uuid}`}
              value={publicRemarks}
              text={"備考"}
              changeTextFunction={handleOnChangeRemarks}
              file={publicRemarksFile}
              changeFileFunction={handleOnPublicRemarksFileChange}
              isCustomerOrder
            />
          </div>
        </div>
        <div className={commonClasses.ml_auto}>
          <Paragraph isBold>
            小計：{subTotal.toLocaleString()}({hub.currency.name})
          </Paragraph>
        </div>
      </div>
      <CloseButton
        clickFunction={async (): Promise<void> => {
          await handleOnClickDeleteDetail(orderProduct.uuid);
        }}
      />
    </WhiteWideWrapper>
  );
};

export default OrderOemItem;
