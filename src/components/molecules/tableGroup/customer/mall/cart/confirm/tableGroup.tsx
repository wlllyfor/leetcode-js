"use client";

import { ReactElement } from "react";
import ContentAreaWrapper from "@/components/atoms/div/wrapper/contentAreaWrapper";
import TableRow from "@/components/atoms/table/tableRow";
import Table from "@/components/atoms/table/table";
import TableData from "@/components/atoms/table/tableDataText";
import TableDataImage from "@/components/atoms/table/tableDataImage";
import TableDataDeleteIcon from "@/components/atoms/table/tableDataDeleteIcon";
import TableDataImageAndText from "@/components/atoms/table/tableDataImageAndText";
import { CartProductForConfirm } from "@/types/entity/order/cart/customerCartForConfirm";

const TableHeaderGroup = ({
  products,
}: {
  products: CartProductForConfirm[];
}): ReactElement => {

  return (
    <ContentAreaWrapper>
      <Table layout="w-[1400px]">
        {products.map(product => {
          const subTotal = product.quantity * product.customerCart.unitPrice;

          return (
            <TableRow key={product.uuid}>
              <TableDataImage
                imageUrl={product.customerCart.mallProduct.imageUrl ?? "/images/dummy/dummy-image.png"}
                width="w-28"
              />
              <TableData text={product.customerCart.mallProduct.productName} width="w-28" />
              <TableData text={product.customerCart.mallProduct.variation} width="w-40" />
              <TableData text={product.sku ?? ""} width="w-28" />
              <TableData text={"SSSSSS"} width="w-40" />
              <TableData text={product.quantity.toLocaleString()} width="w-28" />
              <TableData text={product.customerCart.unitPrice.toLocaleString()} width="w-28" />
              <TableData text={subTotal.toLocaleString()} width="w-28" />
              <TableDataImageAndText
                // imageUrl={"/images/dummy/dummy-image.png"}
                text={product.publicRemarks}
              />
              <TableDataDeleteIcon
                id="" handleClick={() => {
                }}
              />
            </TableRow>
          );
        })}
      </Table>
    </ContentAreaWrapper>
  );
};

export default TableHeaderGroup;
