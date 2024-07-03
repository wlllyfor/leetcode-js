"use client";

import { ChangeEvent, ReactElement, useEffect, useState } from "react";
import H2 from "@/components/atoms/h2";
import InputAndLabel from "@/components/molecules/inputs/inputAndLabel";
import SelectAndLabel from "@/components/molecules/selectAndLabel";
import FormButton from "@/components/atoms/button/formButton";
import commonClasses from "@/styles/common/page.module.scss";
import Paragraph from "@/components/atoms/paragraph";
import DeleteButton from "@/components/atoms/button/deleteButton";
import InputOfRemark from "@/components/molecules/inputs/inputOfRemark";
import FileUploadAndLabel from "@/components/molecules/fileUploadAndLabel";
import SmallButton from "@/components/atoms/button/smallButton";
import plus from "@/resource/img/plus.svg";
import { EduITModal } from "@/components/molecules/eduITModal";
import { OrderDetailDbTableType } from "@/types/db/order/orderDetail";
import { useIndex as useOrderStatuses } from "@/hooks/enum/orderStatuses/useIndex";
import { OtherPriceType, useUpdate } from "@/hooks/employee/orderDetail/useUpdate";
import { useIndex as useMalls } from "@/hooks/enum/mall/useIndex";
import { ReactSelectOption } from "@/types/reactSelectOptions/ReactSelectOption";
import { UUID } from "@/lib/uuid";
import Error422 from "@/components/molecules/errors/error422";
import InputOtherPrices from "@/components/molecules/inputs/inputOtherPrices";
import { Integer } from "@/lib/integer";

