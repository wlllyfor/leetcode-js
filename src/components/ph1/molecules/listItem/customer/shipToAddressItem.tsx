"use client";

import { Dispatch, ReactElement, SetStateAction } from "react";
import commonClasses from "@/styles/common/page.module.scss";
import WhiteWideWrapper from "@/components/atoms/div/wrapper/whiteWideWrapper";
import Paragraph from "@/components/atoms/paragraph";
import SmallButton from "@/components/atoms/button/smallButton";
import { ShipToAddressDbTableType } from "@/types/db/shipToAddress";

const ShipToAddressItem = ({
  shipToAddress,
  handleOnClickOpenEditModal,
  setSelectedShipToAddress,
  handleOnClickOpenDeleteModal,
}: {
  shipToAddress: ShipToAddressDbTableType;
  handleOnClickOpenEditModal: () => void;
  handleOnClickOpenDeleteModal: () => void;
  setSelectedShipToAddress: Dispatch<SetStateAction<ShipToAddressDbTableType | null>>;
}): ReactElement => {
  const classNamesMr16 = [
    commonClasses.flex__wrapper,
    commonClasses.aline_center,
    commonClasses.mt_8,
    commonClasses.c_mr_16,
  ];

  const classNamesMbAuto = [
    commonClasses.flex__wrapper,
    commonClasses.aline_end,
    commonClasses.column,
    commonClasses.mb_auto,
    commonClasses.mr_16,
    commonClasses.mb_auto,
  ];

  return (
    <WhiteWideWrapper>
      <div className={`${commonClasses.flex__wrapper} ${commonClasses.aline_center}`}>
        <div className={commonClasses.ml_16}>
          <div className={classNamesMr16.join(" ")}>
            <Paragraph>国：{shipToAddress.country?.name}</Paragraph>
            <Paragraph>郵便番号：{shipToAddress.postalCode}</Paragraph>
            <Paragraph>電話番号：{shipToAddress.tel}</Paragraph>
          </div>
          <div className={classNamesMr16.join(" ")}>
            <Paragraph>都道府県：{shipToAddress.prefectureName}</Paragraph>
            <Paragraph>市区群町村：{shipToAddress.cityName}</Paragraph>
            <Paragraph>町・番地：{shipToAddress.townName}</Paragraph>
            <Paragraph>マンション・ビル名：{shipToAddress.buildingName}</Paragraph>
          </div>
          <div className={classNamesMr16.join(" ")}>
            <Paragraph>氏名：{shipToAddress.name}</Paragraph>
          </div>
        </div>
        <div className={classNamesMbAuto.join(" ")}>
          <div className={commonClasses.mt_16}>
            <div className={commonClasses.mt_4}>
              <SmallButton
                text={"編集"}
                isBlue
                clickFunction={(): void => {
                  setSelectedShipToAddress(prevState => shipToAddress);
                  handleOnClickOpenEditModal();
                }}
              />
            </div>
            <div className={commonClasses.mt_4}>
              <SmallButton
                text={"削除"}
                isRed
                clickFunction={(): void => {
                  setSelectedShipToAddress(prevState => shipToAddress);
                  handleOnClickOpenDeleteModal();
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </WhiteWideWrapper>
  );
};

export default ShipToAddressItem;
