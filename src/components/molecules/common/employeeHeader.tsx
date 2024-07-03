"use client";

import FlexWrapper from "@/components/atoms/div/wrapper/flexWrapper";
import HeaderWrapper from "@/components/atoms/div/wrapper/headerWrapper";
import Image from "next/image";
import Paragraph from "@/components/atoms/text/paragraph";
import logoImage from "@/resource/img/logo.svg";
import { ReactElement, useEffect, useState } from "react";
import { useLogout } from "@/hooks/customer/auth/useLogout";
import { useRecoilValue } from "recoil";
import { EmployeeState } from "@/store/Auth/EmployeeState";
import Loading from "@/components/molecules/common/loading";
import { EmployeeDbTableType } from "@/types/db/employee";
import EmployeeAxios from "@/lib/axios/employee-axios";

const EmployeeHeader = (): ReactElement => {
  const [ isLogoutVisible, setLogoutVisible ] = useState<boolean>(false);
  const [ employee, setEmployee ] = useState<EmployeeDbTableType | null>(null);

  const { logout } = useLogout();
  const auth = useRecoilValue(EmployeeState);

  useEffect(() => {
    (async (): Promise<void> => {
      EmployeeAxios._setToken(auth);
      const employee = await EmployeeAxios.getMe() as EmployeeDbTableType;
      if (employee) {
        setEmployee(prevState => employee);
      }
    })();
  }, [ auth ]);

  const handleLogoutToggle = (): void => {
    setLogoutVisible(prev => !prev);
  };

  if (!employee) {
    return <Loading />;
  }


  return (
    <HeaderWrapper>
      <FlexWrapper>
        <Image src={logoImage} alt="Buyer Central" />
        <Paragraph color={"white"} text={"Buyer Central"} />
        <div className="ml-4">
          {/* 拠点 */}
          <Paragraph color={"white"} text={`拠点：${employee.currentAccessHub?.name}`} />
        </div>
        <div className="ml-2">
          {/* 班 */}
          <Paragraph
            color={"white"}
            text={employee.employeeHubs.find(hubs => hubs.hubId === employee.currentAccessHubId)?.group?.name ?? ""}
          />
        </div>
        <div className="ml-4">
          {/* お知らせ：PH2では不要かも？ */}
          {/*<Paragraph color={"white"} text={"お知らせ"} />*/}
        </div>
      </FlexWrapper>
      <FlexWrapper>
        {/* 代理ログインしていない場合、顧客側の場合は非表示 */}
        {/* todo: 代理ログインはコメントアウトする指示あり
         ref: https://discord.com/channels/1188844297882173520/1188854128726773783/1247362057729212569
         <div onClick={handleAgentLogoutToggle}>
         <Paragraph color={"white"} text={"代理ログイン中"} />
         {isAgentLogoutVisible && (
         <button
         className="bg-white absolute p-2 rounded-sm mt-2"
         onClick={() => {
         () => alert("代理ログアウト");
         }}
         >
         代理ログアウト
         </button>
         )}
         </div> */}
        {/* スタッフIDを表示 */}
        <div className="ml-4">
          <Paragraph color={"white"} text={`YP-${employee.id}`} />
        </div>
        {/* スタッフ名を表示 */}
        <div className="ml-2">
          <Paragraph color={"white"} text={`${employee.name}(${employee.nameKana ?? ""})`} />
        </div>
        <div className="w-fit h-fit ml-2 pt-[5px]">
          <button
            tabIndex={1}
            className="material-symbols-outlined text-[white] hover:cursor-pointer focus:ring-2"
            onClick={handleLogoutToggle}
          >more_vert
          </button>
          {isLogoutVisible && (
            <button
              tabIndex={1}
              className="bg-white absolute p-2 rounded-sm bottom-[-40px] right-0 hover:cursor-pointer focus:ring-2"
              onClick={logout}
            >
              ログアウト
            </button>
          )}
        </div>
      </FlexWrapper>
    </HeaderWrapper>
  );
};

export default EmployeeHeader;
