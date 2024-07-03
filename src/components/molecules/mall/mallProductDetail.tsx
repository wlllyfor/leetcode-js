import React, { Dispatch, SetStateAction, useEffect } from "react";
import MallProductDetailTab from "@/components/molecules/mall/mallProductDetailTab";
import Paragraph from "@/components/atoms/text/paragraph";
import Title from "@/components/atoms/text/title";
import MallProductDetailList from "@/components/molecules/mall/mallProductDetailList";
import FormButton from "@/components/atoms/button/formButton";
import { Else, If, Then } from "react-if";
import { AlibabaProductFindType } from "@/types/alibaba/alibabaProductFindType";
import { TabType } from "@/types/alibaba/order/product/tabType";
import Image from "next/image";
import { VariationType } from "@/types/alibaba/order/product/variationType";
import { SizeType } from "@/types/alibaba/order/product/sizeType";
import { Float } from "@/lib/float";
import { UUID } from "@/lib/uuid";

const MallProductDetail = ({
  product,
  selectedVariation,
  activeMallProductTypeTab,
  handleTabOnChange,
  handleVariationOnClick,
  sizeList,
  setSizeList,
  handleQuantityOnIncrement,
  handleQuantityOnDecrement,
  postCustomerCart,
}: {
  product: AlibabaProductFindType;
  selectedVariation: string;
  activeMallProductTypeTab: TabType;
  handleTabOnChange: (mallProductType: TabType) => void;
  handleVariationOnClick: (e: React.MouseEvent<HTMLParagraphElement>) => void;
  sizeList: SizeType[];
  setSizeList: Dispatch<SetStateAction<SizeType[]>>;
  handleQuantityOnIncrement: (skuId: number) => void;
  handleQuantityOnDecrement: (skuId: number) => void;
  postCustomerCart: () => Promise<void>;
}) => {


  // use effects

  /**
   * バリエーションが選択されたら、サイズが決まる
   */
  useEffect((): void => {

    const matchedProducts = product.productSkuInfos.filter(skuInfo =>
      skuInfo.skuAttributes.some(attr => attr.attributeId === 3216 && attr.valueTrans === selectedVariation)); // 3216はサイズの番号

    if (matchedProducts.length > 0) {
      const matchesSizeList: SizeType[] = matchedProducts.flatMap(skuInfo => {
        return skuInfo.skuAttributes
          .filter(attr => attr.attributeId === 450) // 450はカラーの番号
          .map(attr => ({
            skuId: skuInfo.skuId,
            productName: product.subjectTrans,
            price: Float.parseFloatExceptZero(skuInfo.price),
            priceOnJp: "", // todo: 通貨変換
            quantity: skuInfo.amountOnSale,
            inputtedQuantity: 0,
            sizeName: attr.valueTrans,
          })).reduce<SizeType[]>((uniqueArray, item) => {
            const isDuplicate = uniqueArray.some(uniqueItem => uniqueItem.sizeName === item.sizeName);
            return isDuplicate ? uniqueArray : [ ...uniqueArray, item ];
          }, []);
      });
      setSizeList(prevState => matchesSizeList);

    } else {
      setSizeList(prevState => []);
    }

  }, [ product.productSkuInfos, product.subjectTrans, selectedVariation, setSizeList ]);

  /**
   * 1点から仕入れが可能かどうか
   * @type {boolean}
   */
  const isOnePsale = product.tagInfoList.find(tag => tag.key === "isOnePsale")?.value || false;

  // 金額の最小・最大値について
  const prices = product.productSkuInfos.map(info => parseFloat(info.price));
  const minPrice = Math.min(...prices);
  const maxPrice = Math.max(...prices);

  // 単位
  const name = product.hub.currency.name;
  const nameTpJp = product.hub.currency.nameToJp;
  const unitName = `${nameTpJp}(${name})`;

  // カラー
  const colors = product.productSkuInfos.flatMap(skuInfo => {
    return skuInfo.skuAttributes
      .filter(attr => attr.attributeId === 3216) // マジックナンバー勘弁。3216がカラー。
      .map(attr => ({ skuImageUrl: attr.skuImageUrl, valueTrans: attr.valueTrans }));
  }).reduce<VariationType[]>((uniqueArray, item) => {
    const isDuplicate = uniqueArray.some(uniqueItem => uniqueItem.skuImageUrl === item.skuImageUrl && uniqueItem.valueTrans === item.valueTrans);

    return isDuplicate ? uniqueArray : [ ...uniqueArray, item ];
  }, []);

  return (
    <>
      <div className="w-[68%]">
        <Title
          text={product.subjectTrans}
          position="left"
          isBold
        />
        <div className="text-[#6C757D] mt-[-0.75rem]">
          <Paragraph
            text="1688:仕入先名が入ります。" fontSize={"12px"} color="#6c757d"
          />
        </div>

        {/* タブ: 1点から仕入れできないものに関してはそもそも表示しない */}
        <If condition={isOnePsale}>
          <Then>
            <MallProductDetailTab
              activeMallProductTypeTab={activeMallProductTypeTab}
              handleTabOnChange={handleTabOnChange}
            />
          </Then>
        </If>

        <div className="mt-4">
          {/* 金額 */}
          <div className="flex items-baseline text-[28px]">
            <If condition={minPrice === maxPrice}>
              <Then>
                <Paragraph text={`${maxPrice}${unitName}`} color="[#E63B3D]" fontSize="28px" isBold />
                {/* 日本円換算 */}
                <div className="ml-1">
                  <Paragraph text="(2000円)" color="[#E63B3D]" fontSize="10px" />
                </div>
              </Then>
              <Else>
                <Paragraph text={`${minPrice}-${maxPrice}${unitName}`} color="[#E63B3D]" fontSize="28px" isBold />
                {/* 日本円換算 */}
                <div className="ml-1">
                  <Paragraph text="(1800円-2000円)" color="[#E63B3D]" fontSize="10px" />
                </div>
              </Else>
            </If>
          </div>

          {/* 商品バリエーション */}
          <div className="mt-4">
            <Paragraph text="バリエーション" isBold />
            {colors.map(color => {
              return (
                <div
                  key={UUID.generate()} onClick={handleVariationOnClick} data-color={color.valueTrans}
                  data-image_url={color.skuImageUrl}
                >
                  <Image src={color.skuImageUrl} alt={"商品画像"} height={20} width={20} />
                  <Paragraph text={color.valueTrans} />
                </div>
              );
            })}

            <div className="mt-2">
              <MallProductDetailList
                sizeList={sizeList} unitName={unitName}
                handleQuantityOnIncrement={handleQuantityOnIncrement}
                handleQuantityOnDecrement={handleQuantityOnDecrement}
              />
            </div>
          </div>

          {/* 最低注文数：1点から仕入れ時のみ表示 */}
          <If condition={activeMallProductTypeTab === "purchaseFrom1Product"}>
            <Then>
              <div className="mt-20">
                <Paragraph text="最低注文数" isBold />
                <Paragraph text="20から" isBold />
              </div>
            </Then>
          </If>

          {/* ボタン */}
          <div className="mt-4">
            <FormButton text="カートに追加する" color="green" onClick={postCustomerCart} />
          </div>
        </div>
      </div>
    </>
  );
};

export default MallProductDetail;
