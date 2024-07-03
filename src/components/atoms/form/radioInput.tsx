"use client";

import { ReactElement } from "react";
import { RadioInputType } from "@/types/components/atoms/form/RadioInputType";

const RadioInput = ({ id, name, checked, onChange }: RadioInputType): ReactElement => {
  return (
    <input
      type="radio"
      id={id}
      name={name}
      className="
        relative float-left -ms-[1.5rem] me-1 mt-0.5 h-5 w-5 appearance-none rounded-full
        border-2 border-solid border-secondary-500
        before:pointer-events-none before:absolute before:h-4 before:w-4 before:scale-0 before:rounded-full
        before:bg-transparent before:opacity-0 before:shadow-checkbox before:shadow-transparent before:content-['']
        after:absolute after:z-[1] after:block after:h-4 after:w-4 after:rounded-full after:content-['']
        checked:border-primary checked:before:opacity-[0.16] checked:after:absolute checked:after:left-1/2
        checked:after:top-1/2 checked:after:h-[0.625rem] checked:after:w-[0.625rem] checked:after:rounded-full
        checked:after:border-primary checked:after:bg-primary checked:after:content-['']
        checked:after:[transform:translate(-50%,-50%)]
        hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-black/60
        focus:shadow-none focus:outline-none focus:ring-0 focus:before:scale-100 focus:before:opacity-[0.12]
        focus:before:shadow-black/60 focus:before:transition-[box-shadow_0.2s,transform_0.2s]
        checked:focus:border-primary checked:focus:before:scale-100 checked:focus:before:shadow-checkbox
        checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] rtl:float-right
        dark:border-neutral-400 dark:checked:border-[#CCCCCC]"
      checked={checked}
      onChange={onChange}
      value={id}
    />
  );
};

export default RadioInput;
