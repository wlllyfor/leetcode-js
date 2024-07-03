"use client";

import { ReactElement } from "react";
import { useUpdate } from "@/hooks/customer/product/useUpdate";
import InputGroup80 from "@/components/molecules/form/input/inputGroup80";
import InputGroup24 from "@/components/molecules/form/input/inputGroup24";
import ModalSm from "@/components/atoms/modal/modalSm";
import ContentAreaWrapper from "@/components/atoms/div/wrapper/contentAreaWrapper";
import ModalTitle from "@/components/atoms/modal/modalTitle";
import InputAndLabel from "@/components/molecules/inputs/inputAndLabel";
import FormButton from "@/components/atoms/button/formButton";
import InputFileUploadButton from "@/components/molecules/form/input/inputFileUploadButton";
import ModalCloseButton from "@/components/atoms/modal/modalCloseButton";
// import { ProductDbTableType } from "@/types/db/product/product";
import Error422 from "@/components/molecules/errors/error422";

const NormalProductEditModal = ({
  // prevProduct,
  isOpen,
  handleOnCloseButtonClick,
  handleOnClickUpdateButton,
}: {
  // prevProduct: ProductDbTableType;
  isOpen: boolean;
  handleOnCloseButtonClick: () => void;
  handleOnClickUpdateButton: () => void;
}): ReactElement => {
  const {
    // putProduct,
    productForUpdate,
    // setProductForUpdate,
    // isUpdated,
    // setIsUpdated,
    validationErrors,
    // setValidationErrors,
  } = useUpdate();

  // useEffect((): void => {
  //   if (isOpen && prevProduct) {
  //     setProductForUpdate(prevState => {
  //       return {
  //         name: prevProduct.name ?? "",
  //         sku: prevProduct.sku ?? "",
  //         janCode: prevProduct.janCode ?? "",
  //         nameToSlip: prevProduct.nameToSlip ?? "",
  //         unitPrice: prevProduct.unitPrice,
  //         caseProductType: null,
  //         childProducts: null,
  //       };
  //     });
  //     setValidationErrors(prevState => []);
  //     setIsUpdated(prevState => false);
  //   }
  // }, [ isOpen, prevProduct, setProductForUpdate, setValidationErrors, setIsUpdated ]);

  // useEffect((): void => {
  //   if (isOpen && isUpdated) {
  //     handleOnClickUpdateButton();
  //   }
  // }, [ isOpen, isUpdated, handleOnClickUpdateButton ]);

  // /**
  //  * 商品名変更イベント
  //  * @param e
  //  */
  // const handleOnNameChange = (e: ChangeEvent<HTMLInputElement>): void => {
  //   setProductForUpdate(prevState => {
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
  //   setProductForUpdate(prevState => {
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
  //   setProductForUpdate(prevState => {
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
  //   setProductForUpdate(prevState => {
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
  //   setProductForUpdate(prevState => {
  //     return {
  //       ...prevState,
  //       unitPrice: Integer.parseIntExceptZero(e.target.value),
  //     };
  //   });
  // };

  // if (isOpen && prevProduct === null) {
  //   // todo:Loadingコンポーネント
  //   return <Paragraph>Loading...</Paragraph>;
  // }

  return (
    <ModalSm isOpen={isOpen} onRequestClose={handleOnCloseButtonClick}>
      <ModalTitle text={"商品マスタ削除"} />
      <Error422 errors={validationErrors} />
      <ContentAreaWrapper>
        <InputGroup80
          id={"name"}
          text={"商品名"}
          value={productForUpdate.name}
          isRequired
          // changeFunction={handleOnNameChange}
        />
      </ContentAreaWrapper>
      <ContentAreaWrapper>
        <InputGroup80
          id={"sku"}
          text={"SKU"}
          value={productForUpdate.sku ?? ""}
          isRequired
          // changeFunction={handleOnSkuChange}
        />
      </ContentAreaWrapper>
      <ContentAreaWrapper>
        <InputAndLabel
          id={"janCode"}
          text={"JANコードまたはバーコード情報"}
          value={productForUpdate.janCode ?? ""}
          // changeFunction={handleOnJanCodeChange}
        />
      </ContentAreaWrapper>
      <ContentAreaWrapper>
        <InputGroup80
          id={"nameToSlip"}
          text={"品名(12文字以内)"}
          value={productForUpdate.nameToSlip ?? ""}
          // changeFunction={handleOnNameToSlipChange}
        />
      </ContentAreaWrapper>
      <ContentAreaWrapper>
        <div className="pl-[0.65rem]">
          <InputGroup24
            id={"unitPrice"}
            text={"単価"}
            value={productForUpdate.unitPrice.toString()}
            // changeFunction={handleOnUnitPriceChange}
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
        <FormButton
          text={"保存する"}
          color={"green"}
          onClick={async (): Promise<void> => {
            // putProduct(prevProduct);
          }}
        />
      </div>
      <ModalCloseButton handleClose={handleOnCloseButtonClick} />
    </ModalSm>
  );
};

export default NormalProductEditModal;
