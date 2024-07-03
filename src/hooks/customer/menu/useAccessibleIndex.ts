"use client";

import { useCallback, useState } from "react";
import { routes } from "@/routes";
import { useRecoilValue } from "recoil";
import { CustomerState } from "@/store/Auth/CustomerState";
import { CustomerAuthMenuKeyDbTableType } from "@/types/db/menu/customerAuthMenuKey";
import CustomerAxios from "@/lib/axios/customer-axios";
import { AuthStateType } from "@/store/Auth/AuthState";

interface ApiResponse {
  body: {
    accessibleMenu: CustomerAuthMenuKeyDbTableType;
  };
}

type MenuType = {
  mainMenuName: string;
  mainMenuIcon: string;
  mainMenuPath: string | null;
  subMenu: null | {
    subMenuName: string;
    subMenuPath: string;
  }[];
  isSameMainMenu: boolean;
};

const useIndex = (): {
  customerMenu: CustomerAuthMenuKeyDbTableType | null;
  menuForSideMenu: MenuType[] | null;
  getAccessibleMenu: () => Promise<void>;
} => {
  const auth: AuthStateType = useRecoilValue(CustomerState);
  const [ customerMenu, setCustomerMenu ] = useState<CustomerAuthMenuKeyDbTableType | null>(null);

  const getAccessibleMenu = useCallback(async (): Promise<void> => {
    try {
      CustomerAxios._setToken(auth);
      const response = await CustomerAxios.get<ApiResponse>({
        uri: routes.api.customer.menu.url,
      });

      const accessibleMenu = response.data.body.accessibleMenu as CustomerAuthMenuKeyDbTableType;
      setCustomerMenu(prevState => accessibleMenu);
    } catch (error) {
      CustomerAxios.showErrors(error);
    }
  }, [ auth ]);

  const getFormattedMenu = (data: CustomerAuthMenuKeyDbTableType): MenuType[] => {
    let previousMainMenuId: number | null = null;

    return data.customerAuthMenuValues.map(menuValue => {
      const isSameMainMenu = previousMainMenuId !== null && previousMainMenuId === menuValue.mainMenu.id;
      previousMainMenuId = menuValue.mainMenu.id;

      const formattedMenu: MenuType = {
        mainMenuName: menuValue.mainMenu.title,
        mainMenuIcon: menuValue.mainMenu.icon,
        mainMenuPath: menuValue.mainMenu.path,
        subMenu: menuValue.subMenu ? [ {
          subMenuName: menuValue.subMenu.title,
          subMenuPath: menuValue.subMenu.path,
        } ] : null,
        isSameMainMenu: isSameMainMenu,
      };

      return formattedMenu;
    });
  };

  const menuForSideMenu = customerMenu ? getFormattedMenu(customerMenu) : null;

  return { customerMenu, getAccessibleMenu, menuForSideMenu };
};

export { useIndex };
