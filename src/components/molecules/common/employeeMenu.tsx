"use client";

import { ReactElement, useEffect } from "react";
import UnorderedList from "@/components/atoms/list/unorderedList";
import MenuListItem from "@/components/atoms/list/menuListItem";
import Link from "next/link";
import Paragraph from "@/components/atoms/text/paragraph";
import FlexWrapper from "@/components/atoms/div/wrapper/flexWrapper";
import MenuSelect from "@/components/atoms/form/menuSelect";
import Loading from "@/components/molecules/common/loading";
import { UUID } from "@/lib/uuid";
import { useIndex } from "@/hooks/employee/menu/useAccessibleIndex";
import { Else, If, Then } from "react-if";
import { routes } from "@/routes";

const EmployeeMenu = (): ReactElement => {

  const { getAccessibleMenu, menuForSideMenu } = useIndex();

  useEffect((): void => {
    (async (): Promise<void> => {
      await getAccessibleMenu();
    })();
  }, [ getAccessibleMenu ]);

  if (menuForSideMenu === null) {
    return (
      <div className="text-white bg-[#343434] pt-16 pb-4 min-h-screen w-[250px] min-w-[250px]">
        <Loading />
      </div>
    );
  }

  return (
    <div className="text-white bg-[#343434] pt-16 pb-4 min-h-screen w-[250px] min-w-[250px]">
      <UnorderedList>
        <MenuListItem>
          <MenuSelect />
        </MenuListItem>

        {menuForSideMenu.map(menu => {
          return (
            <MenuListItem key={UUID.generate()}>
              <If condition={!menu.isSameMainMenu}>
                <Then>
                  <FlexWrapper>
                    <span className="!text-[18px] material-symbols-outlined">{menu.mainMenuIcon}</span>
                    <Paragraph text={menu.mainMenuName} fontSize="10px" color="white" />
                  </FlexWrapper>
                </Then>
              </If>

              <If condition={menu.subMenu === null}>
                <Then>
                  {/* サブメニューが存在しない(親メニューのみ) */}
                  <div className="py-2 pl-12 w-[250px] ml-[-1.5rem]">
                    <Link href={menu.mainMenuPath ?? routes.front.employee.dashboard.url}>
                      <Paragraph text={menu.mainMenuName} color="white" fontSize="12px" />
                    </Link>
                  </div>
                </Then>
                <Else>
                  {menu.subMenu?.map(sub => {
                    return (
                      <div className="py-2 pl-12 w-[250px] ml-[-1.5rem]" key={UUID.generate()}>
                        <Link href={sub.subMenuPath ?? routes.front.employee.dashboard.url}>
                          <Paragraph text={sub.subMenuName} color="white" fontSize="12px" />
                        </Link>
                      </div>
                    );
                  })}
                </Else>
              </If>
            </MenuListItem>
          );
        })}
      </UnorderedList>
    </div>
  );
};

export default EmployeeMenu;
