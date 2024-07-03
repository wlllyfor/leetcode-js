"use client";

import FlexWrapper from "@/components/atoms/div/wrapper/flexWrapper";
import HeaderWrapper from "@/components/atoms/div/wrapper/headerWrapper";
import Image from "next/image";
import Paragraph from "@/components/atoms/text/paragraph";
import logoImage from "@/resource/img/logo.svg";
import { ReactElement, useEffect, useState } from "react";
import { useLogout } from "@/hooks/customer/auth/useLogout";
import { useRecoilValue } from "recoil";
import { CustomerState } from "@/store/Auth/CustomerState";
import { CustomerDbTableType } from "@/types/db/customer";
import CustomerAxios from "@/lib/axios/customer-axios";
import Loading from "@/components/molecules/common/loading";

const CustomerHeader = (): ReactElement => {
  const [ isLogoutVisible, setLogoutVisible ] = useState<boolean>(false);
  const [ customer, setCustomer ] = useState<CustomerDbTableType | null>(null);

  const { logout } = useLogout();
  const auth = useRecoilValue(CustomerState);

  useEffect(() => {
    (async (): Promise<void> => {
      CustomerAxios._setToken(auth);
      const customer = await CustomerAxios.getMe() as CustomerDbTableType;
      if (customer) {
        setCustomer(prevState => customer);
      }
    })();
  }, [ auth ]);

  const handleLogoutToggle = (): void => {
    setLogoutVisible(prev => !prev);
  };

  if (!customer) {
    return <Loading />;
  }


  return (
    <HeaderWrapper>
      <FlexWrapper>
        <Image src={logoImage} alt="Buyer Central" />
        <Paragraph color={"white"} text={"Buyer Central"} />
        <div className="ml-4">
          {/* 拠点 */}
          <Paragraph color={"white"} text={`拠点：${customer.currentCustomerPlan.plan.hub.name}`} />
        </div>
        <div className="ml-2">
          {/* 班 */}
          <Paragraph color={"white"} text={customer.currentCustomerPlan.group?.name ?? ""} />
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
          <Paragraph color={"white"} text={`YP-${customer.id}`} />
        </div>
        {/* スタッフ名を表示 */}
        <div className="ml-2">
          <Paragraph color={"white"} text={`${customer.name}(${customer.nameKana})`} />
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

export default CustomerHeader;
