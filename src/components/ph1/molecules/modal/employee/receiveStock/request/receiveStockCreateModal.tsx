"use client";

import { ChangeEvent, ReactElement, useEffect } from "react";
import H2 from "@/components/atoms/h2";
import InputAndLabel from "@/components/molecules/inputs/inputAndLabel";
import SelectAndLabel from "@/components/molecules/selectAndLabel";
import FormButton from "@/components/atoms/button/formButton";
import commonClasses from "@/styles/common/page.module.scss";
import Paragraph from "@/components/atoms/paragraph";
import InputOfRemark from "@/components/molecules/inputs/inputOfRemark";
import { ReactSelectOption } from "@/types/reactSelectOptions/ReactSelectOption";
import { OrderDetailDbTableType } from "@/types/db/order/orderDetail";
import { ReceiveStockForPostType, useStore } from "@/hooks/employee/receiveStock/useStore";
import Loading from "@/components/molecules/common/loading";
import { useIndex } from "@/hooks/employee/product/useIndex";
import Error422 from "@/components/molecules/errors/error422";
import { EduITModal } from "@/components/molecules/eduITModal";
import { Integer } from "@/lib/integer";
import { UUID } from "@/lib/uuid";

const ReceiveStockCreateModal = ({
  srcOrderDetail,
  isOpen,
  handleOnCloseButtonClick,
  handleOnClickStoreButton,
}: {
  srcOrderDetail: OrderDetailDbTableType;
  isOpen: boolean;
  handleOnCloseButtonClick: () => void;
  handleOnClickStoreButton: () => void;
}): ReactElement => {
  // customHooks
  const {
    postReceiveStock,
    validationErrors,
    setValidationErrors,
    isStored,
    setIsStored,
    receiveStockForPost,
    setReceiveStockForPost,
  } = useStore();

  const { getProducts, options } = useIndex();

  // use effects

  /**
   * 初期化
   */
  useEffect((): void => {
    setValidationErrors(prevState => []);
    setIsStored(prevState => false);

    setReceiveStockForPost(prevState => {
      return {
        customerId: srcOrderDetail.order.customerId,
        orderDetailId: srcOrderDetail.id,
        productAndQuantities: [],
        trackingNo: null,
        publicRemarks: null,
        publicRemarksFile: null,
        withLeaveStock: false,
      };
    });

    (async (): Promise<void> => {
      await getProducts();
    })();
  }, [
    setValidationErrors,
    setIsStored,
    getProducts,
    setReceiveStockForPost,
    srcOrderDetail.order.customerId,
    srcOrderDetail.id,
  ]);

  /**
   * 商品設定
   * 商品一覧を取得してから設定しないといけない
   */
  useEffect((): void => {
    if (options.length > 0) {
      const option = options.find(option => {
        return option.value === srcOrderDetail.productId;
      });
      setReceiveStockForPost(prevState => {
        return {
          productAndQuantities: [
            {
              option: option,
              quantity: srcOrderDetail.quantity,
              uuid: UUID.generate(),
            },
          ],
          customerId: srcOrderDetail.order.customerId,
          orderDetailId: srcOrderDetail.id,
          publicRemarks: null,
          trackingNo: null,
          publicRemarksFile: null,
        } as ReceiveStockForPostType;
      });
    }
  }, [
    options,
    setReceiveStockForPost,
    srcOrderDetail.id,
    srcOrderDetail.order.customerId,
    srcOrderDetail.productId,
    srcOrderDetail.quantity,
  ]);

  /**
   * 登録状況の監視
   */
  useEffect((): void => {
    if (isOpen && isStored) {
      handleOnClickStoreButton();
    }
  }, [ isOpen, isStored, handleOnClickStoreButton ]);

  /**
   * 「出荷依頼も作成する」押下イベントの監視
   */
  useEffect((): void => {
    (async (): Promise<void> => {
      if (receiveStockForPost?.withLeaveStock) {
        await postReceiveStock();
      }
      setReceiveStockForPost(prevState => {
        if (!prevState) return prevState;

        return {
          ...prevState,
          withLeaveStock: false,
        };
      });
    })();
  }, [ receiveStockForPost?.withLeaveStock ]);

  // handles

  /**
   * 「出荷依頼も作成する」押下イベントの監視
   */
  const handleOnClickWithLeaveStockButton = async (): Promise<void> => {
    await setReceiveStockForPost(prevState => {
      if (!prevState) return prevState;

      return {
        ...prevState,
        withLeaveStock: true,
      };
    });
  };

  /**
   * 商品変更イベント
   * @param uuid
   * @param e
   */
  const handleOnChangeProduct = async (uuid: string, e: ReactSelectOption): Promise<void> => {
    setReceiveStockForPost(prevState => {
      if (!prevState) return prevState;

      const newProductAndQuantities = prevState.productAndQuantities.map(productAndQuantity => {
        if (productAndQuantity.uuid === uuid) {
          return { ...productAndQuantity, option: e };
        }
        return productAndQuantity;
      });

      return {
        ...prevState,
        productAndQuantities: newProductAndQuantities,
      };
    });
  };

  /**
   * 数量変更イベント
   * @param uuid
   * @param e
   */
  const handleOnChangeQuantity = async (uuid: string, e: ChangeEvent<HTMLInputElement>): Promise<void> => {
    const newQuantity = Integer.parseIntExceptZero(e.target.value);

    setReceiveStockForPost(prevState => {
      if (!prevState) return prevState;

      const newProductAndQuantities = prevState.productAndQuantities.map(productAndQuantity => {
        if (productAndQuantity.uuid === uuid) {
          return { ...productAndQuantity, quantity: newQuantity };
        }
        return productAndQuantity;
      });

      return {
        ...prevState,
        productAndQuantities: newProductAndQuantities,
      };
    });
  };

  /**
   * 追跡番号変更イベント
   * @param e
   */
  const handleOnChangeTrackingNo = async (e: ChangeEvent<HTMLInputElement>): Promise<void> => {
    setReceiveStockForPost(prevState => {
      if (!prevState) return prevState;

      return {
        ...prevState,
        trackingNo: e.target.value,
      };
    });
  };

  /**
   * 備考変更イベント
   * @param e
   */
  const handleOnChangePublicRemarks = async (e: ChangeEvent<HTMLInputElement>): Promise<void> => {
    setReceiveStockForPost(prevState => {
      if (!prevState) return prevState;

      return {
        ...prevState,
        publicRemarks: e.target.value,
      };
    });
  };

  /**
   * 備考添付ファイル変更イベント
   * @param e
   */
  const handleOnChangePublicRemarksFile = async (e: ChangeEvent<HTMLInputElement>): Promise<void> => {
    const selectedFile = e.target.files?.[0] ?? null;
    setReceiveStockForPost(prevState => {
      if (!prevState) return prevState;

      return {
        ...prevState,
        publicRemarksFile: selectedFile,
      };
    });
  };

  // loading condition
  if (isOpen && !receiveStockForPost) {
    return <Loading />;
  }

  const classNames = [ commonClasses.flex__wrapper, commonClasses.justify_between, commonClasses.aline_center ];

  return (
    <EduITModal isOpen={isOpen}>
      <H2>入荷依頼作成</H2>
      <Error422 errors={validationErrors} />
      {receiveStockForPost?.productAndQuantities &&
        receiveStockForPost.productAndQuantities.map((productAndQuantity, index) => {
          return (
            <div key={productAndQuantity.uuid} className={classNames.join(" ")}>
              <SelectAndLabel
                id={"product"}
                options={options}
                text={"商品名"}
                isRequired
                isLarge
                showLabel={index === 0}
                value={productAndQuantity.option}
                isDisabled={true}
                changeFunction={async e => {
                  await handleOnChangeProduct(productAndQuantity.uuid, e);
                }}
              />
              <InputAndLabel
                id={"quantity"}
                text={"数量"}
                value={productAndQuantity.quantity.toString()}
                isRequired
                isSmall
                showLabel={index === 0}
                changeFunction={async (e: ChangeEvent<HTMLInputElement>) => {
                  await handleOnChangeQuantity(productAndQuantity.uuid, e);
                }}
              />
            </div>
          );
        })}
      <InputAndLabel
        id={"trackingNo"}
        text={"追跡番号"}
        value={receiveStockForPost?.trackingNo || ""}
        changeFunction={async (e: ChangeEvent<HTMLInputElement>) => await handleOnChangeTrackingNo(e)}
      />
      <InputOfRemark
        id={"publicRemarks"}
        text={"備考"}
        value={receiveStockForPost?.publicRemarks || ""}
        file={receiveStockForPost?.publicRemarksFile}
        changeTextFunction={async (e: ChangeEvent<HTMLInputElement>) => {
          await handleOnChangePublicRemarks(e);
        }}
        changeFileFunction={async (e: ChangeEvent<HTMLInputElement>) => {
          await handleOnChangePublicRemarksFile(e);
        }}
      />
      <div className={commonClasses.mt_24}>
        <FormButton
          text={"入荷依頼"}
          color={"green"}
          onClick={async (): Promise<void> => await postReceiveStock()}
        />
        <div className={commonClasses.mt_8}>
          <FormButton
            text={"出荷依頼も作成する"}
            color={"dark"}
            onClick={async (): Promise<void> => {
              await handleOnClickWithLeaveStockButton();
            }}
          />
        </div>
        <Paragraph isLink isCenter isMarginTop clickFunction={handleOnCloseButtonClick}>
          入荷依頼をやめる
        </Paragraph>
      </div>
    </EduITModal>
  );
};

export default ReceiveStockCreateModal;
