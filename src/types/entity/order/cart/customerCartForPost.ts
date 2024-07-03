type CustomerCartForPost = {
  products: CartProduct[];
};

type CartProduct = {
  productId: string;
  productName: string;
  skuId: number;
  variation: string;
  size: string;
  imageUrl: string;
  unitPrice: number;
  quantity: number;
}

const emptyCustomerCartForPost: CustomerCartForPost = {
  products: [],
};

export type { CustomerCartForPost };
export { emptyCustomerCartForPost };
