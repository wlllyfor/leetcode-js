export type InputOfQuantityType = {
  id?: string;
  value?: number;
  text?: string;
  changeFunction?: (quantity: number) => void;
};
