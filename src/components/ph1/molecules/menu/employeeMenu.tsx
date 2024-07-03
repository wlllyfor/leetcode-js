import { ReactElement } from "react";
import classes from "@/styles/components/molecules/employeeMenu.module.scss";
import UnorderedList from "../../atoms/unorderedList";
import List from "../../atoms/list";
import Image from "next/image";
import Details from "../../atoms/details";
import Summary from "../../atoms/summary";
import iconHome from "@/resource/img/icon_home.svg";
import iconIn from "@/resource/img/icon_in.svg";
import iconOut from "@/resource/img/icon_out.svg";
import iconOrder from "@/resource/img/icon_orders.svg";
import Link from "next/link";
import Paragraph from "@/components/ph1/atoms/paragraph";
import { routes } from "@/routes";

const EmployeeMenu = (): ReactElement => {
  return (
    <div className={`${classes.menu} ${classes.employee}`}>
      <UnorderedList>
        <List isMenu>
          <Link href={""}>
            <Image src={iconHome} alt="マイページ" className={classes.menu__icon} width={16} height={16} priority />
            マイページ
          </Link>
        </List>
        {/* todo: 代理ログイン実装後再実装 */}
        {/*<List isMenu>*/}
        {/*  <Link href={routes.front.employee.productMaster.url}>*/}
        {/*    <Image src={iconBox} alt="在庫/商品マスタ" className={classes.menu__icon} width={16} height={16} priority />*/}
        {/*    在庫/商品マスタ*/}
        {/*  </Link>*/}
        {/*</List>*/}
        <List isMenu>
          <Link href={routes.front.employee.order.url}>
            <Image src={iconOrder} alt="注文管理" className={classes.menu__icon} width={16} height={16} priority />
            注文管理
          </Link>
        </List>
        <List isMenu>
          <Details>
            <Summary isMenu>
              <Paragraph>
                <Image src={iconIn} alt="マイページ" className={classes.menu__icon} width={16} height={16} priority />
                入荷管理
              </Paragraph>
            </Summary>
            <UnorderedList>
              <List isMenu isMenuChild>
                <Link href={routes.front.employee.receiveStock.requests.url}>入荷依頼管理</Link>
              </List>
              <List isMenu isMenuChild>
                <Link href={routes.front.employee.receiveStock.receive.url}>入庫処理</Link>
              </List>
            </UnorderedList>
          </Details>
        </List>
        <List isMenu>
          <Details>
            <Summary isMenu>
              <Paragraph>
                <Image src={iconOut} alt="マイページ" className={classes.menu__icon} width={16} height={16} priority />
                出荷管理
              </Paragraph>
            </Summary>
            <UnorderedList>
              <List isMenu isMenuChild>
                <Link href={routes.front.employee.leaveStock.requests.url}>出荷依頼管理</Link>
              </List>
              <List isMenu isMenuChild>
                <Link href={routes.front.employee.leaveStock.leave.url}>出庫処理</Link>
              </List>
            </UnorderedList>
          </Details>
        </List>
      </UnorderedList>
    </div>
  );
};

export default EmployeeMenu;
