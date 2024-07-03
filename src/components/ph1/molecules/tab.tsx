import { ReactElement } from "react";
import TabButton from "@/components/atoms/button/tabButton";
import classes from "@/styles/components/molecules/tab.module.scss";
import { enumProduct } from "@/types/enum/enumProduct";

const Tab = ({
  activeProductTypeTab,
  handleOnChangeTab,
}: {
  activeProductTypeTab: string;
  handleOnChangeTab: (productType: string) => void;
}): ReactElement => {
  return (
    <div className={classes.tab__wrapper}>
      <TabButton
        isActive={activeProductTypeTab === enumProduct.normal}
        clickFunction={() => {
          handleOnChangeTab(enumProduct.normal);
        }}
      >
        通常
      </TabButton>
      <TabButton
        isActive={activeProductTypeTab === enumProduct.amazon}
        clickFunction={() => {
          handleOnChangeTab(enumProduct.amazon);
        }}
      >
        Amazon
      </TabButton>
      <TabButton
        isActive={activeProductTypeTab === enumProduct.case}
        clickFunction={() => {
          handleOnChangeTab(enumProduct.case);
        }}
      >
        ケース
      </TabButton>
      <TabButton
        isActive={activeProductTypeTab === enumProduct.companyEquipment}
        clickFunction={() => {
          handleOnChangeTab(enumProduct.companyEquipment);
        }}
      >
        備品
      </TabButton>
    </div>
  );
};

export default Tab;
