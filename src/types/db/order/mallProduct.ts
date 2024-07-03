export type MallProductDbType = {
  id: number | null;
  mall: string;
  productId: number | null;
  productName: string;
  skuId: number | null;
  variation: string;
  size: string;
  imageUrl: string;
  createdAt: Date | null;
  updatedAt: Date | null;

  // not model
  createdOn: string;
  updatedOn: string;
  mallLabel: string;
};
