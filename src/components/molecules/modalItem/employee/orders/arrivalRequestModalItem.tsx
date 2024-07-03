"use client";

import { ReactElement, useId } from "react";
import TableRow from "@/components/atoms/table/tableRow";
import Table from "@/components/atoms/table/table";
import ModalTableHeader from "@/components/atoms/modal/modalTableHeader";
import ModalTableDataText from "@/components/atoms/modal/modalTableDataText";
import ModalTableDataImage from "@/components/atoms/modal/modalTableDataImage";
import ContentAreaWrapper from "@/components/atoms/div/wrapper/contentAreaWrapper";
import InputGroup44 from "@/components/molecules/form/input/inputGroup44";
import FileUploadIconTextareaGroup from "@/components/molecules/form/textarea/fileUploadIconTextareaGroup";

const ArrivalRequestModalItem = (): ReactElement => {
  const inputId = useId();

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
        <InputGroup44 id={`${inputId}-track-number`} text={"追跡番号"} value={""} />
      </ContentAreaWrapper>
      <ContentAreaWrapper>
        <FileUploadIconTextareaGroup
          textareaId={`${inputId}-public-remarks`} inputFileUploadIconId={"file"} labelText={"備考"}
          rows={3} value={""}
        />
      </ContentAreaWrapper>
      <ContentAreaWrapper>
        <FileUploadIconTextareaGroup
          textareaId={`${inputId}-private-remarks`} inputFileUploadIconId={"file"} labelText={"管理メモ"}
          rows={3} value={""}
        />
      </ContentAreaWrapper>
    </>
  );
};

export default ArrivalRequestModalItem;
