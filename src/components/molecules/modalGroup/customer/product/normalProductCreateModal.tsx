"use client";

import { ReactElement } from "react";
import { useStoreToNormalProduct } from "@/hooks/customer/product/useStoreToNormalProduct";
import Error422 from "@/components/molecules/errors/error422";
import InputGroup80 from "@/components/molecules/form/input/inputGroup80";
import InputGroup24 from "@/components/molecules/form/input/inputGroup24";
import InputBarCodeGroup from "@/components/molecules/form/input/inputBarCodeGroup";
import ModalSm from "@/components/atoms/modal/modalSm";
import ContentAreaWrapper from "@/components/atoms/div/wrapper/contentAreaWrapper";
import ModalTitle from "@/components/atoms/modal/modalTitle";
import FormButton from "@/components/atoms/button/formButton";
import InputFileUploadButton from "@/components/molecules/form/input/inputFileUploadButton";
import ModalCloseButton from "@/components/atoms/modal/modalCloseButton";
import Paragraph from "@/components/atoms/text/paragraph";

const NormalProductCreateModal = ({
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
      <ModalTitle text="商品追加 (通常)" />
      <Error422 errors={validationErrors} />
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
          text={"お客様SKU"}
          value={productForStore.sku || ""}
          isRequired
          // changeFunction={handleOnSkuChange}
        />
        <div className="w-80 m-auto">
          <Paragraph
            text="中国拠点に同じSKUのものが存在します。反映するならボタンをクリックしてください。"
            color="6C757D"
            fontSize="10px"
          />
        </div>
      </ContentAreaWrapper>
      <ContentAreaWrapper>
        <InputBarCodeGroup />
      </ContentAreaWrapper>
      <ContentAreaWrapper>
        <div className="relative">
          <InputGroup80
            id={"nameToSlip"}
            text={"品名"}
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
          <div className="absolute left-[3rem] top-[2px]">
            <Paragraph text="送り状に記載される品名となります。例：テント、雑貨など" color="6C757D" fontSize="10px" />
          </div>
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
        </div>
        <div className="w-80 m-auto">
          <Paragraph text="商品金額と原価ををご入力くださいませ。" color="6C757D" fontSize="10px" />
          <Paragraph
            text="国際発送の場合はインボイスの商品金額として利用させて頂く場合がございます。"
            color="6C757D"
            fontSize="10px"
          />
        </div>
      </ContentAreaWrapper>
      <ContentAreaWrapper>
        <div className="pl-[0.65rem]">
          <InputFileUploadButton
            id={"profileImage"} labelText={"写真"} changeFunction={() => {
            }}
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

export default NormalProductCreateModal;
