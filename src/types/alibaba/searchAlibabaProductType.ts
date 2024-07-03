import { HubDbTableType } from "@/types/db/hub";

export type SearchAlibabaProductType = {
  success: boolean;
  totalRecords: number;
  totalPage: number;
  pageSize: number;
  currentPage: number;
  data: AlibabaProductData[];
  hub: HubDbTableType;
}

type PriceInfo = {
  price: string;
  jxhyPrice?: string;
  pfJxhyPrice?: string;
  consignPrice: string;
  promotionPrice?: string;
};

type PromotionModel = {
  hasPromotion: boolean;
  promotionType: string;
};

export type AlibabaProductData = {
  imageUrl: string;
  subject: string;
  subjectTrans: string;
  offerId: number;
  isJxhy: boolean;
  priceInfo: PriceInfo;
  repurchaseRate: string;
  monthSold: number;
  traceInfo: string;
  isOnePsale: boolean;
  sellerIdentities: string[];
  offerIdentities: string[];
  tradeScore: string;
  promotionModel?: PromotionModel;
  topCategoryId: number;
  secondCategoryId: number;
  thirdCategoryId?: number;
  isPatentProduct: boolean;
  createDate: string;
  modifyDate: string;
  whiteImage?: string;
};
