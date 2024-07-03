import React, { ReactElement, useEffect, useRef, useState } from "react";
import Input from "@/components/atoms/form/input";
import DateRangePicker from "@/components/atoms/form/date/dateRangePicker";
import DateCalendar from "@/components/atoms/form/date/dateCalendar";
import { InputType } from "@/types/components/atoms/form/InputType";
import { InputDateType } from "@/types/components/molecules/form/input/InputDateType";

const InputDate = ({ id, isRange, isCalendar, onChange, value }: InputDateType): ReactElement => {
  const [ showDatepicker, setShowDatepicker ] = useState<boolean>(false);
  const [ startDate, setStartDate ] = useState<Date>(value ? new Date(value) : new Date());
  const [ endDate, setEndDate ] = useState<Date>(new Date());
  const datepickerRef = useRef<HTMLDivElement>(null);
  const [ selectedValue, setSelectedValue ] = useState<string>("");

  const handleOnClick = (): void => {
    setShowDatepicker(!showDatepicker);
  };

  const handleClickOutside = (event: MouseEvent): void => {
    if (datepickerRef.current && !datepickerRef.current.contains(event.target as Node)) {
      setShowDatepicker(false);
    }
  };

  useEffect(() => {
    if (showDatepicker) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return (): void => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ showDatepicker ]);

  useEffect((): void => {
    setSelectedValue(prevState => {
      return isRange
        ? `${startDate.toLocaleDateString()} - ${endDate.toLocaleDateString()}`
        : startDate.toLocaleDateString();
    });

  }, [ startDate, endDate, isRange ]);

  useEffect(() => {
    onChange && onChange(selectedValue);
  }, [ onChange, selectedValue ]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setSelectedValue(prevState => e.target.value);
  };

  const inputProps: InputType = {
    onClick: handleOnClick,
    onChange: handleInputChange,
    id: id,
    value: selectedValue,
    isReadOnly: false,
    isRequired: false,
    isAutocomplete: false,
    isDisabled: false,
  };

  return (
    <div ref={datepickerRef}>
      <Input {...inputProps} />
      {isRange && showDatepicker && <DateRangePicker setStartDate={setStartDate} setEndDate={setEndDate} />}
      {isCalendar && showDatepicker && <DateCalendar setStartDate={setStartDate} setEndDate={setEndDate} />}
    </div>
  );
};

export { InputDate };
