"use client";

import { ReactElement, useId } from "react";
import Link from "next/link";
import TableRow from "@/components/atoms/table/tableRow";
import Table from "@/components/atoms/table/table";
import FlexWrapper from "@/components/atoms/div/wrapper/flexWrapper";
import ModalTableHeader from "@/components/atoms/modal/modalTableHeader";
import ModalTableDataText from "@/components/atoms/modal/modalTableDataText";
import ModalTableDataImage from "@/components/atoms/modal/modalTableDataImage";
import ContentAreaWrapper from "@/components/atoms/div/wrapper/contentAreaWrapper";
import ModalClickableButton from "@/components/atoms/button/modalClickableButton";
import Label from "@/components/atoms/form/label";
import Paragraph from "@/components/atoms/text/paragraph";
import SelectGroup56 from "@/components/molecules/form/select/selectGroup56";
import InputGroup56 from "@/components/molecules/form/input/inputGroup56";
import AddressGroup from "@/components/molecules/form/input/addressGroup";
import FileUploadIconTextareaGroup from "@/components/molecules/form/textarea/fileUploadIconTextareaGroup";
import InputRadio from "@/components/molecules/form/input/inputRadio";
import { ReactSelectOption } from "@/types/reactSelectOptions/ReactSelectOption";

const ShippingOrderModalItem = (): ReactElement => {
  const inputId = useId();
  const handleClick = () => {
    alert("配送元反映ボタン");
  };

  const options1: ReactSelectOption[] = [
    /* 国の選択肢 */
    { value: "A", label: "A" },
    { value: "B", label: "B" },
    { value: "C", label: "C" },
  ];
  return (
    <>
      <ContentAreaWrapper>
        <Table>
          <TableRow>
            <ModalTableHeader text="モール注文ID" minWidth="min-w-28" />
            <ModalTableHeader text="商品名" minWidth="min-w-24" />
            <ModalTableHeader text="お客様SKU" minWidth="min-w-28" />
            <ModalTableHeader text="写真" minWidth="min-w-24" />
            <ModalTableHeader text="バリエーション" minWidth="min-w-32" />
            <ModalTableHeader text="数量" minWidth="min-w-24" isRequired />
          </TableRow>
          <TableRow>
            <ModalTableDataText text="1111111" isFormatNumber />
            <ModalTableDataText text="商品名" />
            <ModalTableDataText text="1111111" />
            <ModalTableDataImage imageUrl={"/images/dummy/dummy-image.png"} />
            <ModalTableDataText text="black" />
            <ModalTableDataText text="10" />
          </TableRow>
          <TableRow>
            <ModalTableDataText text="1111111" isFormatNumber />
            <ModalTableDataText text="商品名" />
            <ModalTableDataText text="1111111" />
            <ModalTableDataImage imageUrl={"/images/dummy/dummy-image.png"} />
            <ModalTableDataText text="black" />
            <ModalTableDataText text="10" />
          </TableRow>
          <TableRow>
            <ModalTableDataText text="1111111" isFormatNumber />
            <ModalTableDataText text="商品名" />
            <ModalTableDataText text="1111111" />
            <ModalTableDataImage imageUrl={"/images/dummy/dummy-image.png"} />
            <ModalTableDataText text="black" />
            <ModalTableDataText text="10" />
          </TableRow>
        </Table>
      </ContentAreaWrapper>
      <ContentAreaWrapper>
        <FlexWrapper>
          <SelectGroup56 options={options1} text={"配送先"} isRequired />
          <div className="mt-[20px]">
            <ModalClickableButton color="blue" text="配送元反映反映" onClick={handleClick} isAddIcon />
          </div>
        </FlexWrapper>
      </ContentAreaWrapper>
      <div className="max-w-56">
        <AddressGroup
          title={"配送先住所"} options={[]} changeAddressFunction={() => {
          }}
        />
      </div>
      <ContentAreaWrapper>
        <FlexWrapper>
          <SelectGroup56 options={options1} text={"配送元"} isRequired />
          <div className="mt-[20px]">
            <ModalClickableButton color="blue" text="配送元反映反映" onClick={handleClick} isAddIcon />
          </div>
        </FlexWrapper>
      </ContentAreaWrapper>
      <ContentAreaWrapper>
        <FlexWrapper>
          <SelectGroup56 options={options1} text={"インポーター住所"} isRequired />
          <div className="mt-[20px]">
            <ModalClickableButton color="blue" text="住所反映" onClick={handleClick} isAddIcon />
          </div>
        </FlexWrapper>
        <Paragraph text="* 81日本🇯🇵340-0022東京都台東区上野4-4-4　◯◯ビル２F　株式会社◯◯　山田太郎　taro yamada" />
        <Paragraph text="* 03-1111-1111" />
        <Paragraph text="yiwupassport.com" />
      </ContentAreaWrapper>
      <ContentAreaWrapper>
        <Label text={"関税支払い方法"} isRequired />
        <FlexWrapper>
          <InputRadio
            name="radioGroup"
            fontSize={"14px"}
            options={[
              { id: "account", text: "請求書払い" },
              { id: "sales", text: "リアルタイム口座" },
            ]}
          />
        </FlexWrapper>
      </ContentAreaWrapper>
      <ContentAreaWrapper>
        <FlexWrapper>
          <SelectGroup56 options={options1} text={"リアルタイム口座"} isRequired />
          <div className="mt-[20px]">
            <ModalClickableButton color="blue" text="口座反映" onClick={handleClick} isAddIcon />
          </div>
        </FlexWrapper>
        <Link href={""} className="underline decoration-1 text-[13px]">リアルタイム口座の開設はこちら</Link>
      </ContentAreaWrapper>
      <ContentAreaWrapper>
        <InputGroup56
          id={`${inputId}-account-financial-facility-code`} text={"口座金融機関コード"} value={""}
          isRequired
        />
      </ContentAreaWrapper>
      <ContentAreaWrapper>
        <InputGroup56 id={`${inputId}-account-branch-office-code`} text={"口座支店コード"} value={""} isRequired />
      </ContentAreaWrapper>
      <ContentAreaWrapper>
        <InputGroup56 id={`${inputId}-bank-account-number`} text={"口座番号"} value={""} isRequired />
      </ContentAreaWrapper>
      <ContentAreaWrapper>
        <InputGroup56 id={`${inputId}-imported-person-standard-code`} text={"輸入者標準コード"} value={""} isRequired />
      </ContentAreaWrapper>
      <ContentAreaWrapper>
        <InputGroup56 id={`${inputId}-transport-company`} text={"運送会社"} value={""} />
      </ContentAreaWrapper>
      <ContentAreaWrapper>
        <FileUploadIconTextareaGroup
          textareaId={`${inputId}-file`} inputFileUploadIconId={"file"} labelText={"備考"}
          rows={3} value={""}
        />
      </ContentAreaWrapper>
    </>
  );
};

export default ShippingOrderModalItem;
