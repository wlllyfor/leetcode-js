"use client";

import { ReactElement } from "react";
import { CalendarWrapperType } from "@/types/components/atoms/div/wrapper/CalendarWrapperType";

const CalendarWrapper = ({ children }: CalendarWrapperType): ReactElement => {
  return <div className="space-y-0.5">{children}</div>;
};

export default CalendarWrapper;
