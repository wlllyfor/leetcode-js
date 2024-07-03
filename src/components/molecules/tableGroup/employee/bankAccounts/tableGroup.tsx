import ContentAreaWrapper from "@/components/atoms/div/wrapper/contentAreaWrapper";
import Table from "@/components/atoms/table";
import TableDataText from "@/components/atoms/table/tableDataText";
import TableHeader from "@/components/atoms/table/tableHeader";
import TableRow from "@/components/atoms/table/tableRow";
import { EmployeeAccountDbTableType } from "@/types/db/bankAccounts/EmployeeAccountDbTableType";
import { SupplierDbTableType } from "@/types/db/bankAccounts/SupplierDbTableType";
import { ReactElement, Suspense, useId } from "react";
import { Else, If, Then } from "react-if";

const TableGroup = ({ tableHeadText, items }: {
  tableHeadText: string;
  items: EmployeeAccountDbTableType[] | SupplierDbTableType[] | undefined;
}): ReactElement => {
  const keyId = useId();

  return (
    <ContentAreaWrapper>
      <Table>
        <TableRow>
          <TableHeader text={tableHeadText} />
        </TableRow>
        <If condition={!items || items.length === 0}>
          <Then>
            <TableRow><FallbackRow /></TableRow>
          </Then>
        </If>
        <Else>
          <Suspense fallback={<TableRow><FallbackRow /></TableRow>}>
            {items && items.map((item, index) => (
              <TableRow key={`${keyId}-${index}`}>
                <TableDataText text={item.name} />
              </TableRow>
            ))}
          </Suspense>
        </Else>
      </Table>
    </ContentAreaWrapper>
  );
};

const FallbackRow = (): ReactElement => (
  <>
    <TableDataText text="" />
  </>
);

export default TableGroup;
