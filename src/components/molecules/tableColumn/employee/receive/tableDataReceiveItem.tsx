"use client";

import React, { ReactElement } from "react";
import NormalClickableButton from "@/components/atoms/button/normalClickableButton";
import Input from "@/components/atoms/form/input";
import { TableDataReceiveItemType } from "@/types/components/molecules/tableColumn/employee/receive/TableDataReceiveItemType";

const tableDataReceiveItem = ({ text, width, clickFunction, isDisable }: TableDataReceiveItemType): ReactElement => {
  const classNames = `
    px-3 py-3 whitespace-nowrap text-xs text-gray-800 text-[10px]
    border-solid border-[#D4CECE] border align-middle ${width}
  `;

  return (
    <td className={classNames}>
      {/* <div className="">
            <Input
              value={entity.receiveStockQuantity}
              changeFunction={e => {
                handleOnChangeReceiveQuantities(e, entity.receiveStockDetail.uuid);
              }}
            />
            <div className={commonClasses.ml_10}>
              <SmallButton
                text={"入庫"}
                isGreen
                clickFunction={(): void => {
                  setReceiveStockForReceive(prevState => {
                    return {
                      ...prevState,
                      id: entity.receiveStockDetail.id,
                      quantity: entity.receiveStockQuantity,
                    };
                  });
                }}
                isDisable={isDisable}
              />
            </div>
          </div> */}
      <div className="flex gap-1">
        <Input id="" value="" onChange={() => {}} isRequired={false} isDisabled={false} isAutocomplete={false} />
        <div className="">
          <NormalClickableButton
            text={"入庫"}
            color="lightblue"
            pxSize="1"
            fontSize="11px"
            // clickFunction={(): void => {
            //   setReceiveStockForReceive((prevState) => {
            //     return {
            //       ...prevState,
            //       id: entity.receiveStockDetail.id,
            //       quantity: entity.receiveStockQuantity,
            //     };
            //   });
            // }}
            onClick={() => {}}
            disabled={isDisable}
          />
        </div>
      </div>
    </td>
  );
};

export default tableDataReceiveItem;
