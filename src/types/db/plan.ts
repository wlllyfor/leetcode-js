import { HubDbTableType } from "@/types/db/hub";

export type PlanDbType = {
  id: number;
  hubId: number;
  name: string;
  imagePath: string;
  planHeaderText: string;
  paymentMethodId: string;
  trialPeriodLength: number;
  trialPeriodUnit: string;
  trialPrice: number;
  paymentPeriodLength: number;
  paymentPeriodUnit: string;
  paymentPrice: number;
  description1: string;
  description2: string;
  description3: string;
  description4: string;
  description5: string;
  description6: string;
  description7: string;
  purchaseFee: number | null;
  couponPeriodLength: number;
  couponPeriodUnit: string;
  couponEnableCount: number;
  couponPercent: number;
  applyButtonText: string;
  applyButtonColorCode: string;
  isDisabled: boolean;
  isFree: number;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;

  // relation
  hub: HubDbTableType;

  // not model
  createdOn: string;
  updatedOn: string;
}
