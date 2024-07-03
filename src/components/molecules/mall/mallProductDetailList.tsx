"use client";

import { ReactElement } from "react";
import UnorderedList from "@/components/atoms/list/unorderedList";
import Paragraph from "@/components/atoms/text/paragraph";
import CountableInputOfQuantity from "@/components/molecules/inputs/countableInputOfQuantity";
import { SizeType } from "@/types/alibaba/order/product/sizeType";
import { UUID } from "@/lib/uuid";

const mallProductDetailList = ({
  sizeList,
  unitName,
  handleQuantityOnIncrement,
  handleQuantityOnDecrement,
}: {
  sizeList: SizeType[];
  unitName: string;
  handleQuantityOnIncrement: (skuId: number) => void;
  handleQuantityOnDecrement: (skuId: number) => void;
}): ReactElement => {
  return (
    <UnorderedList>
      {sizeList.map(size => {
        return (
          <li
            key={UUID.generate()}
            className="w-2/3 mt-2 py-1 pr-2 border-0 border-b-[2px] border-dashed border-gray-300"
          >
            <div className="flex justify-between items-center">
              <Paragraph text={size.sizeName} isBold />
              <div>
                <Paragraph text={`${size.price.toLocaleString()}${unitName}`} />
                {/*<Paragraph text="(1,022円)" />*/}
              </div>
              <Paragraph text={`在庫数${size.quantity}件`} />
              <CountableInputOfQuantity
                id={UUID.generate()} value={size.inputtedQuantity}
                incrementFunction={() => handleQuantityOnIncrement(size.skuId)}
                decrementFunction={() => handleQuantityOnDecrement(size.skuId)}
              />
            </div>
          </li>
        );
      })}
    </UnorderedList>
  );
};

export default mallProductDetailList;
