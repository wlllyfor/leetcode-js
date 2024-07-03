"use client";

import { ReactElement, useId, useState } from "react";
import Image from "next/image";
import ContentAreaWrapper from "@/components/atoms/div/wrapper/contentAreaWrapper";
import FlexWrapper from "@/components/atoms/div/wrapper/flexWrapper";
import InputGroup44 from "@/components/molecules/form/input/inputGroup44";
import ModalClickableButton from "@/components/atoms/button/modalClickableButton";
import FileUploadIconTextareaGroup from "@/components/molecules/form/textarea/fileUploadIconTextareaGroup";
import SearchSelect from "@/components/molecules/search/customer/receiveStocks/searchSelect";
import Paragraph from "@/components/atoms/text/paragraph";
import { ReactSelectOption } from "@/types/reactSelectOptions/ReactSelectOption";

const ModalItem = (): ReactElement => {
  const inputId = useId();
  const [ contentCount, setContentCount ] = useState<number>(1);
  const handleClick = () => {
    setContentCount(contentCount + 1);
  };
  const options1 = [
    /* ステータスの選択肢 */
    { value: "A", label: "通常商品" },
    { value: "B", label: "amazon商品" },
    { value: "C", label: "備品" },
  ];
  const options2: ReactSelectOption[] = [
    /* ステータスの選択肢 */
    { value: "A", label: "通常商品" },
    { value: "B", label: "amazon商品" },
    { value: "C", label: "備品" },
  ];
  const FormatOptionLabel = ({ option }: { option: ReactSelectOption[]; }) => (
    <>
      <div className="flex gap-1">
        <span className="bg-[#26B5E3] text-white text-[8px] px-1 py-0.5 text-left rounded-md block mt-1">通常商品</span>
        <span className="bg-[#6C757D] text-white text-[8px] px-1 py-0.5 text-left rounded-md block mt-1">
          SKU: 111111
        </span>
        <span className="bg-[#6C757D] text-white text-[8px] px-1 py-0.5 text-left rounded-md block mt-1">
          JAN: 111111
        </span>
        <span className="bg-[#6C757D] text-white text-[8px] px-1 py-0.5 text-left rounded-md block mt-1">
          商品ID:YP2-14
        </span>
      </div>
      <div className="flex mt-1">
        <Image src="/images/dummy/dummy-image.png" alt="商品名の画像" width={50} height={20} />
        <div className="ml-2">
          <Paragraph text={"商品名が入ります。"} fontSize="12px" />
        </div>
      </div>
    </>
  );

  FormatOptionLabel.displayName = "FormatOptionLabel";

  return (
    <>
      <div className="mb-8">
        <ModalClickableButton color="lightblue" text="追加" onClick={handleClick} />
      </div>
      {Array.from({ length: contentCount }, (_, index) => (
        <ContentAreaWrapper key={index}>
          <FlexWrapper>
            <SearchSelect
              value={options1}
              isMulti
              labelText={"商品で検索"}
              options={options1}
              formatOptionLabel={option2 => <FormatOptionLabel option={options2} />}
              placeholder={"商品名、SKU,バーコード情報（FNSKU、JAN）商品ID"}
            />
            <InputGroup44 id={`${inputId}-quantity`} text={"数量"} value={""} />
            <button type="button" className="cursor-pointer p-1">
              <Image src="/images/icon/icon_cross_large.svg" alt="" width={25} height={25} />
            </button>
          </FlexWrapper>
        </ContentAreaWrapper>
      ))}
      <ContentAreaWrapper>
        <InputGroup44 id={`${inputId}-tracking-number`} text={"追跡番号"} value={""} isRequired />
      </ContentAreaWrapper>
      <ContentAreaWrapper>
        <FileUploadIconTextareaGroup
          textareaId={`${inputId}-file-memo`} inputFileUploadIconId={"file"}
          labelText={"備考"} rows={3} value={""}
        />
      </ContentAreaWrapper>
    </>
  );
};

export default ModalItem;
