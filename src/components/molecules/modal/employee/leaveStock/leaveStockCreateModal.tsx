"use client";

import H2 from "@/components/atoms/h2";
import InputAndLabel from "@/components/molecules/inputs/inputAndLabel";
import FormButton from "@/components/atoms/button/formButton";
import commonClasses from "@/styles/common/page.module.scss";
import Paragraph from "@/components/atoms/paragraph";
import { ChangeEvent, ReactElement, useEffect } from "react";
import SmallButton from "@/components/atoms/button/smallButton";
import InputOfRemark from "@/components/molecules/inputs/inputOfRemark";
import Input from "@/components/atoms/input";
import SelectAndLabel from "@/components/molecules/selectAndLabel";
import { EduITModal } from "@/components/molecules/eduITModal";
import {
  defaultLeaveStockForPostType,
  LeaveStockForPostType,
  ProductAndQuantityType,
  useStore,
} from "@/hooks/employee/leaveStock/request/useStore";
import { useIndex as useShipFromAddressIndex } from "@/hooks/employee/shipFromAddress/useIndex";
import { useIndex as useShipToAddressIndex } from "@/hooks/employee/shipToAddress/useIndex";
import { useIndex as useProductIndex } from "@/hooks/employee/product/useIndex";
import { useIndex as useCountryIndex } from "@/hooks/common/country/useIndex";
import Error422 from "@/components/molecules/errors/error422";
import { ReactSelectOption } from "@/types/reactSelectOptions/ReactSelectOption";
import { useFind } from "@/hooks/employee/shipToAddress/useFind";
import { OrderDetailDbTableType } from "@/types/db/order/orderDetail";
import { UUID } from "@/lib/uuid";
import { Integer } from "@/lib/integer";

