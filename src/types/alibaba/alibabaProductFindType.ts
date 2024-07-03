import { HubDbTableType } from "@/types/db/hub";

export type AlibabaProductFindType = {
  success: boolean;
  categoryId: number;
  createdDate: string;
  description: string;
  isJxhy: boolean;
  /**
   * 動画のパス
   */
  mainVideo: string;
  /**
   * 最小購入個数
   */
  minOrderQuantity: number;
  /**
   * ？
   */
  offerIdentities: string[];
  productAttribute: ProductAttributeType[];
  productImage: ProductImageType;
  productShippingInfo: {
    height: number;
    length: number;
    pkgSizeSource: string;
    sendGoodsAddressText: string;
    weight: number;
    width: number;
  };
  productSkuInfos: ProductSkuInfoType[];
  secondCategoryId: number;
  sellerDataInfo: SellerDataInfoType;
  sellerMixSetting: {
    generalHunp: boolean;
    mixNumber: number;
  };
  sellerOpenId: string;
  soldOut: string;
  status: "published";
  subject: string;
  subjectTrans: string;
  tagInfoList: tagInfoListType[];
  topCategoryId: number;
  traceInfo: string;
  tradeScore: string;
  hub: HubDbTableType;
}

type tagInfoListType = {
  key: string;
  value: boolean;
}

type SellerDataInfoType = {
  afterSalesExperienceScore: string;
  compositeServiceScore: string;
  consultingExperienceScore: string;
  disputeComplaintScore: string;
  logisticsExperienceScore: string;
  offerExperienceScore: string;
  repeatPurchasePercent: string;
  tradeMedalLevel: string;
}

type ProductSkuInfoType = {
  amountOnSale: number;
  cargoNumber: string;
  consignPrice: string;
  price: string;
  skuId: number;
  specId: string;
  skuAttributes: SkuAttributeType[];
}

type SkuAttributeType = {
  attributeId: number;
  attributeName: string;
  attributeNameTrans: string;
  skuImageUrl: string;
  value: string;
  valueTrans: string;
}

type ProductImageType = {
  images: string[];
  whiteImage: string;
}

type ProductAttributeType = {
  attributeId: string;
  attributeName: string;
  value: string;
  attributeNameTrans: string;
  valueTrans: string;
}

