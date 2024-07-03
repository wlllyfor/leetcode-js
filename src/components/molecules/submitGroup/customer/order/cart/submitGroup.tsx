"use client";

import { ReactElement, useEffect, useState } from "react";
import FormButton from "@/components/atoms/button/formButton";
import ContentAreaWrapper from "@/components/atoms/div/wrapper/contentAreaWrapper";
import FlexWrapperColumnStart from "@/components/atoms/div/wrapper/flexWrapperColumnStart";
import Paragraph from "@/components/atoms/text/paragraph";
import { CustomerCartForConfirm } from "@/types/entity/order/cart/customerCartForConfirm";
import { useRecoilValue } from "recoil";
import { CustomerState } from "@/store/Auth/CustomerState";
import { CustomerDbTableType } from "@/types/db/customer";
import CustomerAxios from "@/lib/axios/customer-axios";
import Loading from "@/components/molecules/common/loading";
import { useRouter } from "next/navigation";
import { getCustomerFrontUrl, routes } from "@/routes";

const SubmitGroup = ({ hubCode, customerCartsForConfirm }: {
  hubCode: string;
  customerCartsForConfirm: CustomerCartForConfirm;
}): ReactElement => {
  // const [ isChecked, setIsChecked ] = useState<boolean>(false);
  // const [ couponCode, setCouponCode ] = useState<string>("");
  const [ totalQuantity, setTotalQuantity ] = useState<number>(0);
  const [ productTotalPrice, setProductTotalPrice ] = useState<number>(0);
  const [ purchaseFee, setPurchaseFee ] = useState<number>(0);
  const [ isButtonDisabled, setIsButtonDisabled ] = useState<boolean>(true);
  const router = useRouter();

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

  // const handleCheckboxChange = () => {
  //   setIsChecked(prev => !prev);
  // };
  // const handleCouponCodeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setCouponCode(event.target.value);
  // };


  useEffect((): void => {
    if (customerCartsForConfirm) {
      setTotalQuantity(prevState => {
        return customerCartsForConfirm.products.filter(item => item.checked).length;
      });

      setProductTotalPrice(prevState => {
        return customerCartsForConfirm.products.filter(item => item.checked).reduce((total, item) => {
          return total + (item.quantity * item.customerCart.unitPrice);
        }, 0);
      });

      setPurchaseFee(prevState => {
        return customerCartsForConfirm.products.filter(item => item.checked).reduce((total, item) => {
          const purchaseFee = customer?.currentCustomerPlan.plan.purchaseFee ?? 0;
          return total + ((item.quantity * item.customerCart.unitPrice) * (purchaseFee / 100));
        }, 0);
      });

      setIsButtonDisabled(prevState => customerCartsForConfirm.products.filter(item => item.checked).length === 0);
    }
  }, [ customer?.currentCustomerPlan.plan.purchaseFee, customerCartsForConfirm ]);

  if (!customer) {
    return <Loading />;
  }

  return (
    <ContentAreaWrapper>
      <FlexWrapperColumnStart>
        <Paragraph text={`商品数量合計：${totalQuantity.toLocaleString()}`} />
        <Paragraph
          text={`商品金額合計：${productTotalPrice.toLocaleString()} ${customer?.currentCustomerPlan.plan.hub.currency.name}`}
        />
        <Paragraph
          text={`買付手数料：${purchaseFee.toLocaleString()} ${customer?.currentCustomerPlan.plan.hub.currency.name}`}
        />
        {/* クーポンコードの値と入力された値があっている場合は表示 11111は動作確認用に入れているだけ */}
        {/*<If condition={couponCode === "11111"}>*/}
        {/*  <Then>*/}
        {/*    <Paragraph text="クーポンコード適用：手数料割引率(10％)" fontSize="10px" />*/}
        {/*  </Then>*/}
        {/*</If>*/}
        {/*<div className="flex mt-2">*/}
        {/*  <CheckboxInput id={""} checked={isChecked} onChange={handleCheckboxChange} />*/}
        {/*  <div className="ml-1">*/}
        {/*    <Paragraph text="クーポンコードをお持ちですか？" fontSize="10px" />*/}
        {/*  </div>*/}
        {/*</div>*/}
        {/*<If condition={isChecked}>*/}
        {/*  <Then>*/}
        {/*    <div className="mt-3">*/}
        {/*      <InputGroup44 id="" value={""} text={"クーポンコード"} onChange={handleCouponCodeChange} />*/}
        {/*    </div>*/}
        {/*  </Then>*/}
        {/*</If>*/}
        <div className="mt-4 text-[22px]">
          <Paragraph
            text={`合計金額：${(productTotalPrice + purchaseFee).toLocaleString()} ${customer?.currentCustomerPlan.plan.hub.currency.name}`}
            fontSize="22px" isBold
          />
        </div>
        <FormButton
          disabled={isButtonDisabled}
          color={"green"} text={"注文最終確認へ"} onClick={() => {
            const url = getCustomerFrontUrl(hubCode, routes.front.customer.order.cartConfirm.url);

            // チェックが付いているものだけlocalStorageにセットする
            localStorage.setItem("products", JSON.stringify(customerCartsForConfirm.products.filter(item => item.checked)));
            router.push(`${url}`);
          }}
        />
      </FlexWrapperColumnStart>
    </ContentAreaWrapper>
  );
};

export default SubmitGroup;
