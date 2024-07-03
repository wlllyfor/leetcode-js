import React, { useState } from "react";
import { Calendar } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import "@/styles/common/dateRangePicker.css";
import { DateRangePickerType } from "@/types/components/atoms/form/date/DateRangePickerType";

const DateCalendar = ({ setStartDate, setEndDate }: DateRangePickerType) => {
  const [ selectedDate, setSelectedDate ] = useState<Date>(new Date());

  const handleSelect = (date: Date) => {
    setSelectedDate(date);
    setStartDate(date);
    setEndDate(date);
  };

  return (
    <div className="absolute z-10">
      <Calendar date={selectedDate} onChange={handleSelect} months={1} direction="horizontal" />
    </div>
  );
};

export default DateCalendar;
