"use client";

import React, { ReactElement } from "react";
import classes from "@/styles/components/molecules/toggle.module.scss";
import { ToggleType } from "@/types/components/molecules/ToggleType";
import UnorderedList from "@/components/atoms/unorderedList";
import List from "@/components/atoms/list";
import Img from "@/components/atoms/img";
import Details from "@/components/atoms/details";
import Summary from "@/components/atoms/summary";
import Paragraph from "@/components/atoms/paragraph";
import toggleIcon from "@/resource/img/select_arrow.svg";
import { UUID } from "@/lib/uuid";

const Toggle = ({ receiveStock }: ToggleType): ReactElement => {
  const total = receiveStock.receiveStockCommissions.reduce((total, commission) => {
    return total + commission.price;
  }, 0);

  return (
    <div className={`${classes.toggle}`}>
      <Details>
        <Summary>
          <Paragraph>手数料合計：{total.toLocaleString()}円</Paragraph>
          <Img src={toggleIcon} alt={"▼"} />
        </Summary>
        <UnorderedList>
          {receiveStock &&
            receiveStock.receiveStockCommissions.map(commission => {
              return (
                <List key={UUID.generate()}>
                  <Paragraph>手数料詳細：{commission.name}</Paragraph>
                  <Paragraph>手数料：{commission.price.toLocaleString()}円</Paragraph>
                </List>
              );
            })}
        </UnorderedList>
      </Details>
    </div>
  );
};

export default Toggle;
