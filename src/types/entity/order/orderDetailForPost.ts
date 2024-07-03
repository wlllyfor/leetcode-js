/**
 * 注文登録の際の商品明細
 */
type OrderDetailForPost = {
  orderType: "oem" | "cart";
  products: {
    name: string;
    mall: string;
    productUrl: string;
    sku: string;
    unitPrice: number;
    quantity: number;
    variation: string;
    publicRemarks: string;
    publicRemarksFile: File | null;
    // カート用
    customerCartId: number | null;
    productImageUrl: string | null;
  }[];

};

const emptyOrderOemDetailType: OrderDetailForPost = {
  orderType: "oem",
  products: [],
};

export type { OrderDetailForPost };
export { emptyOrderOemDetailType };
