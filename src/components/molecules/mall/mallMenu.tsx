"use client";

import { ReactElement, useState } from "react";
import CustomerMenu from "@/components/molecules/common/customerMenu";
import { Else, If, Then } from "react-if";

const MallMenu = (): ReactElement => {
  const [ isOpenMenu, setIsOpenMenu ] = useState<boolean>(false);
  const menuColorClass = isOpenMenu ? "bg-[#FFF]" : "bg-[#323673]";
  return (
    <>
      <div className="absolute left-[20px]">
        <button
          className={`w-[50px] h-[50px] rounded-[50%] ${menuColorClass} mt-4  cursor-pointer`}
          onClick={() => setIsOpenMenu(prev => !prev)}
        >
          <If condition={!isOpenMenu}>
            <Then>
              <span className="material-symbols-outlined !text-[22px] text-white pl-[14px] pt-[4px]">menu</span>
            </Then>
            <Else>
              <span className="material-symbols-outlined !text-[22px] text-[#323673] pl-[14px] pt-[4px]">close</span>
            </Else>
          </If>
        </button>
      </div>
      <If condition={isOpenMenu}>
        <Then>
          <CustomerMenu hubCode={""} />
        </Then>
      </If>
    </>
  );
};

export default MallMenu;
