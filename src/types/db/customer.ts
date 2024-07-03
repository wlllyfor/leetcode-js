import { EmployeeDbTableType } from "@/types/db/employee";
import { CustomerPlanDbTableType } from "@/types/db/customerPlan";
import { DedicatedAccount } from "@/types/db/dedicatedAccount";
import { CountryDbTableType } from "@/types/db/country";

export type CustomerDbTableType = {
  id: number | null;
  name: string | null;
  nameKana: string | null;
  email: string;
  emailVerifiedAt: string | null;
  emailVerifyLimitedAt: string | null;
  emailVerifiedToken: string | null;
  currentHubId: number | null;
  amazonApiCode: string | null;
  chatWorkId: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  countryId: number | null;
  postalCode: string | null;
  prefectureName: string | null;
  cityName: string | null;
  townName: string | null;
  buildingName: string | null;
  tel: string | null;
  companyName: string | null;
  privateRemarks: string;
  privateRemarksFilePath: string;

  // relation
  employee: EmployeeDbTableType | null;
  dedicatedAccount: DedicatedAccount | null;
  customerPlans: CustomerPlanDbTableType[];
  country: CountryDbTableType | null;

  // not relation
  code: string;
  currentCustomerPlan: CustomerPlanDbTableType;
};
