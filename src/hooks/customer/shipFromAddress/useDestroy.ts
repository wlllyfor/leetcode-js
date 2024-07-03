"use client";

import { ShipFromAddressDbTableType } from "@/types/db/shipFromAddress";
import { Dispatch, SetStateAction, useState } from "react";
import { routes, setIdPathParam } from "@/routes";
import CustomerAxios from "@/lib/axios/customer-axios";
import { useRecoilValue } from "recoil";
import { CustomerState } from "@/store/Auth/CustomerState";
import { toast } from "react-toastify";

interface ApiResponse {
  body: {
    shipFromAddress: ShipFromAddressDbTableType;
  };
}

const useDestroy = (): {
  destroyShipFromAddress: (id: number | null) => Promise<void>;
  isDestroyed: boolean;
  setIsDestroyed: Dispatch<SetStateAction<boolean>>;
} => {
  const auth = useRecoilValue(CustomerState);

  const [ isDestroyed, setIsDestroyed ] = useState<boolean>(false);

  const destroyShipFromAddress = async (id: number | null): Promise<void> => {
    if (id === null) {
      setIsDestroyed(false);
      return;
    }
    await (async (): Promise<void> => {
      CustomerAxios._setToken(auth);

      const uri = setIdPathParam(id, routes.api.customer.shipFromAddress.destroy.url);
      try {
        await CustomerAxios.delete<ApiResponse>({
          uri: uri,
          body: {
            id: id,
          },
        });
        setIsDestroyed(true);
        toast.success("削除に成功しました");
      } catch (error) {
        CustomerAxios.showErrors(error);
        toast.error("削除に失敗しました");
      }
    })();
  };

  return {
    destroyShipFromAddress,
    isDestroyed,
    setIsDestroyed,
  };
};

export { useDestroy };
