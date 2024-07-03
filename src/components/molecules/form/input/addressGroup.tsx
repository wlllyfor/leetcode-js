"use client";

import { ReactElement, useCallback, useEffect, useState } from "react";
import FlexWrapper from "@/components/atoms/div/wrapper/flexWrapper";
import ContentAreaWrapper from "@/components/atoms/div/wrapper/contentAreaWrapper";
import Label from "@/components/atoms/form/label";
import Paragraph from "@/components/atoms/text/paragraph";
import InputWrapper80 from "@/components/atoms/div/wrapper/inputWrapper80";
import AddressSelectGroup from "@/components/molecules/form/select/addressSelectGroup";
import { AddressGroupType } from "@/types/components/atoms/form/AddressGroupType";
import { useAddress } from "@/hooks/customer/profile/useAddress";
import Input from "@/components/atoms/form/input";
import { ReactSelectOption } from "@/types/reactSelectOptions/ReactSelectOption";

const AddressGroup = ({ title, isRequired, options, initialAddress, changeAddressFunction }: AddressGroupType): ReactElement => {
  const { address, setAddress } = useAddress();
  const [ isInitialized, setIsInitialized ] = useState<boolean>(false);
  /** 初期値のセット */
  useEffect(() => {
    if (!isInitialized && initialAddress && typeof initialAddress.country_id === "number") {
      setAddress(prevState => initialAddress);

      setIsInitialized(prevState => true);
    }
  }, [ initialAddress, setAddress, isInitialized ]);

  const handleChangeCountry = useCallback((option: ReactSelectOption) => {
    if (option && typeof option.value === "number") {
      setAddress({ ...address, country_id: option.value });
    }
  }, [ address, setAddress ]);

  useEffect(() => {
    if(changeAddressFunction) {
      changeAddressFunction(address);
    }
  }, [ address, changeAddressFunction ]);

  return (
    <>
      <InputWrapper80>
        <Label text={title} isRequired={isRequired} />
        <ContentAreaWrapper>
          <FlexWrapper>
            <AddressSelectGroup
              text="顧客住所"
              options={options ?? []}
              value={options?.find(opt => opt.value === address.country_id)}
              changeFunction={opt => handleChangeCountry(opt)}
            />
            <Paragraph text="国/Country" />
          </FlexWrapper>
        </ContentAreaWrapper>
        <ContentAreaWrapper>
          <Input
            id="postal_code"
            value={address.postal_code}
            placeholder="郵便番号/POSTAL CODE"
            isRequired
            isDisabled={false}
            onChange={e => setAddress({ ...address, postal_code: e.target.value })}
            isAutocomplete={false}
          />
        </ContentAreaWrapper>
        <ContentAreaWrapper>
          <Input
            id="prefectures"
            value={address.prefecture_name}
            placeholder="都道府県/TOKYO"
            isRequired
            isDisabled={false}
            onChange={e => setAddress({ ...address, prefecture_name: e.target.value })}
            isAutocomplete={false}
          />
        </ContentAreaWrapper>
        <ContentAreaWrapper>
          <Input
            id="city"
            value={address.city_name}
            placeholder="市区群町村/CITY"
            isRequired
            isDisabled={false}
            onChange={e => setAddress({ ...address, city_name: e.target.value })}
            isAutocomplete={false}
          />
        </ContentAreaWrapper>
        <ContentAreaWrapper>
          <Input
            id="town_name"
            value={address.town_name}
            placeholder="番地/6-8-15,sezaki"
            isRequired
            isDisabled={false}
            onChange={e => setAddress({ ...address, town_name: e.target.value })}
            isAutocomplete={false}
          />
        </ContentAreaWrapper>
        <ContentAreaWrapper>
          <Input
            id="building_name"
            value={address.building_name}
            placeholder="建物名・部屋番号/BUILDING NAME"
            isRequired={false}
            isDisabled={false}
            onChange={e => setAddress({ ...address, building_name: e.target.value })}
            isAutocomplete={false}
          />
        </ContentAreaWrapper>
        <ContentAreaWrapper>
          <Input
            id="tel"
            value={address.tel}
            placeholder="電話番号/TEL"
            isRequired={false}
            isDisabled={false}
            onChange={e => setAddress({ ...address, tel: e.target.value })}
            isAutocomplete={false}
          />
        </ContentAreaWrapper>
      </InputWrapper80>
    </>
  );
};

export default AddressGroup;
