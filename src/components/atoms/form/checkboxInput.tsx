"use client";

import { ReactElement } from "react";
import { CheckboxInputType } from "@/types/components/atoms/form/CheckboxInputType";

const CheckboxInput = ({ id, checked, onChange }: CheckboxInputType): ReactElement => {
  return (
    <input
      type="checkbox"
      id={id}
      className="
        shrink-0 mt-0.5 border-solid border border-gray-200 rounded text-gray-300 w-[0.8rem] h-[0.8rem]
        focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none
      "
      checked={checked}
      onChange={onChange}
    />
  );
};

export default CheckboxInput;
