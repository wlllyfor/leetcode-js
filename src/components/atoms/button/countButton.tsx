"use client";

import { CountButtonType } from "@/types/components/atoms/button/CountButtonType";
import { ReactElement } from "react";

const CountButton = ({ clickFunction, isPlus, isMinus }: CountButtonType): ReactElement => {
  return (
    <button onClick={clickFunction}>
      {isPlus && <div className="bg-[#efefef] border-solid border-[1px] border-gray-300 rounded-r-md text-[#afafaf] px-3 py-[8px] relative">+</div>}
      {isMinus && <div className="bg-[#efefef] border-solid border-[1px] border-gray-300 rounded-l-md text-[#afafaf] px-3 py-[8px] relative">-</div>}
    </button>
  );
};

export default CountButton;
