"use client";

import { useCallback, useState } from "react";
import { routes } from "@/routes";
import { useRecoilValue } from "recoil";
import { EmployeeState } from "@/store/Auth/EmployeeState";
import EmployeeAxios from "@/lib/axios/employee-axios";
import { EmployeeAuthMenuKeyDbTableType } from "@/types/db/menu/employeeAuthMenuKey";
import { AuthStateType } from "@/store/Auth/AuthState";

interface ApiResponse {
  body: {
    accessibleMenu: EmployeeAuthMenuKeyDbTableType;
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
  employeeMenu: EmployeeAuthMenuKeyDbTableType | null;
  menuForSideMenu: MenuType[] | null;
  getAccessibleMenu: () => Promise<void>;
} => {
  const auth: AuthStateType = useRecoilValue(EmployeeState);
  const [ employeeMenu, setEmployeeMenu ] = useState<EmployeeAuthMenuKeyDbTableType | null>(null);

  const getAccessibleMenu = useCallback(async (): Promise<void> => {
    try {
      EmployeeAxios._setToken(auth);
      const response = await EmployeeAxios.get<ApiResponse>({
        uri: routes.api.employee.menu.url,
      });

      const accessibleMenu = response.data.body.accessibleMenu as EmployeeAuthMenuKeyDbTableType;
      setEmployeeMenu(prevState => accessibleMenu);
    } catch (error) {
      EmployeeAxios.showErrors(error);
    }
  }, [ auth ]);

  const getFormattedMenu = (data: EmployeeAuthMenuKeyDbTableType): MenuType[] => {
    let previousMainMenuId: number | null = null;

    return data.employeeAuthMenuValues.map(menuValue => {
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

  const menuForSideMenu = employeeMenu ? getFormattedMenu(employeeMenu) : null;

  return { employeeMenu, getAccessibleMenu, menuForSideMenu };
};

export { useIndex };
