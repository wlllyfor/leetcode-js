import { ReactElement } from "react";
import TabButton from "@/components/atoms/button/tabButton";
import { enumProduct } from "@/types/enum/enumProduct";

const ProductsTab = ({
  activeProductTypeTab,
  handleOnChangeTab,
}: {
  activeProductTypeTab: string;
  handleOnChangeTab: (productType: string) => void;
}): ReactElement => {
  return (
    <div className="flex gap-2 mt-4 border-[#323673] border-solid border-0 border-b">
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

export default ProductsTab;
