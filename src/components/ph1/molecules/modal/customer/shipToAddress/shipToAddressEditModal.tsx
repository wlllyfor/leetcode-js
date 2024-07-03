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
import { ReactSelectOption } from "@/types/reactSelectOptions/ReactSelectOption";
import Error422 from "@/components/molecules/errors/error422";
import Loading from "@/components/molecules/common/loading";
import { ShipToAddressDbTableType } from "@/types/db/shipToAddress";
import { useUpdate } from "@/hooks/customer/shipToAddress/useUpdate";
import { Integer } from "@/lib/integer";

const ShipToAddressEditModal = ({
  prevShipToAddress,
  isOpen,
  handleOnCloseButtonClick,
  handleOnClickUpdateButton,
}: {
  prevShipToAddress: ShipToAddressDbTableType | null;
  isOpen: boolean;
  handleOnCloseButtonClick: () => void;
  handleOnClickUpdateButton: () => void;
}): ReactElement => {
  const {
    putShipToAddress,
    shipFromAddressForUpdate,
    setShipFromAddressForUpdate,
    isUpdated,
    setIsUpdated,
    validationErrors,
    setValidationErrors,
  } = useUpdate();

  const { getCountries, options } = useIndex();

  useEffect((): void => {
    if (isOpen && prevShipToAddress) {
      setShipFromAddressForUpdate(prevState => {
        return {
          id: prevShipToAddress.id,
          countryId: prevShipToAddress.countryId ?? null,
          postalCode: prevShipToAddress.postalCode ?? "",
          prefectureName: prevShipToAddress.prefectureName ?? "",
          cityName: prevShipToAddress.cityName ?? "",
          townName: prevShipToAddress.townName ?? "",
          buildingName: prevShipToAddress.buildingName ?? "",
          name: prevShipToAddress.name ?? "",
          tel: prevShipToAddress.tel ?? "",
        };
      });
      setValidationErrors(prevState => []);
      setIsUpdated(prevState => false);
      getCountries();
    }
  }, [ isOpen, prevShipToAddress, setShipFromAddressForUpdate, getCountries, setValidationErrors, setIsUpdated ]);

  useEffect((): void => {
    if (isUpdated) {
      handleOnClickUpdateButton();
    }
  }, [ isUpdated, handleOnClickUpdateButton ]);

  if (isOpen && !prevShipToAddress) {
    return <Loading />;
  }

  /**
   * 国名変更イベント
   * @param e
   */
  const handleOnCountryIdChange = (e: ReactSelectOption): void => {
    setShipFromAddressForUpdate(prevState => {
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
    setShipFromAddressForUpdate(prevState => {
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
    setShipFromAddressForUpdate(prevState => {
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
    setShipFromAddressForUpdate(prevState => {
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
    setShipFromAddressForUpdate(prevState => {
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
    setShipFromAddressForUpdate(prevState => {
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
    setShipFromAddressForUpdate(prevState => {
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
    setShipFromAddressForUpdate(prevState => {
      return {
        ...prevState,
        tel: e.target.value,
      };
    });
  };

  return (
    <EduITModal isOpen={isOpen}>
      <H2>配送先編集</H2>
      <Error422 errors={validationErrors} />
      <InputAndLabel
        id={"name"}
        text={"識別名"}
        value={shipFromAddressForUpdate.name}
        isRequired
        placeholder={"会社名等"}
        changeFunction={handleOnNameChange}
      />
      <SelectAndLabel
        id={"country"}
        options={options}
        text={"国名"}
        isRequired
        value={
          {
            label: prevShipToAddress?.country?.name,
            value: prevShipToAddress?.countryId,
          } as ReactSelectOption
        }
        changeFunction={handleOnCountryIdChange}
      />
      <InputAndLabel
        id={"postalCode"}
        text={"郵便番号"}
        value={shipFromAddressForUpdate.postalCode ?? ""}
        isRequired
        placeholder={"000-0000"}
        changeFunction={handleOnPostalCodeChange}
      />
      <InputAndLabel
        id={"prefectureName"}
        text={"都道府県"}
        value={shipFromAddressForUpdate.prefectureName}
        isRequired
        placeholder={"東京都"}
        changeFunction={handleOnPrefectureNameChange}
      />
      <InputAndLabel
        id={"cityName"}
        text={"市区群町村"}
        value={shipFromAddressForUpdate.cityName}
        isRequired
        placeholder={"XX市XX区"}
        changeFunction={handleOnCityNameChange}
      />
      <InputAndLabel
        id={"townName"}
        text={"町・番地"}
        value={shipFromAddressForUpdate.townName}
        isRequired
        placeholder={"○○町1-2-3"}
        changeFunction={handleOnTownNameChange}
      />
      <InputAndLabel
        id={"buildingName"}
        text={"マンション・ビル名"}
        value={shipFromAddressForUpdate.buildingName}
        placeholder={"△△ビル0号"}
        changeFunction={handleOnBuildingNameChange}
      />
      <InputAndLabel
        id={"tel"}
        text={"電話番号"}
        value={shipFromAddressForUpdate.tel}
        isRequired
        placeholder={"000-000-0000"}
        changeFunction={handleOnTelChange}
      />
      <div className={commonClasses.mt_24}>
        <FormButton
          text={"編集する"}
          color={"green"}
          onClick={async (): Promise<void> => {
            if (prevShipToAddress) {
              putShipToAddress();
            }
          }}
        />
        <Paragraph isLink isCenter isMarginTop clickFunction={handleOnCloseButtonClick}>
          配送先マスタへ戻る
        </Paragraph>
      </div>
    </EduITModal>
  );
};

export default ShipToAddressEditModal;
