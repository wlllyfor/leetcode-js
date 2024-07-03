"use client";

import { ReactElement, memo } from "react";
import { useStoreToNormalProduct } from "@/hooks/customer/product/useStoreToNormalProduct";
import Error422 from "@/components/molecules/errors/error422";
import InputGroup80 from "@/components/molecules/form/input/inputGroup80";
import SelectGroup80 from "@/components/molecules/form/select/selectGroup80";
import ProductsSelectGroup from "@/components/molecules/form/select/productsSelectGroup";
import InputGroup24 from "@/components/molecules/form/input/inputGroup24";
import InputBarCodeGroup from "@/components/molecules/form/input/inputBarCodeGroup";
import ModalSm from "@/components/atoms/modal/modalSm";
import ContentAreaWrapper from "@/components/atoms/div/wrapper/contentAreaWrapper";
import ModalTitle from "@/components/atoms/modal/modalTitle";
import FormButton from "@/components/atoms/button/formButton";
import ModalCloseButton from "@/components/atoms/modal/modalCloseButton";
import Paragraph from "@/components/atoms/text/paragraph";
import { ReactSelectOption } from "@/types/reactSelectOptions/ReactSelectOption";
import Image from "next/image";
import ModalClickableButton from "@/components/atoms/button/modalClickableButton";

