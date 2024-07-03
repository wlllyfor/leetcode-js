"use client";

import { ReactElement } from "react";
import { TextareaType } from "@/types/components/atoms/form/TextareaType";

const Textarea = ({
  onFocus,
  onBlur,
  onClick,
  onChange,
  value,
  id,
  name,
  placeholder,
  isRequired,
  isDisabled,
  isReadOnly,
  rows = 1,
  height,
}: TextareaType): ReactElement => {
  const classNameOfHeight = height ? `h-[${height}px]` : "";
  return (
    <textarea
      id={id}
      name={name}
      placeholder={placeholder}
      required={isRequired}
      disabled={isDisabled}
      readOnly={isReadOnly}
      onBlur={onBlur}
      onFocus={onFocus}
      onClick={onClick}
      onChange={onChange}
      rows={rows}
      value={value}
      className={`
        border border-gray-300 border-solid text-gray-900 bg-white text-left ${classNameOfHeight}
        text-sm rounded-md focus:ring-blue-500
        focus:border-blue-500 block w-full p-2
        `}
    />
  );
};

export default Textarea;
