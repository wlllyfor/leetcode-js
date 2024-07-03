"use client";

import H2 from "@/components/atoms/h2";
import InputAndLabel from "@/components/molecules/inputs/inputAndLabel";
import FormButton from "@/components/atoms/button/formButton";
import commonClasses from "@/styles/common/page.module.scss";
import Paragraph from "@/components/atoms/paragraph";
import { ChangeEvent, ReactElement, useEffect } from "react";
import SmallButton from "@/components/atoms/button/smallButton";
import InputOfRemark from "@/components/molecules/inputs/inputOfRemark";
import plusIcon from "@/resource/img/plus.svg";
import Input from "@/components/atoms/input";
import SelectAndLabel from "@/components/molecules/selectAndLabel";
import { EduITModal } from "@/components/molecules/eduITModal";
import { ReactSelectOption } from "@/types/reactSelectOptions/ReactSelectOption";
import { useIndex as useShipFromAddressIndex } from "@/hooks/customer/shipFromAddress/useIndex";
import { useIndex as useShipToAddressIndex } from "@/hooks/customer/shipToAddress/useIndex";
import { useFind } from "@/hooks/customer/shipToAddress/useFind";
import { useIndex as useProductIndex } from "@/hooks/customer/product/useIndex";
import { useIndex as useCountryIndex } from "@/hooks/common/country/useIndex";
import {
  defaultLeaveStockForUpdateType,
  LeaveStockForUpdateType,
  ProductAndQuantityType,
  useUpdate,
} from "@/hooks/customer/leaveStock/useUpdate";
import { LeaveStockTableDbType } from "@/types/db/leaveStock/leaveStock";
import Error422 from "@/components/molecules/errors/error422";
import { Integer } from "@/lib/integer";
import { UUID } from "@/lib/uuid";

