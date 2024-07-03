"use client";

import H2 from "@/components/atoms/h2";
import InputAndLabel from "@/components/molecules/inputs/inputAndLabel";
import FormButton from "@/components/atoms/button/formButton";
import commonClasses from "@/styles/common/page.module.scss";
import Paragraph from "@/components/atoms/paragraph";
import { ChangeEvent, ReactElement, useEffect } from "react";
import SelectAndLabel from "@/components/molecules/selectAndLabel";
import { EduITModal } from "@/components/molecules/eduITModal";
import { useIndex } from "@/hooks/common/country/useIndex";
import { useStore } from "@/hooks/customer/shipToAddress/useStore";
import Error422 from "@/components/molecules/errors/error422";
import Loading from "@/components/molecules/common/loading";
import { Integer } from "@/lib/integer";

const ShipToAddressCreateModal = ({
  isOpen,
  handleOnCloseButtonClick,
  handleOnClickStoreButton,
}: {
  isOpen: boolean;
  handleOnCloseButtonClick: () => void;
  handleOnClickStoreButton: () => void;
}): ReactElement => {
  const {
    postShipToAddress,
    shipToAddressForStore,
    setShipToAddressForStore,
    isStored,
    setIsStored,
    validationErrors,
    setValidationErrors,
  } = useStore();

  const { getCountries, options } = useIndex();

  useEffect((): void => {
    if (isOpen) {
      setShipToAddressForStore(prevState => {
        return {
          countryId: null,
          postalCode: "",
          prefectureName: "",
          cityName: "",
          townName: "",
          buildingName: "",
          name: "",
          tel: "",
        };
      });
      setValidationErrors(prevState => []);
      setIsStored(prevState => false);
    }
  }, [ isOpen, setShipToAddressForStore, setValidationErrors, setIsStored ]);

  useEffect((): void => {
    (async (): Promise<void> => {
      await getCountries();
    })();
  }, [ getCountries ]);

  useEffect((): void => {
    if (isOpen && isStored) {
      handleOnClickStoreButton();
    }
  }, [ isOpen, isStored, handleOnClickStoreButton ]);

  /**
   * 国名変更イベント
   * @param e
   */
  const handleOnCountryIdChange = (e: { value: string | number; label: string; }): void => {
    setShipToAddressForStore(prevState => {
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
  const handleOnPostalCodeChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setShipToAddressForStore(prevState => {
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
  const handleOnPrefectureNameChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setShipToAddressForStore(prevState => {
      return {
        ...prevState,
        prefectureName: e.target.value,
      };
    });
  };

  /**
   * 市名変更イベント
   * @param e
   */
  const handleOnCityNameChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setShipToAddressForStore(prevState => {
      return {
        ...prevState,
        cityName: e.target.value,
      };
    });
  };

  /**
   * 町名変更イベント
   * @param e
   */
  const handleOnTownNameChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setShipToAddressForStore(prevState => {
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
  const handleOnBuildingNameChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setShipToAddressForStore(prevState => {
      return {
        ...prevState,
        buildingName: e.target.value,
      };
    });
  };

  /**
   * 識別名変更イベント
   * @param e
   */
  const handleOnNameChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setShipToAddressForStore(prevState => {
      return {
        ...prevState,
        name: e.target.value,
      };
    });
  };

  /**
   * 町名変更イベント
   * @param e
   */
  const handleOnTelChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setShipToAddressForStore(prevState => {
      return {
        ...prevState,
        tel: e.target.value,
      };
    });
  };

  if (!options) {
    return <Loading />;
  }

  return (
    <EduITModal isOpen={isOpen}>
      <H2>配送先追加</H2>
      <Error422 errors={validationErrors} />
      <InputAndLabel
        id={"name"}
        text={"識別名"}
        value={shipToAddressForStore.name}
        placeholder={"会社名等"}
        isRequired
        changeFunction={handleOnNameChange}
      />
      <SelectAndLabel
        id={"country"}
        options={options}
        text={"国名"}
        isRequired
        changeFunction={handleOnCountryIdChange}
      />
      <InputAndLabel
        id={"postalCode"}
        text={"郵便番号"}
        value={shipToAddressForStore.postalCode ?? ""}
        isRequired
        placeholder={"000-0000"}
        changeFunction={handleOnPostalCodeChange}
      />
      <InputAndLabel
        id={"prefectureName"}
        text={"都道府県"}
        value={shipToAddressForStore.prefectureName}
        isRequired
        placeholder={"東京都"}
        changeFunction={handleOnPrefectureNameChange}
      />
      <InputAndLabel
        id={"cityName"}
        text={"市区群町村"}
        value={shipToAddressForStore.cityName}
        isRequired
        placeholder={"XX市XX区"}
        changeFunction={handleOnCityNameChange}
      />
      <InputAndLabel
        id={"townName"}
        text={"町・番地"}
        value={shipToAddressForStore.townName}
        isRequired
        placeholder={"○○町1-2-3"}
        changeFunction={handleOnTownNameChange}
      />
      <InputAndLabel
        id={"buildingName"}
        text={"マンション・ビル名"}
        value={shipToAddressForStore.buildingName}
        placeholder={"△△ビル0号"}
        changeFunction={handleOnBuildingNameChange}
      />
      <InputAndLabel
        id={"tel"}
        text={"電話番号"}
        value={shipToAddressForStore.tel}
        isRequired
        placeholder={"000-000-0000"}
        changeFunction={handleOnTelChange}
      />
      <div className={commonClasses.mt_24}>
        <FormButton text={"保存する"} color={"green"} onClick={postShipToAddress} />
        <Paragraph isLink isCenter isMarginTop clickFunction={handleOnCloseButtonClick}>
          配送先マスタへ戻る
        </Paragraph>
      </div>
    </EduITModal>
  );
};

export default ShipToAddressCreateModal;
