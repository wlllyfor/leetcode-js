"use client";

import { ReactElement, useEffect, useState } from "react";
import ContentAreaWrapper from "@/components/atoms/div/wrapper/contentAreaWrapper";
import MallHeader from "@/components/molecules/mall/mallHeader";
import MallMenu from "@/components/molecules/mall/mallMenu";
import MallInner from "@/components/atoms/div/inner/mallInner";
import TableHeaderGroup from "@/components/molecules/tableGroup/customer/mall/cart/confirm/tableHeaderGroup";
import TableGroup from "@/components/molecules/tableGroup/customer/mall/cart/confirm/tableGroup";
import SubmitGroup from "@/components/molecules/submitGroup/customer/order/cart/confirm/submitGroup";
import { AlibabaProductIndexPageProps } from "@/pagePropInterfaces/alibabaProductIndexPageProps";
import Loading from "@/components/molecules/common/loading";
import { useRecoilValue } from "recoil";
import { CustomerState } from "@/store/Auth/CustomerState";
import { CustomerDbTableType } from "@/types/db/customer";
import CustomerAxios from "@/lib/axios/customer-axios";
import { CartProductForConfirm } from "@/types/entity/order/cart/customerCartForConfirm";
import AuthenticatedLayout from "@/components/molecules/layouts/customer/authenticatedLayout";
import { useStore } from "@/hooks/customer/order/useStore";
import { enumOrderType } from "@/types/enum/enumOrderType";
import { enumMall } from "@/types/enum/enumMall";

const Template = ({ params, searchParams }: AlibabaProductIndexPageProps): ReactElement => {

  const auth = useRecoilValue(CustomerState);

  const [ customer, setCustomer ] = useState<CustomerDbTableType>();
  const [ products, setProducts ] = useState<CartProductForConfirm[]>([]);
  const { postOrder, setValidationErrors, setToOrderProducts } = useStore(params.hub_code);

  useEffect(() => {
    const storedProducts = localStorage.getItem("products");

    if (storedProducts) {
      try {
        const parsedProducts = JSON.parse(storedProducts);
        setProducts(parsedProducts);
        localStorage.removeItem("products");
      } catch (e) {
        console.error("Failed to parse products query parameter", e);
      }
    }

    // 初期設定
    setValidationErrors(prevState => []);

  }, [ setValidationErrors ]);

  useEffect((): void => {
    setToOrderProducts(prevState => {
      if (products) {
        return {
          orderType: enumOrderType.cart as "cart",
          products: products.map(product => {
            return {
              name: product.customerCart.mallProduct.productName,
              mall: enumMall.alibaba,
              productUrl: "",
              sku: product.sku,
              unitPrice: product.customerCart.unitPrice,
              quantity: product.quantity,
              variation: product.customerCart.mallProduct.variation,
              publicRemarks: product.publicRemarks,
              publicRemarksFile: product.publicRemarksFile,
              customerCartId: product.customerCart.id,
              productImageUrl: product.customerCart.mallProduct.imageUrl,
            };
          }),
        };
      }
      return null;
    });
  }, [ products, setToOrderProducts ]);

  useEffect((): void => {
    (async (): Promise<void> => {
      CustomerAxios._setToken(auth);
      const customer = await CustomerAxios.getMe() as CustomerDbTableType;
      if (customer) {
        setCustomer(prevState => customer);
      }
    })();
  }, [ auth ]);

  if (!customer) {
    return <Loading />;
  }

  return (
    <AuthenticatedLayout hubCode={params.hub_code} showCustomerMenu={false}>
      <MallHeader
        keyword={""} onKeywordChange={() => {
        }}
      />
      <div className="flex">
        <MallMenu />
        <MallInner>
          <ContentAreaWrapper>
            <div className="mt-8 mx-auto max-w-[1400px]">
              <TableHeaderGroup />
              <TableGroup products={products} />
            </div>
            <div className="mt-8 w-[400px] ml-auto">
              <SubmitGroup products={products} postOrder={postOrder} />
            </div>
          </ContentAreaWrapper>
        </MallInner>
      </div>
    </AuthenticatedLayout>
  );
};

export default Template;
