import { ReactElement } from "react";
import TabButton from "@/components/atoms/button/tabButton";
import { TabType } from "@/types/alibaba/order/product/tabType";

const MallProductDetailTab = ({
  activeMallProductTypeTab,
  handleTabOnChange,
}: {
  activeMallProductTypeTab: string;
  handleTabOnChange: (tabType: TabType) => void;
}): ReactElement => {
  return (
    <>
      <div className="flex gap-2 mt-4 border-[#e5a500] border-solid border-0 border-b">
        <TabButton
          isActive={activeMallProductTypeTab === "default"}
          color={"yellow"}
          clickFunction={(): void => {
            handleTabOnChange("default");
          }}
        >
          卸売
        </TabButton>
        <TabButton
          isActive={activeMallProductTypeTab === "purchaseFrom1Product"}
          color={"yellow"}
          clickFunction={(): void => {
            handleTabOnChange("purchaseFrom1Product");
          }}
        >
          1点から仕入れ
        </TabButton>
      </div>
    </>
  );
};

export default MallProductDetailTab;
