"use client";

import { ReactElement } from "react";
import { CalendarGroupWrapperType } from "@/types/components/atoms/div/wrapper/CalendarGroupWrapperType";

const CalendarGroupWrapper = ({ children }: CalendarGroupWrapperType): ReactElement => {
  return <div className="p-3 grid md:flex gap-8">{children}</div>;
};

export default CalendarGroupWrapper;
