export type InputDateType = {
  id: string;
  isRange: boolean;
  isCalendar: boolean;
  onChange?: (value: string) => void;
  value?: string;
};
