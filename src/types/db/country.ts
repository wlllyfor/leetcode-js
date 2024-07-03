export type CountryDbTableType = {
  id: number | null;
  code: number | null;
  name: string | null;
  isJapan: string | null;
  createdAt: string;
  createdOn: string;
  updatedAt: string;
  updatedOn: string;
  deletedAt: string | null;
};

export type CountryDbType = {
  id: number;
  code: string;
  name: string;
  isJapan: boolean;
  createdOn: string;
  updatedOn: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}
