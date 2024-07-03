"use client";

import { useRouter, usePathname } from "next/navigation";
import { ReactNode, useEffect } from "react";
import { useRecoilValue, useResetRecoilState } from "recoil";
import { CustomerState } from "@/store/Auth/CustomerState";
import { getCustomerFrontUrl, routes } from "@/routes";

export function CustomerGuard({ children }: { children: ReactNode; }) : ReactNode {
  const router = useRouter();
  const pathname = usePathname();

  const customer = useRecoilValue(CustomerState);
  const resetRecoilState = useResetRecoilState(CustomerState);

  const hubCode = pathname.split("/")[1];
  const loginUrl = getCustomerFrontUrl(hubCode, routes.front.customer.auth.login.url);
  const registerUrl = getCustomerFrontUrl(hubCode, routes.front.customer.auth.register.url);


  useEffect(() => {
    if(!customer || !customer.accessToken && (pathname !== loginUrl && pathname !== registerUrl)) {
      resetRecoilState();
      router.push("/");
    }
  }, [ customer, pathname, loginUrl, resetRecoilState, router, registerUrl ]);

  return <>{children}</>;
}
