"use client";

import { ReactElement } from "react";
import { ListDetailsType } from "@/types/components/atoms/list/ListDetailsType";

const ListDetails = ({ list }: ListDetailsType): ReactElement => {
  return (
    <ul className="whitespace-nowrap text-sm font-medium text-gray-800 bg-white border-solid border border-[#E5E7EB]">
      {list.map(item => (
        <li key={item} className="px-4 py-4 border-solid border-0 border-t border-[#E5E7EB] first:border-t-0">
          {item}
        </li>
      ))}
    </ul>
  );
};

export default ListDetails;
