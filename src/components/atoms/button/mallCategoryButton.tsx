"use client";

import { ReactElement } from "react";
import { MallCategoryButtonType } from "@/types/components/atoms/button/MallCategoryButtonType";

const MallCategoryButton = ({ text, onClick }: MallCategoryButtonType): ReactElement => {

  return (
    <button className="px-2" onClick={onClick}>
      <span className="text-white">
        {text}
        <span className={`material-symbols-outlined align-bottom text-white`}>arrow_drop_down</span>
      </span>
    </button>
  );
};

export default MallCategoryButton;
