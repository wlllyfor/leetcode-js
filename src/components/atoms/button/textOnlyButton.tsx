"use client";

import { TextOnlyButtonType } from "@/types/components/atoms/button/TextOnlyButtonType";
import { ReactElement } from "react";

/**
 * リンクのように見せたいテキストだけのボタン
 */
const TextOnlyButton = ({ text, hasUnderLine = false, clickFunction }: TextOnlyButtonType): ReactElement => {
  return (
    <button
      onClick={clickFunction}
      className={`
        bg-transparent ${hasUnderLine ? "underline" : ""} border-none cursor-pointer
      `}
    >
      {text}
    </button>
  );
};

export default TextOnlyButton;