const LeaveStockCreateModal = ({
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
  // custom hooks
  const {
    postLeaveStock,
    leaveStockForPost,
    setLeaveStockForPost,
    isStored,
    setIsStored,
    validationErrors,
    setValidationErrors,
  } = useStore();

  const {
    getShipFromAddresses,
    options: shipFromAddressOptions,
    setCondition: setShipFromAddressIndexCondition,
    condition: shipFromAddressIndexCondition,
  } = useShipFromAddressIndex();

  const {
    getShipToAddresses,
    options: shipToAddressOptions,
    setCondition: setShipToAddressIndexCondition,
    condition: ShipToAddressIndexCondition,
  } = useShipToAddressIndex();

  const { findShipToAddress, shipToAddress, countryOption, setCondition: setShipToAddressFindCondition } = useFind();

  const { getProducts, options: productOptions } = useProductIndex();

  const { getCountries, options: countryOptions } = useCountryIndex();

  // useStates

  // useEffects

  /**
   * 顧客IDをセットしたら取得する
   */
  useEffect((): void => {
    if (shipFromAddressIndexCondition.customerId !== null) {
      getShipFromAddresses();
    }
  }, [ getShipFromAddresses, shipFromAddressIndexCondition ]);

  /**
   * 顧客IDをセットしたら取得する
   */
  useEffect((): void => {
    if (ShipToAddressIndexCondition.customerId !== null) {
      getShipToAddresses();
    }
  }, [ getShipToAddresses, ShipToAddressIndexCondition ]);

  /**
   * 顧客IDがあったら、配送元、配送先を検索する条件を設定
   */
  useEffect((): void => {
    if (isOpen && srcOrderDetail && srcOrderDetail.order.customerId !== null) {
      setShipFromAddressIndexCondition(prevState => {
        return {
          customerId: srcOrderDetail.order.customerId,
        };
      });

      setShipToAddressIndexCondition(prevState => {
        return {
          customerId: srcOrderDetail.order.customerId,
        };
      });

      setShipToAddressFindCondition(prevState => {
        return {
          customerId: srcOrderDetail.order.customerId,
        };
      });
    }
  }, [
    isOpen,
    srcOrderDetail,
    setShipFromAddressIndexCondition,
    setShipToAddressIndexCondition,
    setShipToAddressFindCondition,
  ]);

  /**
   * 初期化
   */
  useEffect((): void => {
    if (isOpen) {
      setValidationErrors(prevState => []);
      setIsStored(prevState => false);
      setLeaveStockForPost(prevState => {
        return defaultLeaveStockForPostType;
      });

      (async (): Promise<void> => {
        await getProducts();
        await getCountries();
      })();
    }
  }, [ isOpen, setValidationErrors, setIsStored, getProducts, getCountries, setLeaveStockForPost ]);

  useEffect((): void => {
    if (isOpen && productOptions && srcOrderDetail.order.customerId !== null) {
      // モーダルオープン時、且つ、オプションが取得されており、且つ、パラメータにsrcProductIdListがある場合。

      setLeaveStockForPost(prevState => {
        return {
          customerId: srcOrderDetail.order.customerId,
          orderDetailId: srcOrderDetail.id,
          productAndQuantities: [
            {
              option: {
                label: srcOrderDetail.product.name,
                value: srcOrderDetail.productId,
              },
              quantity: srcOrderDetail.quantity,
              uuid: UUID.generate(),
            },
          ],
          shipToAddressId: null,
          srcShipToAddress: null,
          countryId: null,
          country: null,
          countryOption: null,
          postalCode: "",
          prefectureName: "",
          cityName: "",
          townName: "",
          buildingName: "",
          name: "",
          tel: "",
          publicRemarks: null,
          publicRemarksFile: null,
          shipFromAddressId: null,
        } as LeaveStockForPostType;
      });
    }
  }, [ isOpen, productOptions, setLeaveStockForPost, srcOrderDetail ]);

  /**
   * 登録後の処理
   */
  useEffect((): void => {
    if (isOpen && isStored) {
      handleOnClickStoreButton();
    }
  }, [ isOpen, isStored, handleOnClickStoreButton ]);

  /**
   * 「配送先反映」ボタンが押されたあとに、配送先が取得されたら
   */
  useEffect((): void => {
    setLeaveStockForPost(prevState => {
      return {
        ...prevState,
        countryOption: countryOption,
        srcShipToAddress: shipToAddress,
        countryId: shipToAddress?.countryId,
        postalCode: shipToAddress?.postalCode || "",
        prefectureName: shipToAddress?.prefectureName || "",
        cityName: shipToAddress?.cityName || "",
        townName: shipToAddress?.townName || "",
        buildingName: shipToAddress?.buildingName || "",
        name: shipToAddress?.name || "",
        tel: shipToAddress?.tel || "",
      } as LeaveStockForPostType;
    });
  }, [ shipToAddress, countryOption, setLeaveStockForPost ]);

  // handles

  /**
   * 数量変更イベント
   * @param uuid
   * @param e
   */
  const handleOnChangeQuantity = async (uuid: string, e: ChangeEvent<HTMLInputElement>): Promise<void> => {
    const newQuantity = Integer.parseIntExceptZero(e.target.value);

    setLeaveStockForPost(prevState => {
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
   * 配送先変更イベント
   * @param e
   */
  const handleOnChangeShipToAddress = async (e: ReactSelectOption): Promise<void> => {
    setLeaveStockForPost(prevState => {
      if (!prevState) return prevState;

      return {
        ...prevState,
        shipToAddressId: Integer.parseIntExceptNull(e.value),
      };
    });
  };

  /**
   * 配送先国変更イベント
   * @param e
   */
  const handleOnChangeShipToAddressCountry = async (e: ReactSelectOption): Promise<void> => {
    setLeaveStockForPost(prevState => {
      if (!prevState) return prevState;

      return {
        ...prevState,
        countryId: Integer.parseIntExceptNull(e.value),
      };
    });
  };

  /**
   * 郵便番号変更イベント
   * @param e
   */
  const handleOnChangePostalCode = async (e: ChangeEvent<HTMLInputElement>): Promise<void> => {
    setLeaveStockForPost(prevState => {
      if (!prevState) return prevState;

      return {
        ...prevState,
        postalCode: e.target.value,
      };
    });
  };

  /**
   * 都道府県名変更イベント
   * @param e
   */
  const handleOnChangePrefectureName = async (e: ChangeEvent<HTMLInputElement>): Promise<void> => {
    setLeaveStockForPost(prevState => {
      if (!prevState) return prevState;

      return {
        ...prevState,
        prefectureName: e.target.value,
      };
    });
  };

  /**
   * 市区町村名変更イベント
   * @param e
   */
  const handleOnChangeCityName = async (e: ChangeEvent<HTMLInputElement>): Promise<void> => {
    setLeaveStockForPost(prevState => {
      if (!prevState) return prevState;

      return {
        ...prevState,
        cityName: e.target.value,
      };
    });
  };

  /**
   * 町・番地名変更イベント
   * @param e
   */
  const handleOnChangeTownName = async (e: ChangeEvent<HTMLInputElement>): Promise<void> => {
    setLeaveStockForPost(prevState => {
      if (!prevState) return prevState;

      return {
        ...prevState,
        townName: e.target.value,
      };
    });
  };

  /**
   * 建物名変更イベント
   * @param e
   */
  const handleOnChangeBuildingName = async (e: ChangeEvent<HTMLInputElement>): Promise<void> => {
    setLeaveStockForPost(prevState => {
      if (!prevState) return prevState;

      return {
        ...prevState,
        buildingName: e.target.value,
      };
    });
  };

  /**
   * ショップ（事業者名）変更イベント
   * @param e
   */
  const handleOnChangeShopName = async (e: ChangeEvent<HTMLInputElement>): Promise<void> => {
    setLeaveStockForPost(prevState => {
      if (!prevState) return prevState;

      return {
        ...prevState,
        name: e.target.value,
      };
    });
  };

  /**
   * 電話番号変更イベント
   * @param e
   */
  const handleOnChangeTel = async (e: ChangeEvent<HTMLInputElement>): Promise<void> => {
    setLeaveStockForPost(prevState => {
      if (!prevState) return prevState;

      return {
        ...prevState,
        tel: e.target.value,
      };
    });
  };

  /**
   * 電話番号変更イベント
   * @param e
   */
  const handleOnChangePublicRemarks = async (e: ChangeEvent<HTMLInputElement>): Promise<void> => {
    setLeaveStockForPost(prevState => {
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
    setLeaveStockForPost(prevState => {
      if (!prevState) return prevState;

      return {
        ...prevState,
        publicRemarksFile: selectedFile,
      };
    });
  };

  /**
   * 配送元変更イベント
   * @param e
   */
  const handleOnChangeShipFromAddress = async (e: ReactSelectOption): Promise<void> => {
    setLeaveStockForPost(prevState => {
      if (!prevState) return prevState;

      return {
        ...prevState,
        shipFromAddressId: Integer.parseIntExceptNull(e.value),
      };
    });
  };

  /**
   * 配送先反映ボタン押下イベント
   */
  const handleOnClickShipToAddressReflectButton = async (): Promise<void> => {
    if (leaveStockForPost?.shipToAddressId) {
      await findShipToAddress(leaveStockForPost.shipToAddressId);
    }
  };

  const classNames = [ commonClasses.flex__wrapper, commonClasses.justify_between, commonClasses.aline_center ];

  return (
    <EduITModal isOpen={isOpen}>
      <H2>出荷依頼作成</H2>
      <Error422 errors={validationErrors} />
      {leaveStockForPost?.productAndQuantities &&
        leaveStockForPost.productAndQuantities.map((productAndQuantity: ProductAndQuantityType) => {
          return (
            <div key={productAndQuantity.uuid} className={classNames.join(" ")}>
              <SelectAndLabel
                id={"productName"}
                options={productOptions}
                text={"商品名"}
                isRequired
                isLarge
                showLabel={true}
                value={productAndQuantity.option}
                isDisabled
              />
              <InputAndLabel
                id={"quantity"}
                text={"数量"}
                value={productAndQuantity.quantity.toString()}
                isRequired
                isSmall
                showLabel={true}
                changeFunction={async (e: ChangeEvent<HTMLInputElement>) => {
                  await handleOnChangeQuantity(productAndQuantity.uuid, e);
                }}
              />
            </div>
          );
        })}
      <div className={`${commonClasses.flex__wrapper} ${commonClasses.justify_between} ${commonClasses.aline_end}`}>
        <SelectAndLabel
          id={"shipToAddress"}
          options={shipToAddressOptions}
          text={"配送先"}
          isRequired
          isLarge
          changeFunction={handleOnChangeShipToAddress}
        />
        <SmallButton text={"配送先反映"} isBlue clickFunction={handleOnClickShipToAddressReflectButton} />
      </div>
      <div className={`${commonClasses.flex__wrapper} ${commonClasses.justify_between} ${commonClasses.aline_center}`}>
        <InputAndLabel
          id={"postal_code"}
          text={"郵便番号"}
          value={leaveStockForPost?.postalCode || ""}
          isRequired
          isLarge
          changeFunction={handleOnChangePostalCode}
        />
        <SelectAndLabel
          id={"country"}
          text={"配送先国"}
          options={countryOptions}
          isRequired
          changeFunction={handleOnChangeShipToAddressCountry}
          value={leaveStockForPost?.countryOption}
        />
      </div>
      {/* 都道府県 */}
      <InputAndLabel
        id={"prefectureName"}
        text={"住所"}
        value={leaveStockForPost?.prefectureName || ""}
        isRequired
        changeFunction={handleOnChangePrefectureName}
      />
      {/* 市区群町村 */}
      <Input value={leaveStockForPost?.cityName || ""} changeFunction={handleOnChangeCityName} />
      {/* 町・番地 */}
      <Input value={leaveStockForPost?.townName || ""} changeFunction={handleOnChangeTownName} />
      {/* マンション・ビル名 */}
      <Input value={leaveStockForPost?.buildingName || ""} changeFunction={handleOnChangeBuildingName} />
      {/* 識別名 */}
      <Input value={leaveStockForPost?.name || ""} changeFunction={handleOnChangeShopName} />
      {/* 電話番号 */}
      <Input value={leaveStockForPost?.tel || ""} changeFunction={handleOnChangeTel} />
      <InputOfRemark
        id={"publicRemarks"}
        text={"備考"}
        value={leaveStockForPost?.publicRemarks || ""}
        file={leaveStockForPost?.publicRemarksFile}
        changeTextFunction={async (e: ChangeEvent<HTMLInputElement>) => {
          await handleOnChangePublicRemarks(e);
        }}
        changeFileFunction={async (e: ChangeEvent<HTMLInputElement>) => {
          await handleOnChangePublicRemarksFile(e);
        }}
      />
      <div className={`${commonClasses.flex__wrapper} ${commonClasses.justify_between} ${commonClasses.aline_end}`}>
        <SelectAndLabel
          id={"shipToAddress"}
          options={shipFromAddressOptions}
          text={"配送元"}
          isRequired
          isLarge
          changeFunction={handleOnChangeShipFromAddress}
        />
      </div>
      {/* todo: PH2 にて運送会社マスタを追加するためコメントアウト */}
      {/*<div className={commonClasses.mt_24}>*/}
      {/*  <SelectAndLabel options={shipToAddressOptions} text={"運送会社"} isRequired></SelectAndLabel>*/}
      {/*</div>*/}
      <div className={commonClasses.mt_24}>
        <FormButton text={"出荷依頼"} color={"green"} onClick={postLeaveStock} />
        <Paragraph isLink isCenter isMarginTop clickFunction={handleOnCloseButtonClick}>
          出荷依頼をやめる
        </Paragraph>
      </div>
    </EduITModal>
  );
};

export default LeaveStockCreateModal;