const CaseProductCreateModal = ({
  hubCode,
  activeProductTypeTab,
  isOpen,
  handleOnCloseButtonClick,
  // handleOnClickStoreButton,
}: {
  hubCode: string;
  activeProductTypeTab: string;
  isOpen: boolean;
  handleOnCloseButtonClick: () => void;
  handleOnClickStoreButton: () => void;
}): ReactElement => {
  const {
    postProduct,
    productForStore,
    // setProductForStore,
    // isStored,
    // setIsStored,
    validationErrors,
    // setValidationErrors,
  } = useStoreToNormalProduct(hubCode, activeProductTypeTab);

  const options: ReactSelectOption[] = [
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

  const FormatOptionLabel = memo(({ option }: { option: ReactSelectOption[]; }) => (
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
  ));

  FormatOptionLabel.displayName = "FormatOptionLabel";

  // useEffect((): void => {
  //   if (isOpen) {
  //     setProductForStore(prevState => {
  //       return {
  //         name: "",
  //         sku: "",
  //         janCode: "",
  //         nameToSlip: "",
  //         unitPrice: 0,
  //       };
  //     });
  //     setValidationErrors(prevState => []);
  //     setIsStored(prevState => false);
  //   }
  // }, [ isOpen, setProductForStore, setValidationErrors, setIsStored ]);

  // useEffect((): void => {
  //   if (isOpen && isStored) {
  //     handleOnClickStoreButton();
  //   }
  // }, [ isStored, handleOnClickStoreButton, isOpen ]);

  // /**
  //  * 商品名変更イベント
  //  * @param e
  //  */
  // const handleOnNameChange = (e: ChangeEvent<HTMLInputElement>): void => {
  //   setProductForStore(prevState => {
  //     return {
  //       ...prevState,
  //       name: e.target.value,
  //     };
  //   });
  // };

  // /**
  //  * SKU変更イベント
  //  * @param e
  //  */
  // const handleOnSkuChange = (e: ChangeEvent<HTMLInputElement>): void => {
  //   setProductForStore(prevState => {
  //     return {
  //       ...prevState,
  //       sku: e.target.value,
  //     };
  //   });
  // };

  // /**
  //  * JanCode変更イベント
  //  * @param e
  //  */
  // const handleOnJanCodeChange = (e: ChangeEvent<HTMLInputElement>): void => {
  //   setProductForStore(prevState => {
  //     return {
  //       ...prevState,
  //       janCode: e.target.value,
  //     };
  //   });
  // };

  // /**
  //  * 品名変更イベント
  //  * @param e
  //  */
  // const handleOnNameToSlipChange = (e: ChangeEvent<HTMLInputElement>): void => {
  //   setProductForStore(prevState => {
  //     return {
  //       ...prevState,
  //       nameToSlip: e.target.value,
  //     };
  //   });
  // };

  // /**
  //  * 単価変更イベント
  //  * @param e
  //  */
  // const handleOnUnitPriceChange = (e: ChangeEvent<HTMLInputElement>): void => {
  //   setProductForStore(prevState => {
  //     return {
  //       ...prevState,
  //       unitPrice: Integer.parseIntExceptZero(e.target.value),
  //     };
  //   });
  // };

  return (
    <ModalSm isOpen={isOpen} onRequestClose={handleOnCloseButtonClick}>
      <ModalTitle text="商品マスタ追加 (ケース商品)" />
      <Error422 errors={validationErrors} />
      <ContentAreaWrapper>
        <div className="w-80 m-auto">
          <Paragraph text="注文ID：YP2-O2" fontSize="12px" isBold />
        </div>
      </ContentAreaWrapper>
      <ContentAreaWrapper>
        <InputGroup80
          id={"name"}
          text={"商品名"}
          value={productForStore.name}
          isRequired
          // changeFunction={handleOnNameChange}
        />
      </ContentAreaWrapper>
      <ContentAreaWrapper>
        <InputGroup80
          id={"sku"}
          text={"SKU"}
          value={productForStore.sku || ""}
          isRequired
          // changeFunction={handleOnSkuChange}
        />
        <div className="w-80 flex justify-between m-auto">
          <div className="w-64">
            <Paragraph
              text="中国拠点に同じSKUのものが存在します。反映するならボタンをクリックしてください。"
              color="6C757D"
              fontSize="10px"
            />
          </div>
          <ModalClickableButton text="反映" color="blue" onClick={() => {}} />
        </div>
      </ContentAreaWrapper>
      <ContentAreaWrapper>
        <InputBarCodeGroup />
      </ContentAreaWrapper>
      <ContentAreaWrapper>
        <InputGroup80
          id={"nameToSlip"}
          text={"品名(12文字以内)"}
          value={productForStore.nameToSlip || ""}
          // changeFunction={handleOnNameToSlipChange}
        />
        <div className="w-80 m-auto">
          <Paragraph
            text="12文字以内。指定しない場合は商品名の先頭10文字が品名になります。"
            color="6C757D"
            fontSize="10px"
          />
        </div>
      </ContentAreaWrapper>
      <ContentAreaWrapper>
        <SelectGroup80
          id={"nameToSlip"}
          text={"商品種別"}
          options={options}
          // value={productForStore.nameToSlip || ""}
          // changeFunction={handleOnNameToSlipChange}
        />
      </ContentAreaWrapper>
      <ContentAreaWrapper>
        <div className="flex gap-2 w-80 m-auto">
          <ProductsSelectGroup
            options={options}
            isMulti={false}
            formatOptionLabel={option2 => <FormatOptionLabel option={options2} />}
            value={options}
            // value={productForStore.nameToSlip || ""}
            // changeFunction={handleOnNameToSlipChange}
          />
        </div>
      </ContentAreaWrapper>
      <ContentAreaWrapper>
        <div className="pl-[0.65rem]">
          <InputGroup24
            id={"unitPrice"}
            text={"単価"}
            value={productForStore.unitPrice.toString()}
            // changeFunction={handleOnUnitPriceChange}
          />
          <Paragraph text="商品金額と原価ををご入力くださいませ。" color="6C757D" fontSize="10px" />
          <Paragraph
            text="国際発送の場合はインボイスの商品金額として利用させて頂く場合がございます。"
            color="6C757D"
            fontSize="10px"
          />
        </div>
      </ContentAreaWrapper>
      <div className="text-center">
        <FormButton text={"商品を追加する"} color={"green"} onClick={postProduct} />
      </div>
      <ModalCloseButton handleClose={handleOnCloseButtonClick} />
    </ModalSm>
  );
};

export default CaseProductCreateModal;
