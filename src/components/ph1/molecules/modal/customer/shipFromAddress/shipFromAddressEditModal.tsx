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
import { ShipFromAddressDbTableType } from "@/types/db/shipFromAddress";
import { useUpdate } from "@/hooks/customer/shipFromAddress/useUpdate";
import { Integer } from "@/lib/integer";

const ShipFromAddressEditModal = ({
  prevShipFromAddress,
  isOpen,
  handleOnCloseButtonClick,
  handleOnClickUpdateButton,
}: {
  prevShipFromAddress: ShipFromAddressDbTableType | null;
  isOpen: boolean;
  handleOnCloseButtonClick: () => void;
  handleOnClickUpdateButton: () => void;
}): ReactElement => {
  const {
    putShipFromAddress,
    shipFromAddressForUpdate,
    setShipFromAddressForUpdate,
    isUpdated,
    setIsUpdated,
    validationErrors,
    setValidationErrors,
  } = useUpdate();

  const { getCountries, options } = useIndex();

  useEffect((): void => {
    if (isOpen && prevShipFromAddress) {
      setShipFromAddressForUpdate(prevState => {
        return {
          id: prevShipFromAddress.id,
          countryId: prevShipFromAddress.countryId ?? null,
          postalCode: prevShipFromAddress.postalCode ?? "",
          prefectureName: prevShipFromAddress.prefectureName ?? "",
          cityName: prevShipFromAddress.cityName ?? "",
          townName: prevShipFromAddress.townName ?? "",
          buildingName: prevShipFromAddress.buildingName ?? "",
          name: prevShipFromAddress.name ?? "",
          tel: prevShipFromAddress.tel ?? "",
          isDefault: false,
        };
      });
      (async (): Promise<void> => {
        await getCountries();
      })();

      setValidationErrors(prevState => []);
      setIsUpdated(prevState => false);
    }
  }, [ isOpen, prevShipFromAddress, setShipFromAddressForUpdate, getCountries, setValidationErrors, setIsUpdated ]);

  useEffect((): void => {
    if (isUpdated) {
      handleOnClickUpdateButton();
    }
  }, [ isUpdated, handleOnClickUpdateButton ]);

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
   * 電話番号変更イベント
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
        changeFunction={handleOnNameChange}
      />
      <SelectAndLabel
        id={"country"}
        options={options}
        text={"国名"}
        isRequired
        value={
          {
            label: prevShipFromAddress?.country?.name,
            value: prevShipFromAddress?.countryId,
          } as ReactSelectOption
        }
        changeFunction={handleOnCountryIdChange}
      />
      <InputAndLabel
        id={"postalCode"}
        text={"郵便番号"}
        value={shipFromAddressForUpdate.postalCode ?? ""}
        isRequired
        changeFunction={handleOnPostalCodeChange}
      />
      <InputAndLabel
        id={"prefectureName"}
        text={"都道府県"}
        value={shipFromAddressForUpdate.prefectureName}
        isRequired
        changeFunction={handleOnPrefectureNameChange}
      />
      <InputAndLabel
        id={"cityName"}
        text={"市区群町村"}
        value={shipFromAddressForUpdate.cityName}
        isRequired
        changeFunction={handleOnCityNameChange}
      />
      <InputAndLabel
        id={"townName"}
        text={"町・番地"}
        value={shipFromAddressForUpdate.townName}
        isRequired
        changeFunction={handleOnTownNameChange}
      />
      <InputAndLabel
        id={"buildingName"}
        text={"マンション・ビル名"}
        value={shipFromAddressForUpdate.buildingName}
        changeFunction={handleOnBuildingNameChange}
      />
      <InputAndLabel
        id={"tel"}
        text={"電話番号"}
        value={shipFromAddressForUpdate.tel}
        isRequired
        changeFunction={handleOnTelChange}
      />
      <div className={commonClasses.mt_24}>
        <FormButton
          text={"編集する"}
          color={"green"}
          onClick={(): void => {
            if (prevShipFromAddress) {
              putShipFromAddress();
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

export default ShipFromAddressEditModal;
