import TableDataText from "@/components/atoms/table/tableDataText";
import TableDataEnd from "@/components/atoms/table/tableDataEnd";
import FlexWrapperColumn from "@/components/atoms/div/wrapper/flexWrapperColumn";
import TableButton from "@/components/atoms/button/tableButton";
import { ReactElement } from "react";
import { TaxDbTableType } from "@/types/db/tax";

export const TableRowItem = ({ tax, handleOnClickEditLink, handleOnClickDeleteLink }: {
  tax: TaxDbTableType;
  handleOnClickEditLink: (tax: TaxDbTableType) => void;
  handleOnClickDeleteLink: (tax: TaxDbTableType) => void;
}): ReactElement => {
  return (
    <>
      <TableDataText text={tax.name} />
      <TableDataText text={tax.hub.name} />
      <TableDataText text={tax.rate.toString()} />
      <TableDataText text={tax.startedOn} />
      <TableDataEnd>
        <FlexWrapperColumn>
          <TableButton
            text="編集" color="blue" handleClick={(): void => {
              handleOnClickEditLink(tax);
            }}
          />
          <TableButton
            text="削除" color="red" handleClick={(): void => {
              handleOnClickDeleteLink(tax);
            }}
          />
        </FlexWrapperColumn>
      </TableDataEnd>
    </>
  );
};

export default TableRowItem;

export const FallbackRow = (): ReactElement => (
  <>
    <TableDataText text="" />
    <TableDataText text="" />
    <TableDataText text="" />
    <TableDataText text="" />
    <TableDataEnd>
      <FlexWrapperColumn>
        <TableButton
          text="" color="blue" handleClick={(): void => {
            void 0;
          }}
        />
      </FlexWrapperColumn>
    </TableDataEnd>
  </>
);
