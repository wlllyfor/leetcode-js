"use client";

import { ChangeEvent, ReactElement, useEffect } from "react";
import ModalSm from "@/components/atoms/modal/modalSm";
import ModalTitle from "@/components/atoms/modal/modalTitle";
import Paragraph from "@/components/atoms/text/paragraph";
import InputOfSize from "@/components/molecules/inputs/inputOfSize";
import InputOfCustomerId from "@/components/molecules/inputs/inputOfCustomerId";
import ReceiveStockInspectionTable from "@/components/molecules/receiveStock/receiveStockInspectionTable";
import SelectGroup80 from "@/components/molecules/form/select/selectGroup80";
import InputGroup24 from "@/components/molecules/form/input/inputGroup24";
import InputGroup80 from "@/components/molecules/form/input/inputGroup80";
import ContentAreaWrapper from "@/components/atoms/div/wrapper/contentAreaWrapper";
import InspectProductsSelectGroup from "@/components/molecules/form/select/inspectProductsSelectGroup";
import ModalCloseButton from "@/components/atoms/modal/modalCloseButton";
import { useIndex as useEmployeeIndex } from "@/hooks/common/employee/useIndex";
import { useInspect } from "@/hooks/employee/receiveStock/receive/useInspect";
import Error422 from "@/components/molecules/errors/error422";
import { useInspectableIndex } from "@/hooks/employee/product/useInspectableIndex";
import { ReactSelectOption } from "@/types/reactSelectOptions/ReactSelectOption";
import { Integer } from "@/lib/integer";
import { ReactSelectInspectOption } from "@/types/reactSelectOptions/ReactSelectInspectOption";
import Image from "next/image";

