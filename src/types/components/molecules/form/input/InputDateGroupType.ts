export type InputDateGroupType = {
  id: string;
  labelText?: string;
  isRange?: boolean;
  isCalendar?: boolean;
  isRequired?: boolean;
  onChange?: (value: string) => void;
  value?: string;
};
