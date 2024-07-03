/**
 * 商品明細
 */
type OrderOemDetailType = {
  uuid: string;
  name: string;
  sku: string;
  productLabel: string;
  unitPrice: number;
  quantity: number;
  variation: string;
  publicRemarks: string;
  publicRemarksFile: File | null;
  productUrl: string;
};

const emptyOrderOemDetailType: OrderOemDetailType = {
  uuid: "",
  name: "",
  sku: "",
  productLabel: "",
  unitPrice: 0,
  quantity: 0,
  variation: "",
  publicRemarks: "",
  publicRemarksFile: null,
  productUrl: "",
};

export type { OrderOemDetailType };
export { emptyOrderOemDetailType };
