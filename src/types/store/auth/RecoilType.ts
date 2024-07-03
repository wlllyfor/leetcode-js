export type RecoilType = {
  accessToken: string | null;
  type: AuthType;
};

export type AuthType = {
  type: EnumAuth.Customer | EnumAuth.Employee | EnumAuth.Guest;
};

export enum EnumAuth {
  Customer = "customer",
  Employee = "employee",
  Guest = "guest",
}