const OrderEditModal = ({
  prevOrderDetail,
  isOpen,
  handleOnCloseButtonClick,
  handleOnClickUpdateButton,
}: {
  prevOrderDetail: OrderDetailDbTableType;
  isOpen: boolean;
  handleOnCloseButtonClick: () => void;
  handleOnClickUpdateButton: () => void;
}): ReactElement => {
  // custom hooks
  const { getEnums: getOrderStatuses, enums: orderStatusOptions } = useOrderStatuses();
  const { getEnums: getMalls, enums: mallOptions } = useMalls();

  const {
    putOrderDetail,
    validationErrors,
    setValidationErrors,
    isUpdated,
    setIsUpdated,
    orderDetailForUpdate,
    setOrderDetailForUpdate,
  } = useUpdate();

  // use states
  const [ defaultStatusOption, setDefaultStatusOption ] = useState<ReactSelectOption>();
  const [ defaultMallOption, setDefaultMallOption ] = useState<ReactSelectOption>();
  const [ otherPriceTotal, setOtherPriceTotal ] = useState<number>(0);

  /**
   * モールの監視。取得できたらデフォルトを変更。
   */
  useEffect((): void => {
    if (mallOptions && prevOrderDetail) {
      setDefaultMallOption(prevState => {
        return mallOptions.find(option => {
          return option.value === prevOrderDetail.mall;
        });
      });
    }
  }, [ mallOptions ]);

  /**
   * 注文ステータスの監視。取得できたらデフォルトを変更。
   */
  useEffect((): void => {
    if (isOpen && orderStatusOptions && prevOrderDetail) {
      const defaultOpt = orderStatusOptions.find(option => {
        return option.value === prevOrderDetail.orderStatus;
      });

      setDefaultStatusOption(prevState => defaultOpt);
      setOrderDetailForUpdate(prevState => {
        return {
          ...prevState,
          statusOption: defaultOpt || null,
        };
      });
    }
  }, [ isOpen, orderStatusOptions, prevOrderDetail ]);

  /**
   * 初期化
   */
  useEffect((): void => {
    if (isOpen && prevOrderDetail) {
      setOrderDetailForUpdate(prevState => {
        const defaultOtherPrices: OtherPriceType[] =
          prevOrderDetail.orderDetailOthers && prevOrderDetail.orderDetailOthers.length > 0
            ? prevOrderDetail.orderDetailOthers.map(other => ({
              uuid: UUID.generate(),
              price: other.price,
              name: other.name,
            }))
            : [
              {
                uuid: UUID.generate(),
                price: 0,
                name: "",
              },
            ];

        return {
          id: prevOrderDetail.id,
          trackingNo: prevOrderDetail.trackingNo || "",
          statusOption: defaultStatusOption || null,
          name: prevOrderDetail.productName || "",
          variation: prevOrderDetail.variation || "",
          shopName: prevOrderDetail.shopName || "",
          productFile: null,
          quantity: prevOrderDetail.quantity || 1,
          productUrl: prevOrderDetail.product.productUrl || "",
          mallOption: defaultMallOption || null,
          postage: prevOrderDetail.postage || 0,
          otherPrices: defaultOtherPrices,
          publicRemarks: prevOrderDetail.publicRemarks || "",
          publicRemarksFile: null,
          privateRemarks: prevOrderDetail.privateRemarks || "",
          privateRemarksFile: null,
        };
      });
      setValidationErrors(prevState => []);
      setIsUpdated(prevState => false);
      (async (): Promise<void> => {
        await getMalls();
        await getOrderStatuses("employee");
      })();
    }
  }, [ setOrderDetailForUpdate, setValidationErrors, setIsUpdated, getMalls, getOrderStatuses, isOpen ]);

  // use effects
  useEffect((): void => {
    if (isOpen && isUpdated) {
      handleOnClickUpdateButton();
    }
  }, [ isOpen, isUpdated, handleOnClickUpdateButton ]);

  useEffect((): void => {
    if (isOpen && orderDetailForUpdate.id && orderDetailForUpdate.otherPrices.length > 0) {
      setOtherPriceTotal(prevState =>
        orderDetailForUpdate.otherPrices.reduce((total, otherPrice) => {
          return total + otherPrice.price;
        }, 0));
    }
  }, [ isOpen, orderDetailForUpdate ]);

  // handles

  /**
   * 追跡番号変更イベント
   * @param {React.ChangeEvent<HTMLInputElement>} e
   */
  const handleOnChangeTrackingNo = (e: ChangeEvent<HTMLInputElement>): void => {
    setOrderDetailForUpdate(prevState => {
      return {
        ...prevState,
        trackingNo: e.target.value,
      };
    });
  };

  /**
   * ステータス変更イベント
   * @param {ReactSelectOption} e
   */
  const handleOnChangeStatus = (e: ReactSelectOption): void => {
    setOrderDetailForUpdate(prevState => {
      return {
        ...prevState,
        statusOption: e,
      };
    });
  };

  /**
   * バリエーション変更イベント
   * @param {React.ChangeEvent<HTMLInputElement>} e
   */
  const handleOnChangeVariation = (e: ChangeEvent<HTMLInputElement>): void => {
    setOrderDetailForUpdate(prevState => {
      return {
        ...prevState,
        variation: e.target.value,
      };
    });
  };

  /**
   * ショップ名変更イベント
   * @param {React.ChangeEvent<HTMLInputElement>} e
   */
  const handleOnChangeShopName = (e: ChangeEvent<HTMLInputElement>): void => {
    setOrderDetailForUpdate(prevState => {
      return {
        ...prevState,
        shopName: e.target.value,
      };
    });
  };

  /**
   * 商品ファイル変更イベント
   * @param e
   */
  const handleOnChangeProductImageFile = async (e: ChangeEvent<HTMLInputElement>): Promise<void> => {
    const selectedFile = e.target.files?.[0] ?? null;
    setOrderDetailForUpdate(prevState => {
      if (!prevState) return prevState;

      return {
        ...prevState,
        productFile: selectedFile,
      };
    });
  };

  /**
   * 数量変更イベント
   * @param {React.ChangeEvent<HTMLInputElement>} e
   */
  const handleOnChangeQuantity = (e: ChangeEvent<HTMLInputElement>): void => {
    setOrderDetailForUpdate(prevState => {
      return {
        ...prevState,
        quantity: Integer.parseIntExceptZero(e.target.value, 1),
      };
    });
  };

  /**
   * 商品URL変更イベント
   * @param {React.ChangeEvent<HTMLInputElement>} e
   */
  const handleOnChangeProductUrl = (e: ChangeEvent<HTMLInputElement>): void => {
    setOrderDetailForUpdate(prevState => {
      return {
        ...prevState,
        productUrl: e.target.value,
      };
    });
  };

  /**
   * モール変更イベント
   * @param {ReactSelectOption} e
   */
  const handleOnChangeMall = (e: ReactSelectOption): void => {
    setOrderDetailForUpdate(prevState => {
      return {
        ...prevState,
        mallOption: e,
      };
    });
  };

  /**
   * 送料変更イベント
   * @param {React.ChangeEvent<HTMLInputElement>} e
   */
  const handleOnChangePostage = (e: ChangeEvent<HTMLInputElement>): void => {
    setOrderDetailForUpdate(prevState => {
      return {
        ...prevState,
        postage: Integer.parseIntExceptZero(e.target.value, 1),
      };
    });
  };

  /**
   * その他金額名称変更イベント
   * @param {React.ChangeEvent<HTMLInputElement>} e
   * @param uuid
   */
  const handleOnChangeOtherPricesName = (e: ChangeEvent<HTMLInputElement>, uuid: string): void => {
    setOrderDetailForUpdate(prevState => {
      const updatedOtherPrices = prevState.otherPrices.map(item => {
        if (item.uuid === uuid) {
          // UUIDが一致する要素を更新
          return {
            ...item,
            name: e.target.value,
          };
        }
        return item; // UUIDが一致しない場合はそのままの要素を返す
      });
      return {
        ...prevState,
        otherPrices: updatedOtherPrices,
      };
    });
  };

  /**
   * その他金額変更イベント
   * @param {React.ChangeEvent<HTMLInputElement>} e
   * @param uuid
   */
  const handleOnChangeOtherPricesPrice = (e: ChangeEvent<HTMLInputElement>, uuid: string): void => {
    setOrderDetailForUpdate(prevState => {
      const updatedOtherPrices = prevState.otherPrices.map(item => {
        if (item.uuid === uuid) {
          // UUIDが一致する要素を更新
          return {
            ...item,
            price: Integer.parseIntExceptZero(e.target.value),
          };
        }
        return item; // UUIDが一致しない場合はそのままの要素を返す
      });
      return {
        ...prevState,
        otherPrices: updatedOtherPrices,
      };
    });
  };

  /**
   * その他金額追加ボタン押下イベント
   */
  const handleOnClickAddOtherPriceButton = (): void => {
    setOrderDetailForUpdate(prevState => {
      const newOtherPrice: OtherPriceType = {
        uuid: UUID.generate(),
        price: 0,
        name: "",
      };
      return {
        ...prevState,
        otherPrices: [ ...prevState.otherPrices, newOtherPrice ],
      };
    });
  };

  /**
   * その他金額削除ボタン押下イベント
   */
  const handleOnClickDeleteDetail = async (uuid: string): Promise<void> => {
    setOrderDetailForUpdate(prevState => {
      if (prevState) {
        // uuidに基づいて要素を削除
        const updatedOtherPrices = prevState.otherPrices.filter(item => item.uuid !== uuid);
        return { ...prevState, otherPrices: updatedOtherPrices };
      }
      return prevState;
    });
  };

  /**
   * 備考変更イベント
   * @param {React.ChangeEvent<HTMLInputElement>} e
   */
  const handleOnChangePublicRemarks = (e: ChangeEvent<HTMLInputElement>): void => {
    setOrderDetailForUpdate(prevState => {
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
    setOrderDetailForUpdate(prevState => {
      if (!prevState) return prevState;

      return {
        ...prevState,
        publicRemarksFile: selectedFile,
      };
    });
  };

  /**
   * 管理メモ変更イベント
   * @param {React.ChangeEvent<HTMLInputElement>} e
   */
  const handleOnChangePrivateRemarks = (e: ChangeEvent<HTMLInputElement>): void => {
    setOrderDetailForUpdate(prevState => {
      return {
        ...prevState,
        privateRemarks: e.target.value,
      };
    });
  };

  /**
   * 管理メモ添付ファイル変更イベント
   * @param e
   */
  const handleOnChangePrivateRemarksFile = async (e: ChangeEvent<HTMLInputElement>): Promise<void> => {
    const selectedFile = e.target.files?.[0] ?? null;
    setOrderDetailForUpdate(prevState => {
      if (!prevState) return prevState;

      return {
        ...prevState,
        privateRemarksFile: selectedFile,
      };
    });
  };

  const classNames = [
    commonClasses.flex__wrapper,
    commonClasses.flex_nowrap,
    commonClasses.justify_between,
    commonClasses.aline_end,
  ];

  return (
    <EduITModal isOpen={isOpen}>
      <H2>注文依頼編集</H2>
      <Error422 errors={validationErrors} />
      <div className={`${commonClasses.flex__wrapper} ${commonClasses.flex_nowrap}`}>
        <InputAndLabel
          id={"trackingNo"}
          text={"追跡入荷情報"}
          value={orderDetailForUpdate.trackingNo || ""}
          isRequired
          changeFunction={handleOnChangeTrackingNo}
        />
        <div className={commonClasses.ml_16} />
        <SelectAndLabel
          id={"status"}
          options={orderStatusOptions}
          text={"ステータス"}
          isRequired
          isSmall
          value={defaultStatusOption}
          changeFunction={handleOnChangeStatus}
        />
      </div>
      <InputAndLabel
        id={"variation"}
        text={"商品バリエーション"}
        value={orderDetailForUpdate.variation}
        isRequired
        changeFunction={handleOnChangeVariation}
      />
      <InputAndLabel
        id={"shopName"}
        text={"ショップ名"}
        value={orderDetailForUpdate.shopName}
        changeFunction={handleOnChangeShopName}
      />
      <div className={classNames.join(" ")}>
        <div className={commonClasses.mb_16}>
          <FileUploadAndLabel
            id={"productFile"}
            buttonText={"商品画像を選択"}
            changeFunction={handleOnChangeProductImageFile}
          />
        </div>
        <InputAndLabel
          id={"quantity"}
          text={"数量"}
          value={orderDetailForUpdate.quantity.toString()}
          isRequired
          changeFunction={handleOnChangeQuantity}
        />
      </div>
      <InputAndLabel
        id={"productUrl"}
        text={"商品URL"}
        value={orderDetailForUpdate.productUrl}
        changeFunction={handleOnChangeProductUrl}
      />
      <SelectAndLabel
        id={"mall"}
        text={"モール名"}
        options={mallOptions}
        value={defaultMallOption}
        changeFunction={handleOnChangeMall}
      />
      <InputAndLabel
        id={"postage"}
        text={"送料"}
        value={orderDetailForUpdate.postage.toString()}
        changeFunction={handleOnChangePostage}
      />
      {orderDetailForUpdate.otherPrices.map((otherPrice, index) => {
        return (
          <div
            key={otherPrice.uuid}
            className={`${commonClasses.flex__wrapper} ${commonClasses.flex_nowrap} ${commonClasses.aline_end}`}
          >
            <InputOtherPrices
              isTop={index === 0}
              otherPriceTotal={otherPriceTotal}
              otherPrice={otherPrice}
              handleOnChangeOtherPricesName={handleOnChangeOtherPricesName}
              handleOnChangeOtherPricesPrice={handleOnChangeOtherPricesPrice}
            />
            <DeleteButton clickFunction={() => handleOnClickDeleteDetail(otherPrice.uuid)} />
          </div>
        );
      })}

      <div className={`${commonClasses.flex__wrapper} ${commonClasses.mt_8}`}>
        <SmallButton text={"追加"} icon={plus} isBlue clickFunction={handleOnClickAddOtherPriceButton} />
      </div>
      <InputOfRemark
        id={"publicRemarks"}
        text={"備考"}
        value={orderDetailForUpdate.publicRemarks}
        file={null}
        changeTextFunction={handleOnChangePublicRemarks}
        changeFileFunction={handleOnChangePublicRemarksFile}
      />
      <InputOfRemark
        id={"privateRemarks"}
        text={"管理メモ"}
        value={orderDetailForUpdate.privateRemarks}
        isRequired
        file={null}
        changeTextFunction={handleOnChangePrivateRemarks}
        changeFileFunction={handleOnChangePrivateRemarksFile}
      />
      <div className={commonClasses.mt_24}>
        <FormButton text={"編集する"} color={"green"} onClick={putOrderDetail} />
        <Paragraph isLink isCenter isMarginTop clickFunction={handleOnCloseButtonClick}>
          注文管理へ戻る
        </Paragraph>
      </div>
    </EduITModal>
  );
};

export default OrderEditModal;
