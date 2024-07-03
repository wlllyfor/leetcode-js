export type CountableInputOfQuantityType = {
  id: string;
  value?: number;
  text?: string;
  incrementFunction?: () => void;
  decrementFunction?: () => void;
};
