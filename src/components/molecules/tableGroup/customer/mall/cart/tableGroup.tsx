"use client";

import { ChangeEvent, ReactElement, useId, useState } from "react";
import ContentAreaWrapper from "@/components/atoms/div/wrapper/contentAreaWrapper";
import TableRow from "@/components/atoms/table/tableRow";
import Table from "@/components/atoms/table/table";
import TableDataCheckbox from "@/components/molecules/tableColumn/employee/orders/tableDataCheckbox";
import TableData from "@/components/atoms/table/tableDataText";
import TableDataImage from "@/components/atoms/table/tableDataImage";
import TableDataDeleteIcon from "@/components/atoms/table/tableDataDeleteIcon";
import TableDataTextsWithButton from "@/components/molecules/tableColumn/employee/orders/tableDataTextsWithButton";
import TableDataInput from "@/components/molecules/tableColumn/employee/orders/tableDataInput";
import TableDataInputOfQuantity from "@/components/molecules/tableColumn/employee/orders/tableDataInputOfQuantity";
import TableDataFileUploadIcon from "@/components/molecules/tableColumn/employee/orders/tableDataFileUploadIcon";
import TableHeadMallName from "@/components/molecules/tableColumn/employee/orders/tableHeadMallName";
import VariationChangeModal from "@/components/molecules/modalGroup/customer/order/cart/variationChangeModal";
import { If, Then } from "react-if";
import { CartProductForConfirm } from "@/types/entity/order/cart/customerCartForConfirm";

const TableHeaderGroup = ({
  cartProductForConfirm,
  handleMallHeaderCheckOnClick,
  handleCheckedProductOnClick,
  handleSkuOnChange,
  handleQuantityOnIncrement,
  handleQuantityOnDecrement,
  handleRemarksOnChange,
}: {
  cartProductForConfirm: CartProductForConfirm;
  handleMallHeaderCheckOnClick: (
    e: ChangeEvent<HTMLInputElement>,
    cartProductForConfirm: CartProductForConfirm,
  ) => void;
  handleCheckedProductOnClick: (e: ChangeEvent<HTMLInputElement>, uuid: string) => void;
  handleSkuOnChange: (e: ChangeEvent<HTMLInputElement>, uuid: string) => void;
  handleQuantityOnIncrement: (uuid: string) => void;
  handleQuantityOnDecrement: (uuid: string) => void;
  handleRemarksOnChange: (e: ChangeEvent<HTMLTextAreaElement>, uuid: string) => void;
}): ReactElement => {
  const id = useId();

  const [ isModalOpen, setIsModalOpen ] = useState<boolean>(false);

  const openModal = () => {
    setIsModalOpen(prev => true);
  };
  const closeModal = () => {
    setIsModalOpen(prev => false);
  };

  return (
    <>
      <ContentAreaWrapper>
        <Table layout="w-[1400px]">
          <If condition={cartProductForConfirm.customerCart.mallToShowHeader}>
            <Then>
              <TableHeadMallName
                id={`${id}-id`}
                defaultChecked={false}
                handleCheckboxOnChange={(e: ChangeEvent<HTMLInputElement>): void => {
                  handleMallHeaderCheckOnClick(e, cartProductForConfirm);
                }}
                customerCart={cartProductForConfirm.customerCart}
              />
            </Then>
          </If>

          <TableRow>
            <TableDataCheckbox
              id={`${id}-checkbox`}
              checked={cartProductForConfirm.checked}
              width="w-14"
              minWidth="min-w-14"
              onChange={e => handleCheckedProductOnClick(e, cartProductForConfirm.uuid)}
            />
            <TableDataImage imageUrl={cartProductForConfirm.customerCart.mallProduct.imageUrl} width="w-28" />
            <TableData text={cartProductForConfirm.customerCart.mallProduct.productName} width="w-28" />
            <TableDataTextsWithButton
              texts={[
                cartProductForConfirm.customerCart.mallProduct.variation,
                cartProductForConfirm.customerCart.mallProduct.size,
              ]}
              buttonText="変更"
              handleClick={openModal}
              width="w-40"
            />
            <TableDataInput
              id=""
              value={cartProductForConfirm.sku}
              width="w-40"
              onChange={e => handleSkuOnChange(e, cartProductForConfirm.uuid)}
            />
            <TableData text={"SSSSSSS"} width="w-40" />
            <TableDataInputOfQuantity
              id={""}
              width="w-28"
              value={cartProductForConfirm.customerCart.quantity}
              incrementFunction={() => handleQuantityOnIncrement(cartProductForConfirm.uuid)}
              decrementFunction={() => handleQuantityOnDecrement(cartProductForConfirm.uuid)}
            />
            <TableData text={cartProductForConfirm.customerCart.unitPrice.toLocaleString()} width="w-28" />
            <TableData
              text={(
                cartProductForConfirm.customerCart.unitPrice * cartProductForConfirm.customerCart.quantity
              ).toLocaleString()}
              width="w-28"
            />
            <TableDataFileUploadIcon
              width="w-56"
              textareaId=""
              inputFileUploadIconId=""
              value={cartProductForConfirm.publicRemarks}
              rows={3}
              onChange={e => {
                handleRemarksOnChange(e, cartProductForConfirm.uuid);
              }}
              labelText={""}
            />
            <TableDataDeleteIcon
              id="" handleClick={() => {
              }}
            />
          </TableRow>
        </Table>
      </ContentAreaWrapper>
      <VariationChangeModal isOpen={isModalOpen} handleClose={closeModal} />
    </>
  );
};

export default TableHeaderGroup;
