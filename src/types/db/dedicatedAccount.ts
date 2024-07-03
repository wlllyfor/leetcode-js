import { CustomerDbTableType } from "@/types/db/customer";

export type DedicatedAccount = {
  customerId: number;
  /**
   * 銀行名
   */
  bankName: string;
  /**
   * 支店名
   */
  branchName: string;

  /**
   * 口座番号
   */
  accountNumber: string;

  customer: CustomerDbTableType;
}
