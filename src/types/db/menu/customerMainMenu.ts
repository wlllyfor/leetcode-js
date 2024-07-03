export type CustomerMainMenuDbTableType = {
  id: number;
  title: string;
  path: string | null; // nullの場合はサブメニューが続く
  icon: string;
  createdAt: string;
  createdOn: string;
  updatedAt?: string;
  updatedOn?: string;
};
