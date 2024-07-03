import React, { useState } from "react";
import { DateRange, RangeKeyDict } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import "@/styles/common/dateRangePicker.css";
import { DateRangePickerType, DateRangeType } from "@/types/components/atoms/form/date/DateRangePickerType";

const DateRangePicker = ({ setStartDate, setEndDate }: DateRangePickerType) => {
  const [ selectedRange, setSelectedRange ] = useState<{ selection: DateRangeType; }>({
    selection: {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  });

  const handleSelect = (rangesByKey: RangeKeyDict) => {
    setSelectedRange({ ...selectedRange, ...rangesByKey });
    if (rangesByKey.selection.startDate && rangesByKey.selection.endDate) {
      setStartDate(rangesByKey.selection.startDate);
      setEndDate(rangesByKey.selection.endDate);
    }
  };

  return (
    <div className="absolute z-10">
      <DateRange
        ranges={[ selectedRange.selection ]}
        onChange={handleSelect}
        months={2}
        direction="horizontal"
        showDateDisplay={false}
      />
    </div>
  );
};
export default DateRangePicker;
