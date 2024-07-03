export type DateRangePickerType = {
  setStartDate: React.Dispatch<React.SetStateAction<Date>>;
  setEndDate: React.Dispatch<React.SetStateAction<Date>>;
};


export type DateRangeType = {
  startDate: Date;
  endDate: Date;
  key: string;
};
