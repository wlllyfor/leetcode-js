"use client";

import { ReactElement, useEffect, useState } from "react";
import FormButton from "@/components/atoms/button/formButton";
import ContentAreaWrapper from "@/components/atoms/div/wrapper/contentAreaWrapper";
import FlexWrapperColumnStart from "@/components/atoms/div/wrapper/flexWrapperColumnStart";
import Paragraph from "@/components/atoms/text/paragraph";
import TextOnlyButton from "@/components/atoms/button/textOnlyButton";
import ConfirmModal from "@/components/molecules/modalGroup/customer/order/cart/confirm/confirmModal";
import { CartProductForConfirm } from "@/types/entity/order/cart/customerCartForConfirm";
import { useRecoilValue } from "recoil";
import { CustomerState } from "@/store/Auth/CustomerState";
import { CustomerDbTableType } from "@/types/db/customer";
import CustomerAxios from "@/lib/axios/customer-axios";
import Loading from "@/components/molecules/common/loading";

const SubmitGroup = ({
  products,
  postOrder,
}: {
  products: CartProductForConfirm[];
  postOrder: () => Promise<void>;
}): ReactElement => {
  const [ isModalOpen, setIsModalOpen ] = useState<boolean>(false);
  const [ productTotalPrice, setProductTotalPrice ] = useState<number>(0);
  const [ purchaseFee, setPurchaseFee ] = useState<number>(0);
  const [ unitName, setUnitName ] = useState<string>("");

  const auth = useRecoilValue(CustomerState);

  const [ customer, setCustomer ] = useState<CustomerDbTableType>();

  useEffect((): void => {
    (async (): Promise<void> => {
      CustomerAxios._setToken(auth);
      const customer = await CustomerAxios.getMe() as CustomerDbTableType;
      if (customer) {
        setCustomer(prevState => customer);
      }
    })();
  }, [ auth ]);

  const openModal = () => {
    setIsModalOpen(prev => true);
  };

  const closeModal = () => {
    setIsModalOpen(prev => false);
  };

  useEffect((): void => {
    if (products) {

      setProductTotalPrice(prevState => {
        return products.filter(item => item.checked).reduce((total, item) => {
          return total + (item.quantity * item.customerCart.unitPrice);
        }, 0);
      });

      setPurchaseFee(prevState => {
        return products.filter(item => item.checked).reduce((total, item) => {
          const purchaseFee = customer?.currentCustomerPlan.plan.purchaseFee ?? 0;
          return total + ((item.quantity * item.customerCart.unitPrice) * (purchaseFee / 100));
        }, 0);
      });

      setUnitName(prevState => customer?.currentCustomerPlan.plan.hub.currency.name ?? "");
    }
  }, [ customer?.currentCustomerPlan.plan.hub.currency.name, customer?.currentCustomerPlan.plan.purchaseFee, products ]);

  if (!customer) {
    return <Loading />;
  }
  return (
    <ContentAreaWrapper>
      <FlexWrapperColumnStart>
        <Paragraph text={`商品数量合計：${products.length}`} />
        <Paragraph text={`商品金額合計：${productTotalPrice.toLocaleString()} ${unitName}`} />
        <Paragraph text={`買付手数料：${purchaseFee.toLocaleString()} ${unitName}`} />
        {/* 買い物かご画面でクーポンコードを入力している場合のみ表示 */}
        {/* クーポンについては2024年6月時点では非表示 */}
        {/*<div className="mt-1">*/}
        {/*  <Paragraph text="クーポンコード適用：手数料割引率(10％)" fontSize="10px" />*/}
        {/*</div>*/}
        <div className="mt-4 text-[22px]">
          <Paragraph
            text={`合計金額：${(productTotalPrice + purchaseFee).toLocaleString()} ${unitName}`} fontSize="22px"
            isBold
          />
        </div>
        <div className="mt-2">
          <TextOnlyButton hasUnderLine text={"注文前の注意事項"} clickFunction={openModal} />
        </div>
        <div className="mt-1">
          <FormButton
            color={"green"} text={"注文する"} onClick={postOrder}
          />
        </div>
      </FlexWrapperColumnStart>
      <ConfirmModal isOpen={isModalOpen} handleClose={closeModal} />
    </ContentAreaWrapper>
  );
};

export default SubmitGroup;
