export type TableDataInputOfQuantityType = {
  id: string;
  value?: number;
  text?: string;
  width?: string;
  incrementFunction?: () => void;
  decrementFunction?: () => void;
};
