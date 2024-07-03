"use client";

import { ReactElement, Suspense } from "react";
import ContentAreaWrapper from "@/components/atoms/div/wrapper/contentAreaWrapper";
import TableHeader from "@/components/atoms/table/tableHeader";
import TableHeaderEnd from "@/components/atoms/table/tableHeaderEnd";
import TableRow from "@/components/atoms/table/tableRow";
import Table from "@/components/atoms/table/table";
import { EmployeeDbTableType } from "@/types/db/employee";
import { Else, If, Then } from "react-if";
import { FallbackRow, TableRowItem } from "@/components/molecules/tableGroup/employee/employees/tableRowItem";
import { HubDbTableType } from "@/types/db/hub";
import { JobPositionDbTableType } from "@/types/db/jobPosition";

const TableGroup = ({ employees, hubs, jobPositions, handleOnClickEditLink }:{
  employees: EmployeeDbTableType[];
  hubs: HubDbTableType[];
  jobPositions: JobPositionDbTableType[];
  handleOnClickEditLink: (employee: EmployeeDbTableType) => void;
}): ReactElement => {
  return (
    <ContentAreaWrapper>
      <Table>
        <TableRow>
          <TableHeader text="スタッフID" />
          <TableHeader text="写真" />
          <TableHeader text="名前" />
          <TableHeader text="名前英語" />
          <TableHeader text="拠点" />
          <TableHeader text="班" />
          <TableHeader text="業務種別" />
          <TableHeader text="備考" />
          <TableHeader text="メールアドレス" />
          <TableHeader text="ステータス" />
          <TableHeader text="入社日" />
          <TableHeaderEnd text="" />
        </TableRow>
        <If condition={employees.length === 0}>
          <Then>
            <TableRow>
              <FallbackRow />
            </TableRow>
          </Then>
          <Else>
            <Suspense fallback={<FallbackRow />}>
              {employees.map(employee => (
                <TableRow key={employee.id}>
                  <TableRowItem
                    employee={employee}
                    hubs={hubs}
                    jobPositions={jobPositions}
                    handleOnClickEditLink={handleOnClickEditLink}
                  />
                </TableRow>
              ))}
            </Suspense>
          </Else>
        </If>
      </Table>
    </ContentAreaWrapper>
  );
};

export default TableGroup;
