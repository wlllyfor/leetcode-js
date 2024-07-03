"use client";

import { ReactElement } from "react";
import { DatepickerWrapperType } from "@/types/components/atoms/div/wrapper/DatepickerWrapperType";

const DatepickerWrapper = ({ children }: DatepickerWrapperType): ReactElement => {
  return (
    <div
      className="
        absolute z-10 w-80 md:w-[40.4rem] flex flex-col bg-white border shadow-lg rounded-xl overflow-hidden
      "
    >
      {children}
    </div>
  );
};

export default DatepickerWrapper;
