import CustomerAxios from "@/lib/axios/customer-axios";
import { getCustomerFrontUrl, routes } from "@/routes";
import { CustomerState } from "@/store/Auth/CustomerState";
import { useRouter, usePathname } from "next/navigation";
import { toast } from "react-toastify";
import { useResetRecoilState } from "recoil";

const useLogout = (): {
  logout: () => Promise<void>;
} => {
  const router = useRouter();
  const pathname = usePathname();

  const resetRecoilState = useResetRecoilState(CustomerState);

  const logout = async (): Promise<void> => {
    try {
      resetRecoilState();

      const hubCode = pathname.split("/")[1];
      await CustomerAxios.post({
        uri: routes.api.customer.auth.logout.url,
      });

      toast.success("ログアウトしました");

      // 拠点画面なら拠点のログインページに遷移、なければトップページに遷移
      const redirectPath: string = hubCode ? getCustomerFrontUrl(hubCode, routes.front.customer.auth.login.url) : "/";
      router.push(redirectPath);

    } catch (error) {
      CustomerAxios.showErrors(error);
      toast.error("ログアウトに失敗しました");
    }
  };

  return { logout };
};

export { useLogout };
