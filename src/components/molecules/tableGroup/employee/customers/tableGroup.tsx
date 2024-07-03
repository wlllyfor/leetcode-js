"use client";

import { ReactElement } from "react";
import ContentAreaWrapper from "@/components/atoms/div/wrapper/contentAreaWrapper";
import FlexWrapperColumn from "@/components/atoms/div/wrapper/flexWrapperColumn";
import TableHeader from "@/components/atoms/table/tableHeader";
import TableHeaderTexts from "@/components/atoms/table/tableHeaderTexts";
import TableHeaderEnd from "@/components/atoms/table/tableHeaderEnd";
import TableRow from "@/components/atoms/table/tableRow";
import Table from "@/components/atoms/table/table";
import TableDataText from "@/components/atoms/table/tableDataText";
import TableDataTexts from "@/components/atoms/table/tableDataTexts";
import TableDataEnd from "@/components/atoms/table/tableDataEnd";
import TableButton from "@/components/atoms/button/tableButton";
import { TableGroupType } from "@/types/components/molecules/tableGroup/employee/customers/TableGroupType";
import { UUID } from "@/lib/uuid";


const TableGroup = ({
  customers,
  handleEditButtonOnClick,
}: TableGroupType): ReactElement => {
  const accountHeaderTexts = [ "顧客ID", "銀行名", "支店名", "専用口座" ];
  const nameHeaderTexts = [ "氏名", "ローマ字", "会社" ];
  const idHeaderTexts = [ "chatworkID", "メールアドレス" ];


  return (
    <ContentAreaWrapper>
      <Table>
        <TableRow>
          <TableHeaderTexts texts={accountHeaderTexts} />
          <TableHeaderTexts texts={nameHeaderTexts} />
          <TableHeader
            text="拠点,班,担当者,プラン,プラン加入日,最終引落日,無課金設定,chatworkグループId,会員ステータス"
          />
          <TableHeaderTexts texts={idHeaderTexts} />
          <TableHeader text="国" />
          <TableHeader text="郵便番号" />
          <TableHeader text="州・省・都道府県" />
          <TableHeader text="市区群町村" />
          <TableHeader text="番地" />
          <TableHeader text="建物名・部屋番号" />
          <TableHeader text="TEL" />
          <TableHeader text="個別料金設定(PH3)" textColor={"text-[#CCCCCC]"} />
          <TableHeader text="管理メモ" />
          <TableHeaderEnd text="" />
        </TableRow>

        {/* ここからメイン行 */}
        {customers.map(customer => {
          const customerIdString = `YP-${customer.id}`;

          const customerPlanStrings = customer.customerPlans.map(customerPlan => {
            const hubName = customerPlan.plan.hub.name;
            const groupName = customerPlan.group?.name ?? "";
            const employeeName = customerPlan.employee?.name ?? "";
            const planName = customerPlan.plan.name;
            const createdOn = customerPlan.plan.createdOn;
            const lastPaidAt = customerPlan.lastPaidAt;
            const isFree = customerPlan.isFree;
            const chatWorkId = customerPlan.chatWorkId;
            const statusLabel = customerPlan.statusLabel;
            return [
              hubName, groupName, employeeName, planName, createdOn, lastPaidAt, isFree ? "有料設定" : "無課金設定", chatWorkId, statusLabel,
            ].join(",");

          });

          return (
            <TableRow key={UUID.generate()}>
              <TableDataTexts texts={[
                customerIdString,
                customer.dedicatedAccount?.bankName ?? "",
                customer.dedicatedAccount?.branchName ?? "",
                customer.dedicatedAccount?.accountNumber ?? "",
              ]}
              />
              <TableDataTexts texts={[
                customer.name ?? "",
                customer.nameKana ?? "",
                customer.companyName ?? "",
              ]}
              />
              <TableDataTexts
                texts={customerPlanStrings}
              />
              <TableDataTexts texts={[
                customer.chatWorkId,
                customer.email,
              ]}
              />
              <TableDataText text={customer.country?.name} />
              <TableDataText text={customer.postalCode} />
              <TableDataText text={customer.prefectureName} />
              <TableDataText text={customer.cityName} />
              <TableDataText text={customer.townName} />
              <TableDataText text={customer.buildingName} />
              <TableDataText text={customer.tel} />
              <TableDataText text="あり：日本" textColor={"text-[#CCCCCC]"} />
              <TableDataText text={customer.privateRemarks} />
              <TableDataEnd>
                <FlexWrapperColumn>
                  <TableButton text="編集" color="blue" handleClick={handleEditButtonOnClick} />
                </FlexWrapperColumn>
              </TableDataEnd>
            </TableRow>

          );
        })}
      </Table>
    </ContentAreaWrapper>
  );
};

export default TableGroup;
