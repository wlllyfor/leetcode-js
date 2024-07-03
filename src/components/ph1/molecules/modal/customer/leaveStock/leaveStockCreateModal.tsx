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
import { defaultLeaveStockForPostType, LeaveStockForPostType, useStore } from "@/hooks/customer/leaveStock/useStore";
import { useIndex as useShipFromAddressIndex } from "@/hooks/customer/shipFromAddress/useIndex";
import { useIndex as useShipToAddressIndex } from "@/hooks/customer/shipToAddress/useIndex";
import { useIndex as useProductIndex } from "@/hooks/customer/product/useIndex";
import { useIndex as useCountryIndex } from "@/hooks/common/country/useIndex";
import Error422 from "@/components/molecules/errors/error422";
import { ReactSelectOption } from "@/types/reactSelectOptions/ReactSelectOption";
import { useFind } from "@/hooks/customer/shipToAddress/useFind";
import { Integer } from "@/lib/integer";
import { UUID } from "@/lib/uuid";

const LeaveStockCreateModal = ({
  isOpen,
  handleOnCloseButtonClick,
  handleOnClickStoreButton,
  srcProductIdList,
  hubCode,
}: {
  isOpen: boolean;
  handleOnCloseButtonClick: () => void;
  handleOnClickStoreButton: () => void;
  srcProductIdList?: string;
  hubCode: string;
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
      setIsStored(prevState => false);
      setLeaveStockForPost(prevState => {
        return {
          ...defaultLeaveStockForPostType,
          hubCode: hubCode,
        };
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
    setIsStored,
    getShipToAddresses,
    getShipFromAddresses,
    getProducts,
    getCountries,
    setLeaveStockForPost,
    srcProductIdList,
    hubCode,
  ]);

  useEffect((): void => {
    if (isOpen && productOptions && srcProductIdList) {
      // モーダルオープン時、且つ、オプションが取得されており、且つ、パラメータにsrcProductIdListがある場合。

      const srcProductIdArray = srcProductIdList.split(",").map(Number);
      const filteredSrcOptions = productOptions.filter(option => {
        return srcProductIdArray.includes(parseInt(option.value.toString(), 10));
      });
      setLeaveStockForPost(prevState => {
        return {
          hubCode: hubCode,
          productAndQuantities: filteredSrcOptions.map(item => {
            return {
              option: item,
              quantity: 0,
              uuid: UUID.generate(),
            };
          }),
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
  }, [ isOpen, productOptions, srcProductIdList, setLeaveStockForPost, hubCode ]);

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
   * 追加ボタンクリック
   */
  const handleOnClickAddButton = async (): Promise<void> => {
    setLeaveStockForPost(prevState => {
      if (!prevState) {
        return defaultLeaveStockForPostType;
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
      } as LeaveStockForPostType;
    });
  };

  /**
   * 商品変更イベント
   * @param uuid
   * @param e
   */
  const handleOnChangeProduct = async (uuid: string, e: ReactSelectOption): Promise<void> => {
    setLeaveStockForPost(prevState => {
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
      await getShipToAddressById(leaveStockForPost.shipToAddressId);
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
      {leaveStockForPost?.productAndQuantities &&
        leaveStockForPost.productAndQuantities.map((productAndQuantity, index) => {
          return (
            <div key={productAndQuantity.uuid} className={classNames.join(" ")}>
              <SelectAndLabel
                id={"productName"}
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
