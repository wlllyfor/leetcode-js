export type CurrencyDbTableType = {
  id: number;
  name: string;
  nameToJp: string;
  decimalPlaces: number;
  createdAt: string;
  createOn: string;
  updatedAt: string;
  updatedOn: string;
  deletedAt: string | null;
};

export type CurrencyDbType = {
  id: number;
  name: string;
  nameToJp: string;
  createdOn: string;
  updatedOn: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}
