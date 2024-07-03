"use client";

import { ReactElement } from "react";
import { InputType } from "@/types/components/atoms/form/InputType";

const Input = ({
  onFocus,
  onBlur,
  onClick,
  onChange,
  id,
  value,
  name,
  inputType,
  placeholder,
  isRequired,
  isDisabled,
  maxLength,
  isAutocomplete,
  isReadOnly,
}: InputType): ReactElement => {
  const autocomplete: string = isAutocomplete ? "on" : "off";
  // isReadOnly属性が存在する場合、borderをなくすクラス名を追加
  const borderClass = isReadOnly ? "border-none" : "";

  return (
    <input
      id={id}
      value={value}
      name={name}
      type={inputType ?? "text"}
      placeholder={placeholder}
      required={isRequired}
      disabled={isDisabled}
      maxLength={maxLength}
      autoComplete={autocomplete}
      readOnly={isReadOnly}
      onBlur={onBlur}
      onFocus={onFocus}
      onClick={onClick}
      onChange={onChange}
      className={`
        ${borderClass} border border-gray-300 border-solid text-gray-900 bg-white text-left
        text-xs rounded-md focus:ring-blue-500
        focus:border-blue-500 block w-full p-2
      `}
    />
  );
};

export default Input;
