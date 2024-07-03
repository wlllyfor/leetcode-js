import React, { useState } from "react";
import { TooltipType } from "@/types/components/atoms/tooltip/TooltipType";

const HoverText = ({ text, tipText, icon }: TooltipType) => {
  const [ isHovered, setIsHovered ] = useState<boolean>(false);

  return (
    <div onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
      {text}
      {icon}
      {isHovered && <div>{tipText}</div>}
    </div>
  );
};

export default HoverText;