const LeaveStockCreateModal = ({
  isOpen,
  prevLeaveStock,
  handleOnCloseButtonClick,
  handleOnClickUpdateButton,
}: {
  isOpen: boolean;
  prevLeaveStock: LeaveStockTableDbType;
  handleOnCloseButtonClick: () => void;
  handleOnClickUpdateButton: () => void;
}): ReactElement => {
  // custom hooks
  const {
    updateLeaveStock,
    leaveStockForUpdate,
    setLeaveStockForUpdate,
    isUpdated,
    setIsUpdated,
    validationErrors,
    setValidationErrors,
  } = useUpdate();

  const { getShipFromAddresses, options: shipFromAddressOptions } = useShipFromAddressIndex();

  const { getShipToAddresses, options: shipToAddressOptions } = useShipToAddressIndex();

  const { getShipToAddressById, shipToAddress, countryOption } = useFind();

  const { getProducts, options: productOptions } = useProductIndex();

  const { getCountries, options: countryOptions } = useCountryIndex();

  // useStates

  // useEffects

  /**
   * 初期化
   */
  useEffect((): void => {
    if (isOpen) {
      setValidationErrors(prevState => []);
      setIsUpdated(prevState => false);

      const prevProductAndQuantities = prevLeaveStock.leaveStockProducts.map(prevItem => {
        return {
          uuid: UUID.generate(),
          quantity: prevItem.requestedLeaveQuantity,
          option: {
            value: prevItem.product.id,
            label: prevItem.product.name,
          },
        } as ProductAndQuantityType;
      });

      setLeaveStockForUpdate(prevState => {
        return {
          id: prevLeaveStock.id,
          productAndQuantities: prevProductAndQuantities,
          shipToAddressId: null,
          srcShipToAddress: null,
          countryId: prevLeaveStock.countryId,
          country: null,
          countryOption: countryOption,
          postalCode: prevLeaveStock.postalCode,
          prefectureName: prevLeaveStock.prefectureName,
          cityName: prevLeaveStock.cityName,
          townName: prevLeaveStock.townName,
          buildingName: prevLeaveStock.buildingName,
          name: prevLeaveStock.name,
          tel: prevLeaveStock.tel,
          publicRemarks: prevLeaveStock.publicRemarks,
          publicRemarksFile: null,
          shipFromAddressId: prevLeaveStock.shipFromAddressId,
          defaultCountry: {
            value: prevLeaveStock.country?.id,
            label: prevLeaveStock.country?.name,
          },
          defaultShipFromAddress: {
            value: prevLeaveStock.shipFromAddress?.id,
            label: prevLeaveStock.shipFromAddress?.name,
          },
        } as LeaveStockForUpdateType;
      });

      (async (): Promise<void> => {
        await getShipToAddresses();
        await getShipFromAddresses();
        await getProducts();
        await getCountries();
      })();
    }
  }, [
    isOpen,
    setValidationErrors,
    setIsUpdated,
    getShipToAddresses,
    getShipFromAddresses,
    getProducts,
    getCountries,
    setLeaveStockForUpdate,
    prevLeaveStock.leaveStockProducts,
    prevLeaveStock.id,
    prevLeaveStock.countryId,
    prevLeaveStock.postalCode,
    prevLeaveStock.prefectureName,
    prevLeaveStock.cityName,
    prevLeaveStock.townName,
    prevLeaveStock.buildingName,
    prevLeaveStock.name,
    prevLeaveStock.tel,
    prevLeaveStock.publicRemarks,
    prevLeaveStock.shipFromAddressId,
    prevLeaveStock.country?.id,
    prevLeaveStock.country?.name,
    prevLeaveStock.shipFromAddress?.id,
    prevLeaveStock.shipFromAddress?.name,
    countryOption,
  ]);

  /**
   * 更新後の処理
   */
  useEffect((): void => {
    if (isUpdated) {
      handleOnClickUpdateButton();
    }
  }, [ isUpdated, handleOnClickUpdateButton ]);

  /**
   * 国のoptionsが取得できたら既定値設定
   */
  useEffect((): void => {
    if (countryOptions) {
      setLeaveStockForUpdate(prevState => {
        return {
          ...prevState,
          defaultCountry: {
            value: prevLeaveStock.country?.id,
            label: prevLeaveStock.country?.name,
          },
        } as LeaveStockForUpdateType;
      });
    }
  }, [ countryOptions, prevLeaveStock.country?.id, prevLeaveStock.country?.name, setLeaveStockForUpdate ]);

  /**
   * 配送元のoptionsが取得できたら既定値設定
   */
  useEffect((): void => {
    if (shipFromAddressOptions) {
      setLeaveStockForUpdate(prevState => {
        return {
          ...prevState,
          defaultShipFromAddress: {
            value: prevLeaveStock.shipFromAddress?.id,
            label: prevLeaveStock.shipFromAddress?.name,
          },
        } as LeaveStockForUpdateType;
      });
    }
  }, [
    prevLeaveStock.shipFromAddress?.id,
    prevLeaveStock.shipFromAddress?.name,
    setLeaveStockForUpdate,
    shipFromAddressOptions,
  ]);

  /**
   * 「配送先反映」ボタンが押されたあとに、配送先が取得されたら
   */
  useEffect((): void => {
    setLeaveStockForUpdate(prevState => {
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
      } as LeaveStockForUpdateType;
    });
  }, [ shipToAddress, countryOption, setLeaveStockForUpdate ]);

  // handles

  /**
   * 追加ボタンクリック
   */
  const handleOnClickAddButton = async (): Promise<void> => {
    setLeaveStockForUpdate(prevState => {
      if (!prevState) {
        return defaultLeaveStockForUpdateType;
      }
      return {
        ...prevState,
        productAndQuantities: [
          ...prevState.productAndQuantities,
          {
            uuid: UUID.generate(),
            quantity: 0,
          },
        ],
      } as LeaveStockForUpdateType;
    });
  };

  /**
   * 商品変更イベント
   * @param uuid
   * @param e
   */
  const handleOnChangeProduct = async (uuid: string, e: ReactSelectOption): Promise<void> => {
    setLeaveStockForUpdate(prevState => {
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

    setLeaveStockForUpdate(prevState => {
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
    setLeaveStockForUpdate(prevState => {
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
    setLeaveStockForUpdate(prevState => {
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
    setLeaveStockForUpdate(prevState => {
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
    setLeaveStockForUpdate(prevState => {
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
    setLeaveStockForUpdate(prevState => {
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
    setLeaveStockForUpdate(prevState => {
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
    setLeaveStockForUpdate(prevState => {
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
    setLeaveStockForUpdate(prevState => {
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
    setLeaveStockForUpdate(prevState => {
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
    setLeaveStockForUpdate(prevState => {
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
    setLeaveStockForUpdate(prevState => {
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
    setLeaveStockForUpdate(prevState => {
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
    if (leaveStockForUpdate?.shipToAddressId) {
      await getShipToAddressById(leaveStockForUpdate.shipToAddressId);
    }
  };

  const classNames = [ commonClasses.flex__wrapper, commonClasses.justify_between, commonClasses.aline_center ];

  const classNamesMt8 = [
    commonClasses.flex__wrapper,
    commonClasses.justify_between,
    commonClasses.aline_center,
    commonClasses.mt_8,
  ];

  return (
    <EduITModal isOpen={isOpen}>
      <H2>出荷依頼作成</H2>
      <Error422 errors={validationErrors} />
      {leaveStockForUpdate?.productAndQuantities &&
        leaveStockForUpdate.productAndQuantities.map((productAndQuantity, index) => {
          return (
            <div key={productAndQuantity.uuid} className={classNames.join(" ")}>
              <SelectAndLabel
                id={"product"}
                options={productOptions}
                text={"商品名"}
                isRequired
                isLarge
                showLabel={index === 0}
                value={productAndQuantity.option}
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
      <div className={classNamesMt8.join(" ")}>
        <SmallButton text={"追加"} icon={plusIcon} isBlue clickFunction={handleOnClickAddButton} />
      </div>
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
          value={leaveStockForUpdate?.postalCode || ""}
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
          value={leaveStockForUpdate?.countryOption}
        />
      </div>
      {/* 都道府県 */}
      <InputAndLabel
        id={"prefectureName"}
        text={"住所"}
        value={leaveStockForUpdate?.prefectureName || ""}
        isRequired
        changeFunction={handleOnChangePrefectureName}
      />
      {/* 市区群町村 */}
      <Input value={leaveStockForUpdate?.cityName || ""} changeFunction={handleOnChangeCityName} />
      {/* 町・番地 */}
      <Input value={leaveStockForUpdate?.townName || ""} changeFunction={handleOnChangeTownName} />
      {/* マンション・ビル名 */}
      <Input value={leaveStockForUpdate?.buildingName || ""} changeFunction={handleOnChangeBuildingName} />
      {/* 識別名 */}
      <Input value={leaveStockForUpdate?.name || ""} changeFunction={handleOnChangeShopName} />
      {/* 電話番号 */}
      <Input value={leaveStockForUpdate?.tel || ""} changeFunction={handleOnChangeTel} />
      <InputOfRemark
        id={"publicRemarks"}
        text={"備考"}
        value={leaveStockForUpdate?.publicRemarks || ""}
        file={leaveStockForUpdate?.publicRemarksFile}
        changeTextFunction={async (e: ChangeEvent<HTMLInputElement>) => {
          await handleOnChangePublicRemarks(e);
        }}
        changeFileFunction={async (e: ChangeEvent<HTMLInputElement>) => {
          await handleOnChangePublicRemarksFile(e);
        }}
      />
      <div className={`${commonClasses.flex__wrapper} ${commonClasses.justify_between} ${commonClasses.aline_end}`}>
        <SelectAndLabel
          id={"shipFromAddress"}
          options={shipFromAddressOptions}
          text={"配送元"}
          isRequired
          isLarge
          value={leaveStockForUpdate?.defaultShipFromAddress}
          changeFunction={handleOnChangeShipFromAddress}
        />
      </div>
      {/* todo: PH2 にて運送会社マスタを追加するためコメントアウト */}
      {/*<div className={commonClasses.mt_24}>*/}
      {/*  <SelectAndLabel options={shipToAddressOptions} text={"運送会社"} isRequired></SelectAndLabel>*/}
      {/*</div>*/}
      <div className={commonClasses.mt_24}>
        <FormButton text={"出荷依頼"} color={"green"} onClick={updateLeaveStock} />
        <Paragraph isLink isCenter isMarginTop clickFunction={handleOnCloseButtonClick}>
          出荷依頼をやめる
        </Paragraph>
      </div>
    </EduITModal>
  );
};

export default LeaveStockCreateModal;
