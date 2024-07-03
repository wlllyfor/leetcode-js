import { HubDbTableType } from "@/types/db/hub";

export type TransactionDbTableType = {
  id: number;
  hubId: number;
  groupId: number;
  employeeId: number;
  contextId: number;
  employeeAccountId: number;
  subjectId: number;
  supplierId: number;
  contextType: string;
  customerTransactionType: string;
  accountTransactionType: string;
  isIncludedTax: boolean;
  price: number;
  isProfit: boolean;
  paymentMethod: string;
  publicRemarks: string;
  privateRemarks: string;
  privateRemarksFilePath: string;
  isJournalEntry: boolean;

  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;

  // relation
  hub: HubDbTableType;

  // other
  createdOn: string;
  updatedOn: string;
};
