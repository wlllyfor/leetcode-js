"use client";

import { ReactElement } from "react";
import ContentAreaWrapper from "@/components/atoms/div/wrapper/contentAreaWrapper";
import ListHeader from "@/components/atoms/list/listHeader";
import ListDetails from "@/components/atoms/list/listDetails";


const List = (): ReactElement => {
  const accountList = [ "売上", "アリペイ", "支店名", "A銀行" ];
  const subjectList = [ "交通費", "通信費", "家賃" ];
  const salesList = [ "デザイン(売上)", "送料(売上)" ];
  const suppliersList = [ "佐川急便" ];
  return (
    <ContentAreaWrapper>
      <div className="grid grid-cols-8 gap-4">
        <div>
          <ListHeader text="口座一覧" />
          <ListDetails list={accountList} />
        </div>
        <div>
          <ListHeader text="科目一覧" />
          <ListDetails list={subjectList} />
        </div>
        <div>
          <ListHeader text="売上科目一覧" />
          <ListDetails list={salesList} />
        </div>
        <div>
          <ListHeader text="取引先一覧" />
          <ListDetails list={suppliersList} />
        </div>
      </div>
    </ContentAreaWrapper>
  );
};

export default List;