const InspectModal = ({
  isOpen,
  handleCloseOnClick,
  handleOnClickInspectButton,
}: {
  isOpen: boolean;
  handleCloseOnClick: () => void;
  handleOnClickInspectButton: () => void;
}): ReactElement => {
  const groupOptions: ReactSelectOption[] = [
    /* 班の選択肢 */
    { value: "A", label: "A班" },
    { value: "B", label: "B班" },
    { value: "C", label: "C班" },
  ];

  /**
   * 参考
   * https://zenn.dev/waddy/articles/react-select-customize#%E9%81%B8%E6%8A%9E%E8%82%A2%E3%81%AB%E3%82%A2%E3%83%90%E3%82%BF%E3%83%BC%E7%94%BB%E5%83%8F%E3%82%92%E8%A1%A8%E7%A4%BA%E3%81%99%E3%82%8B
   */
  const FormatOptionLabel = (({ option }: { option: ReactSelectOption | null; }) => (
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

  // customHooks
  const {
    inspectReceiveStock,
    receiveStockForInspect,
    setReceiveStockForInspect,
    validationErrors,
    setValidationErrors,
    isInspected,
    setIsInspected,
  } = useInspect();

  const { getEmployees, options: employeeOptions } = useEmployeeIndex();

  const {
    getProducts,
    options: productOptions,
    setOptions: setProductOptions,
    condition,
    setCondition,
  } = useInspectableIndex();

  // use effects

  /**
   * 初期化
   */
  useEffect((): void => {
    setValidationErrors(prevState => []);
    setIsInspected(prevState => false);
    setProductOptions(prevState => []);
    (async (): Promise<void> => {
      await getEmployees();
    })();
  }, [ setValidationErrors, setIsInspected, getEmployees, setProductOptions ]);

  /**
   * 商品取得
   */
  useEffect((): void => {
    // 追跡番号が入力済みの場合のみ検索する。
    (async (): Promise<void> => {
      setProductOptions(prevState => []);
      setReceiveStockForInspect(prevState => {
        return {
          ...prevState,
          productOption: null,
          receiveStocksDetailOption: null,
          quantity: 0,
          height: 0,
          width: 0,
          depth: 0,
        };
      });

      if (
        (condition.keyword !== null && condition.keyword.length > 0) ||
        (condition.customerId && condition.receiveStockId)
      ) {
        await getProducts();
      }
    })();
  }, [ condition, getProducts, setProductOptions, setReceiveStockForInspect ]);

  /**
   * 入荷検品状況の監視
   */
  useEffect((): void => {
    if (isOpen && isInspected) {
      handleOnClickInspectButton();
    }
  }, [ isOpen, isInspected, handleOnClickInspectButton ]);

  // handles

  /**
   * 検索キーワード変更イベント
   * @param {React.ChangeEvent<HTMLInputElement>} e
   */
  const handleOnChangeKeyword = (e: ChangeEvent<HTMLInputElement>): void => {
    setCondition(prevState => {
      return {
        ...prevState,
        keyword: e.target.value,
      };
    });
  };

  /**
   * 顧客ID変更イベント
   * @param {React.ChangeEvent<HTMLInputElement>} e
   */
  const handleOnChangeCustomerId = (e: ChangeEvent<HTMLInputElement>): void => {
    setCondition(prevState => {
      return {
        ...prevState,
        customerId: Integer.parseIntExceptNull(e.target.value),
      };
    });
  };

  /**
   * 入荷ID変更イベント
   * @param {React.ChangeEvent<HTMLInputElement>} e
   */
  const handleOnChangeReceiveStockId = (e: ChangeEvent<HTMLInputElement>): void => {
    setCondition(prevState => {
      return {
        ...prevState,
        receiveStockId: Integer.parseIntExceptNull(e.target.value),
      };
    });
  };

  /**
   * 従業員変更イベント
   * @param {ReactSelectOption} e
   */
  const handleOnChangeEmployee = (e: ReactSelectOption): void => {
    setCondition(prevState => {
      return {
        ...prevState,
        employee: e,
      };
    });
  };

  /**
   * 商品変更イベント
   * @param {ReceiveStockDetailType} e
   */
  const handleOnChangeProduct = (e: ReactSelectInspectOption): void => {
    setReceiveStockForInspect(prevState => {
      return {
        ...prevState,
        productOption: {
          value: e.value,
          label: e.label,
        },
        receiveStocksDetailOption: e,
        height: e.receiveStockDetail?.product.height || 0,
        width: e.receiveStockDetail?.product.width || 0,
        depth: e.receiveStockDetail?.product.depth || 0,
      };
    });
  };

  /**
   * 検品数変更イベント
   * @param {React.ChangeEvent<HTMLInputElement>} e
   */
  const handleOnChangeInspectQuantity = (e: ChangeEvent<HTMLInputElement>): void => {
    setReceiveStockForInspect(prevState => {
      return {
        ...prevState,
        quantity: Integer.parseIntExceptZero(e.target.value),
      };
    });
  };

  /**
   * 高さ数変更イベント
   * @param {React.ChangeEvent<HTMLInputElement>} e
   */
  const handleOnChangeProductHeight = (e: ChangeEvent<HTMLInputElement>): void => {
    setReceiveStockForInspect(prevState => {
      return {
        ...prevState,
        height: Integer.parseIntExceptZero(e.target.value),
      };
    });
  };

  /**
   * 幅変更イベント
   * @param {React.ChangeEvent<HTMLInputElement>} e
   */
  const handleOnChangeProductWidth = (e: ChangeEvent<HTMLInputElement>): void => {
    setReceiveStockForInspect(prevState => {
      return {
        ...prevState,
        width: Integer.parseIntExceptZero(e.target.value),
      };
    });
  };

  /**
   * 奥行き変更イベント
   * @param {React.ChangeEvent<HTMLInputElement>} e
   */
  const handleOnChangeProductDepth = (e: ChangeEvent<HTMLInputElement>): void => {
    setReceiveStockForInspect(prevState => {
      return {
        ...prevState,
        depth: Integer.parseIntExceptZero(e.target.value),
      };
    });
  };

  return (
    <ModalSm isOpen={isOpen} onRequestClose={handleCloseOnClick}>
      <ModalTitle text="入荷検品" />
      <Error422 errors={validationErrors} />
      {/* ↓ 班がある拠点のみ表示 */}
      <ContentAreaWrapper>
        <SelectGroup80 options={groupOptions} text={"班"} changeFunction={() => {}} />
      </ContentAreaWrapper>
      {/* ↑ 班がある拠点のみ表示 */}
      {/* ↓ 担当スタッフがある拠点のみ表示 */}
      <ContentAreaWrapper>
        <SelectGroup80
          id={"status"}
          options={employeeOptions}
          text={"入荷依頼作成スタッフ"}
          changeFunction={handleOnChangeEmployee}
        />
      </ContentAreaWrapper>
      {/* ↑ 担当スタッフがある拠点のみ表示 */}
      <ContentAreaWrapper>
        <InputGroup80
          id={"trackingNo"}
          text={"追跡番号または商品ラベル"}
          value={condition.keyword || ""}
          isRequired
          onChange={handleOnChangeKeyword}
        />
      </ContentAreaWrapper>
      {/* <InputAndLabel
        id={"trackingNo"}
        text={"追跡番号または商品ラベル"}
        value={condition.keyword || ""}
        changeFunction={handleOnChangeKeyword}
      /> */}
      <div className="flex justify-between w-80 m-auto">
        <InputOfCustomerId
          id={"customerId"}
          value={condition.customerId?.toString() || ""}
          text={"会員ID"}
          title={"YP"}
          changeFunction={handleOnChangeCustomerId}
        />
        <InputOfCustomerId
          id={"receiveStockId"}
          value={condition.receiveStockId?.toString() || ""}
          text={"入荷番号"}
          title={"W"}
          changeFunction={handleOnChangeReceiveStockId}
        />
      </div>
      {/* <SelectAndLabel
        id={"status"}
        options={employeeOptions}
        text={"スタッフ検索"}
        changeFunction={handleOnChangeEmployee}
      /> */}
      {/* ここから該当の入荷待ち商品がある場合のみ表示 */}
      <div className="border-0 border-solid border-b border-[#aaaaaa] pt-4" />
      {/* <SelectAndLabel
        id={"product"}
        options={productOptions}
        text={"商品を確定"}
        value={receiveStockForInspect.productOption}
        changeInspectItemFunction={handleOnChangeProduct}
      /> */}
      <div className="mt-4">
        <ContentAreaWrapper>
          <InspectProductsSelectGroup
            options={productOptions}
            isMulti={false}
            formatOptionLabel={(option: ReactSelectOption | null) => (
              <FormatOptionLabel option={receiveStockForInspect.productOption} />
            )}
            value={receiveStockForInspect.productOption}
            changeFunction={handleOnChangeProduct}
          />
        </ContentAreaWrapper>
      </div>
      <div className="w-80 mx-auto">
        <ContentAreaWrapper>
          <InputGroup24
            id={"quantity"}
            text={"検品数"}
            value={receiveStockForInspect.quantity.toString()}
            onChange={handleOnChangeInspectQuantity}
          />
        </ContentAreaWrapper>
        <ContentAreaWrapper>
          <div className="flex gap-3">
            <InputOfSize
              id={"size"}
              text={"サイズ"}
              heightValue={receiveStockForInspect.height.toString()}
              widthValue={receiveStockForInspect.width.toString()}
              depthValue={receiveStockForInspect.depth.toString()}
              heightChangeFunction={handleOnChangeProductHeight}
              widthChangeFunction={handleOnChangeProductWidth}
              depthChangeFunction={handleOnChangeProductDepth}
              showLabel
            />
            <InputGroup24 id={"weight"} text={"重量"} value={""} onChange={() => {}} />
          </div>
        </ContentAreaWrapper>
      </div>
      <ContentAreaWrapper>
        <ReceiveStockInspectionTable receiveStockForInspect={receiveStockForInspect} inspectReceiveStock={inspectReceiveStock} />
        {/* {receiveStockForInspect.receiveStocksDetailOption && (
            <ReceiveStockInspectionTable
              receiveStockForInspect={receiveStockForInspect}
              inspectReceiveStock={inspectReceiveStock}
            />
          )} */}
      </ContentAreaWrapper>
      <ModalCloseButton handleClose={handleCloseOnClick} />
    </ModalSm>
  );
};

export default InspectModal;
