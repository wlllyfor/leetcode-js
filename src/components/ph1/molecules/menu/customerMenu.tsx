"use client";

import React, { ReactElement } from "react";
import classes from "@/styles/components/molecules/customerMenu.module.scss";
import UnorderedList from "@/components/ph1/atoms/unorderedList";
import List from "@/components/ph1/atoms/list";
import Image from "next/image";
import Details from "@/components/ph1/atoms/details";
import Summary from "@/components/ph1/atoms/summary";
import iconHome from "@/resource/img/icon_home.svg";
import iconIn from "@/resource/img/icon_in.svg";
import iconOut from "@/resource/img/icon_out.svg";
import iconOrder from "@/resource/img/icon_orders.svg";
import iconBox from "@/resource/img/icon_box.svg";
import iconSetting from "@/resource/img/icon_setting.svg";
import Link from "next/link";
import Paragraph from "@/components/ph1/atoms/paragraph";
import { getCustomerFrontUrl, routes } from "@/routes";

const CustomerMenu = ({ hubCode }: { hubCode: string; }): ReactElement => {
  const dashBoardUrl: string = getCustomerFrontUrl(hubCode ?? "", routes.front.customer.myPage.url);

  // 商品マスタ
  const productMasterUrl: string = getCustomerFrontUrl(hubCode ?? "", routes.front.customer.product.index.url);
  const shipToAddressMasterURL: string = getCustomerFrontUrl(
    hubCode ?? "",
    routes.front.customer.shipToAddressMaster.url,
  );
  const shipFromAddressMasterURL: string = getCustomerFrontUrl(
    hubCode ?? "",
    routes.front.customer.shipFromAddressMaster.url,
  );

  // 注文管理
  const cartOrderUrl: string = getCustomerFrontUrl(hubCode ?? "", routes.front.customer.order.cart.url);
  const oemOrderUrl: string = getCustomerFrontUrl(hubCode ?? "", routes.front.customer.order.oem.url);
  const orderHistoryUrl: string = getCustomerFrontUrl(hubCode ?? "", routes.front.customer.order.history.url);

  // 入荷管理
  const receiveStockUrl: string = getCustomerFrontUrl(hubCode ?? "", routes.front.customer.receiveStock.url);

  // 出荷管理
  const leaveStockUrl: string = getCustomerFrontUrl(hubCode ?? "", routes.front.customer.leaveStock.url);

  // todo: アイコン画像差し替え
  return (
    <div className={`${classes.menu} ${classes.customer}`}>
      <UnorderedList>
        <List isMenu>
          <Link href={dashBoardUrl}>
            <Image src={iconHome} alt="マイページ" className={classes.menu__icon} width={16} height={16} priority />
            マイページ
          </Link>
        </List>
        <List isMenu>
          <Link href={productMasterUrl}>
            <Image src={iconBox} alt="在庫/商品マスタ" className={classes.menu__icon} width={16} height={16} priority />
            在庫/商品マスタ
          </Link>
        </List>
        <List isMenu>
          <Details>
            <Summary isMenu>
              <Paragraph>
                <Image src={iconOrder} alt="注文管理" className={classes.menu__icon} width={16} height={16} priority />
                注文管理
              </Paragraph>
            </Summary>
            <UnorderedList>
              <List isMenu isMenuChild>
                <Link href={cartOrderUrl}>カート注文</Link>
              </List>
              <List isMenu isMenuChild>
                <Link href={oemOrderUrl}>OEM注文</Link>
              </List>
              <List isMenu isMenuChild>
                <Link href={orderHistoryUrl}>注文履歴</Link>
              </List>
            </UnorderedList>
          </Details>
        </List>
        <List isMenu>
          <Link href={receiveStockUrl}>
            <Image src={iconIn} alt="入荷依頼" className={classes.menu__icon} width={16} height={16} priority />
            入荷依頼
          </Link>
        </List>
        <List isMenu>
          <Link href={leaveStockUrl}>
            <Image src={iconOut} alt="出荷依頼" className={classes.menu__icon} width={16} height={16} priority />
            出荷依頼
          </Link>
        </List>
        <List isMenu>
          <Details>
            <Summary isMenu>
              <Paragraph>
                <Image src={iconSetting} alt="設定" className={classes.menu__icon} width={16} height={16} priority />
                設定
              </Paragraph>
            </Summary>
            <UnorderedList>
              <List isMenu isMenuChild>
                <Link href={shipToAddressMasterURL}>配送先マスタ</Link>
              </List>
              <List isMenu isMenuChild>
                <Link href={shipFromAddressMasterURL}>配送元マスタ</Link>
              </List>
            </UnorderedList>
          </Details>
        </List>
      </UnorderedList>
    </div>
  );
};

export default CustomerMenu;
