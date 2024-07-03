"use client";

import React, { ReactElement } from "react";
import {
  TableDataInputOfQuantityType,
} from "@/types/components/molecules/tableColumn/employee/orders/TableDataInputOfQuantityType";
import { CountableInputOfQuantityType } from "@/types/components/molecules/CountableInputOfQuantityType";
import CountableInputOfQuantity from "@/components/molecules/inputs/countableInputOfQuantity";

const TableDataInputOfQuantity = ({
  id,
  value,
  text,
  incrementFunction,
  decrementFunction,
  width,
}: TableDataInputOfQuantityType): ReactElement => {
  const classNames = `
    px-3 py-3 whitespace-nowrap text-xs text-gray-800
    border-solid border-[#D4CECE] border align-middle ${width}
  `;

  const InputOfQuantityProps: CountableInputOfQuantityType = {
    id: id,
    value: value,
    text: text,
    incrementFunction: incrementFunction,
    decrementFunction: decrementFunction,
  };

  return (
    <td className={classNames}>
      <div className="mt-2 w-fit">
        <CountableInputOfQuantity {...InputOfQuantityProps} />
      </div>
    </td>
  );
};

export default TableDataInputOfQuantity;
