import { CustomerCartDbType } from "@/types/db/customerCart";
import { HubDbTableType } from "@/types/db/hub";

type CustomerCartForConfirm = {
  products: CartProductForConfirm[];
};

type CartProductForConfirm = {
  uuid: string;
  checked: boolean;
  customerCart: CustomerCartDbType;
  sku: string;
  quantity: number;
  publicRemarks: string;
  publicRemarksFile: File | null;
  hub: HubDbTableType;
}

export type { CustomerCartForConfirm, CartProductForConfirm };
