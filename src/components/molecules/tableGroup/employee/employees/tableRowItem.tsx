import { ReactElement } from "react";
import TableDataText from "@/components/atoms/table/tableDataText";
import TableDataEnd from "@/components/atoms/table/tableDataEnd";
import FlexWrapperColumn from "@/components/atoms/div/wrapper/flexWrapperColumn";
import TableButton from "@/components/atoms/button/tableButton";
import { EmployeeDbTableType } from "@/types/db/employee";
import TableDataImage from "@/components/atoms/table/tableDataImage";
import { Else, If, Then } from "react-if";
import { HubDbTableType } from "@/types/db/hub";
import { JobPositionDbTableType } from "@/types/db/jobPosition";

export  type EmployeeStatusType = "enrollment" | "retirement" | "suspension";

export const TableRowItem = ({ employee, hubs, jobPositions, handleOnClickEditLink }: {
  employee: EmployeeDbTableType;
  hubs: HubDbTableType[];
  jobPositions: JobPositionDbTableType[];
  handleOnClickEditLink: (employee: EmployeeDbTableType) => void;
}): ReactElement => {

  type EmployeeHubsType = typeof employee.employeeHubs;

  /** 拠点マスタから該当する拠点を返却する */
  const getHubsByEmployeeHubs = (employeeHubs: EmployeeHubsType): HubDbTableType[] => {
    return employeeHubs
      .map(employeeHub => hubs.find(hub => hub.id === employeeHub.hubId))
      .filter((matchedHub): matchedHub is HubDbTableType => matchedHub !== undefined);
  };

  /** テーブルに表示する用の拠点名取得 */
  const getHubNames = (employeeHubs: EmployeeHubsType): string => {
    return getHubsByEmployeeHubs(employeeHubs).map(hub => hub.name).join("\n");
  };

  /**
   * テーブルに表示する班名取得。該当しなければ - を表示する。
   * （複数拠点登録しても班が存在しない場合テーブルが崩れるため。）
   */
  const getHubGroupNames = (employeeHubs: EmployeeHubsType): string => {
    const filteredEmployeeHubs = getHubsByEmployeeHubs(employeeHubs);
    const narrowGroups = filteredEmployeeHubs.map(hub => hub.groups);

    const narrowResult = employeeHubs.map(employeeHub => {
      return narrowGroups.map(groups => {
        return groups.filter(group => group.id === employeeHub.groupId);
      }).flat();
    });

    return narrowResult.map(arr => {
      if(arr.length === 0) { return "-"; }
      return arr.map(a => a.name || "-");
    }).flat().join("\n");
  };

  /** テーブルに表示する業務種別取得 */
  const getHubJobPositions = (employeeHubs: EmployeeHubsType): string => {
    // jobPositionsのhubIdと、employeeHubsのhubIdが一致するものを取得する
    const filteredPositions = employeeHubs.map(employeeHub => {
      return jobPositions.filter(jobPosition => {
        return jobPosition.hubId === employeeHub.hubId && jobPosition.id === employeeHub.jobPositionId;
      });
    });

    return filteredPositions.map(positions => positions.map(p => p.name)).join("\n");
    ;
  };

  /** テーブルに表示するステータス取得 */
  const getEmployeeStatus = (hubs: EmployeeHubsType): string => {
    return hubs?.map(hub => hub.employeeStatusLabel).join("\n");
  };

  return (
    <>
      <TableDataText text={employee.id.toString()} />
      <If condition={employee.profileImageUrl}>
        <Then>
          <TableDataImage imageUrl={employee.profileImageUrl} text={`スタッフの写真`} />
        </Then>
        <Else>
          <TableDataText text={""} />
        </Else>
      </If>
      <TableDataText text={employee.name} />
      <TableDataText text={employee.nameKana ?? ""} />
      <TableDataText text={getHubNames(employee.employeeHubs)} />
      <TableDataText text={getHubGroupNames(employee.employeeHubs)} />
      <TableDataText text={getHubJobPositions(employee.employeeHubs)} />
      <TableDataText text={employee.publicRemarks} />
      <TableDataText text={employee.email} />
      <TableDataText text={getEmployeeStatus(employee.employeeHubs)} />
      <TableDataText text={employee.joinedOn} />
      <TableDataEnd>
        <FlexWrapperColumn>
          <TableButton
            text="編集" color="blue" handleClick={(): void => {
              handleOnClickEditLink(employee);
            }}
          />
        </FlexWrapperColumn>
      </TableDataEnd>
    </>
  );
};

export const FallbackRow = (): ReactElement => (
  <>
    <TableDataText text="" />
    <TableDataText text="" />
    <TableDataText text="" />
    <TableDataText text="" />
    <TableDataText text="" />
    <TableDataText text="" />
    <TableDataText text="" />
    <TableDataText text="" isMemoButton />
    <TableDataText text="" />
    <TableDataText text="" />
    <TableDataText text="" />
    <TableDataEnd>
      <FlexWrapperColumn>
        <TableButton text="編集" color="blue" handleClick={() => void 0} />
      </FlexWrapperColumn>
    </TableDataEnd>
  </>
);
