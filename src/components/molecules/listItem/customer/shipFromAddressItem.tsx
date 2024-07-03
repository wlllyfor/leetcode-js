"use client";

import { Dispatch, ReactElement, SetStateAction } from "react";
import commonClasses from "@/styles/common/page.module.scss";
import WhiteWideWrapper from "@/components/atoms/div/wrapper/whiteWideWrapper";
import Paragraph from "@/components/atoms/paragraph";
import SmallButton from "@/components/atoms/button/smallButton";
import { ShipFromAddressDbTableType } from "@/types/db/shipFromAddress";

const ShipFromAddressItem = ({
  shipFromAddress,
  handleOnClickOpenEditModal,
  setSelectedShipFromAddress,
  handleOnClickOpenDeleteModal,
}: {
  shipFromAddress: ShipFromAddressDbTableType;
  handleOnClickOpenEditModal: () => void;
  handleOnClickOpenDeleteModal: () => void;
  setSelectedShipFromAddress: Dispatch<SetStateAction<ShipFromAddressDbTableType | null>>;
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
    commonClasses.ml_auto,
    commonClasses.mr_16,
    commonClasses.mb_auto,
  ];

  return (
    <WhiteWideWrapper>
      <div className={`${commonClasses.flex__wrapper} ${commonClasses.aline_center}`}>
        <div className={commonClasses.ml_16}>
          <div className={classNamesMr16.join(" ")}>
            <Paragraph>国：{shipFromAddress.country?.name}</Paragraph>
            <Paragraph>郵便番号：{shipFromAddress.postalCode}</Paragraph>
            <Paragraph>電話番号：{shipFromAddress.tel}</Paragraph>
          </div>
          <div className={classNamesMr16.join(" ")}>
            <Paragraph>都道府県：{shipFromAddress.prefectureName}</Paragraph>
            <Paragraph>市区群町村：{shipFromAddress.cityName}</Paragraph>
            <Paragraph>町・番地：{shipFromAddress.townName}</Paragraph>
            <Paragraph>マンション・ビル名：{shipFromAddress.buildingName}</Paragraph>
          </div>
          <div className={classNamesMr16.join(" ")}>
            <Paragraph>ショップ名（事業者名）：{shipFromAddress.name}</Paragraph>
          </div>
        </div>
        <div className={classNamesMbAuto.join(" ")}>
          <div className={commonClasses.mt_16}>
            <div className={commonClasses.mt_4}>
              <SmallButton
                text={"編集"}
                isBlue
                clickFunction={(): void => {
                  setSelectedShipFromAddress(prevState => shipFromAddress);
                  handleOnClickOpenEditModal();
                }}
              />
            </div>
            <div className={commonClasses.mt_4}>
              <SmallButton
                text={"削除"}
                isRed
                clickFunction={(): void => {
                  setSelectedShipFromAddress(prevState => shipFromAddress);
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

export default ShipFromAddressItem;
