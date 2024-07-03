"use client";

import React, { ReactElement, useEffect } from "react";
import UnorderedList from "@/components/atoms/list/unorderedList";
import MenuListItem from "@/components/atoms/list/menuListItem";
import Link from "next/link";
import Paragraph from "@/components/atoms/text/paragraph";
import FlexWrapper from "@/components/atoms/div/wrapper/flexWrapper";
import MenuSelect from "@/components/atoms/form/menuSelect";
import Details from "@/components/atoms/toggle/details";
import Summary from "@/components/atoms/toggle/summary";
import { CustomerDbTableType } from "@/types/db/customer";
import { useIndex } from "@/hooks/customer/menu/useAccessibleIndex";
import Loading from "@/components/molecules/common/loading";
import { UUID } from "@/lib/uuid";
import { Else, If, Then } from "react-if";

const CustomerMenu = ({ hubCode, customer }: { hubCode: string; customer?: CustomerDbTableType; }): ReactElement => {
  const { getAccessibleMenu, menuForSideMenu } = useIndex();

  useEffect((): void => {
    (async (): Promise<void> => {
      await getAccessibleMenu();
    })();
  }, [ getAccessibleMenu ]);

  if (menuForSideMenu === null) {
    return (
      <div className="text-white bg-[#323673] pt-20 pb-4 min-h-screen w-[250px] min-w-[250px]">
        <Loading />
      </div>
    );
  }

  return (
    <div className="text-white bg-[#323673] pt-20 pb-4 min-h-screen w-[250px] min-w-[250px]">
      <UnorderedList>
        <MenuListItem>
          <MenuSelect isCustomer defaultSelectValue={customer?.currentHubId} />
        </MenuListItem>

        {menuForSideMenu.map(menu => {
          return (
            <MenuListItem key={UUID.generate()}>
              {/* 同じ親メニューでない場合  */}
              <If condition={!menu.isSameMainMenu}>
                <Then>
                  <If condition={menu.subMenu === null}>
                    {/* サブメニューがない = トップメニューのみ */}
                    <Then>
                      <FlexWrapper>
                        <span className="!text-[18px] material-symbols-outlined">{menu.mainMenuIcon}</span>
                        <Link
                          href={menu.mainMenuPath?.replace("[hubCode]", hubCode) ?? "/"}
                          className="text-[12px] text-white"
                        >{menu.mainMenuName}</Link>
                      </FlexWrapper>
                    </Then>
                    <Else>
                      <Details>
                        <Summary isMenu>
                          <FlexWrapper>
                            <span className="!text-[18px] material-symbols-outlined">{menu.mainMenuIcon}</span>
                            <Paragraph text="注文管理" color="white" fontSize="12px" />
                          </FlexWrapper>
                        </Summary>
                        <UnorderedList>
                          {menu.subMenu?.map(subMenu => {
                            return (
                              <MenuListItem isInDetails key={UUID.generate()}>
                                <Link
                                  href={subMenu.subMenuPath?.replace("[hubCode]", hubCode) ?? "/"}
                                  className="text-[12px] text-white"
                                >{subMenu.subMenuName}</Link>
                              </MenuListItem>
                            );
                          })}
                        </UnorderedList>
                      </Details>
                    </Else>
                  </If>
                </Then>
              </If>
            </MenuListItem>
          );
        })}
      </UnorderedList>
    </div>
  );
};

export default CustomerMenu;
