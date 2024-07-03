"use client";

import { ChangeEvent, ReactElement, useEffect, useState } from "react";
import Input from "@/components/atoms/form/input";
import Label from "@/components/atoms/form/label";
import InputWrapper80 from "@/components/atoms/div/wrapper/inputWrapper80";
import InputRadio from "@/components/molecules/form/input/inputRadio";
import { LabelType } from "@/types/components/atoms/form/LabelType";
import { InputAddressGroupType } from "@/types/components/molecules/form/input/InputAddressGroupType";
import { useAddress } from "@/hooks/employee/hubs/useAddress";

const InputAddressGroup = ({
  text,
  changeAddressFunction,
  changeDomesticFunction,
  initialAddress,
  format,
}: InputAddressGroupType): ReactElement => {
  const { address, setAddress } = useAddress();
  const [ selectedOption, setSelectedOption ] = useState<string>(format || "domestic");
  const [ isInitialized, setIsInitialized ] = useState<boolean>(false);

  const handleRadioChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSelectedOption(event.target.value);
  };

  const labelProps: LabelType = {
    text: text,
    isRequired: true,
  };

  useEffect(() => {
    setSelectedOption(format || "domestic");
  }, [ format ]);

  /** 初期値のセット */
  useEffect(() => {
    if (!isInitialized && initialAddress) {
      setAddress(initialAddress);
      setIsInitialized(true);
    }
  }, [ initialAddress, setAddress, isInitialized ]);

  useEffect(() => {
    changeAddressFunction(address);
    changeDomesticFunction(selectedOption === "domestic");
  }, [ address, selectedOption, changeAddressFunction, changeDomesticFunction ]);

  return (
    <InputWrapper80>
      <Label {...labelProps} />
      <div className="mb-2 flex justify-between">
        <InputRadio
          name="radioGroup"
          fontSize={"12px"}
          options={[
            { id: "domestic", text: "国内フォーマット" },
            { id: "international", text: "国際フォーマット" },
          ]}
          onChange={handleRadioChange}
          initialValue={format}
        />
      </div>
      {/* post code */}
      <div className="mb-2">
        <Input
          id={"postCode"}
          value={address.postal_code}
          onChange={e => setAddress({ ...address, postal_code: e.target.value })}
          placeholder={selectedOption === "domestic" ? "郵便番号(任意)" : "POST CODE"}
          isRequired={false}
          isDisabled={false}
          isAutocomplete={false}
        />
      </div>
      {/* prefectures */}
      <div className="mb-2">
        <Input
          id={"prefectures"}
          value={address.prefecture_name}
          onChange={e => setAddress({ ...address, prefecture_name: e.target.value })}
          placeholder={selectedOption === "domestic" ? "都道府県" : "TOKYO"}
          isRequired
          isDisabled={false}
          isAutocomplete={false}
        />
      </div>
      {/* city */}
      <div className="mb-2">
        <Input
          id={"city"}
          value={address.city_name}
          onChange={e => setAddress({ ...address, city_name: e.target.value })}
          placeholder={selectedOption === "domestic" ? "市区群町村" : "CITY"}
          isRequired
          isDisabled={false}
          isAutocomplete={false}
        />
      </div>
      {/* town name */}
      <div className="mb-2">
        <Input
          id={"town_name"}
          value={address.town_name}
          onChange={e => setAddress({ ...address, town_name: e.target.value })}
          placeholder={selectedOption === "domestic" ? "番地" : "6-8-15 ,sezaki"}
          isRequired
          isDisabled={false}
          isAutocomplete={false}
        />
      </div>
      {/* building */}
      <div className="mb-2">
        <Input
          id={"building_name"}
          value={address.building_name}
          onChange={e => setAddress({ ...address, building_name: e.target.value })}
          placeholder={selectedOption === "domestic" ? "建物名(任意)" : "BUILDING NAME"}
          isRequired={false}
          isDisabled={false}
          isAutocomplete={false}
        />
      </div>
    </InputWrapper80>
  );
};

export default InputAddressGroup;
