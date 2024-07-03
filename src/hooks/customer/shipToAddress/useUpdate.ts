"use client";

import { ShipToAddressDbTableType } from "@/types/db/shipToAddress";
import { Dispatch, SetStateAction, useState } from "react";
import { routes, setIdPathParam } from "@/routes";
import CustomerAxios from "@/lib/axios/customer-axios";
import { useRecoilValue } from "recoil";
import { CustomerState } from "@/store/Auth/CustomerState";
import { toast } from "react-toastify";
import { Str } from "@/lib/Str";

interface ApiResponse {
  body: {
    shipToAddress: ShipToAddressDbTableType;
  };
}

export type ShipToAddressForUpdateType = {
  id: number | null;
  countryId: number | null;
  postalCode: string | null;
  prefectureName: string;
  cityName: string;
  townName: string;
  buildingName: string;
  name: string;
  tel: string;
};

const useUpdate = (): {
  putShipToAddress: () => void;
  shipFromAddressForUpdate: ShipToAddressForUpdateType;
  setShipFromAddressForUpdate: Dispatch<SetStateAction<ShipToAddressForUpdateType>>;
  isUpdated: boolean;
  setIsUpdated: Dispatch<SetStateAction<boolean>>;
  validationErrors: string[];
  setValidationErrors: Dispatch<SetStateAction<string[]>>;
} => {
  const auth = useRecoilValue(CustomerState);

  const [ shipFromAddressForUpdate, setShipFromAddressForUpdate ] = useState<ShipToAddressForUpdateType>({
    id: null,
    countryId: null,
    postalCode: "",
    prefectureName: "",
    cityName: "",
    townName: "",
    buildingName: "",
    name: "",
    tel: "",
  });

  const [ isUpdated, setIsUpdated ] = useState<boolean>(false);

  const [ validationErrors, setValidationErrors ] = useState<string[]>([]);

  const putShipToAddress = async (): Promise<void> => {
    await (async (): Promise<void> => {
      CustomerAxios._setToken(auth);
      setValidationErrors(prevState => []);

      const body = {
        countryId: shipFromAddressForUpdate.countryId,
        postalCode: shipFromAddressForUpdate.postalCode,
        prefectureName: shipFromAddressForUpdate.prefectureName,
        cityName: shipFromAddressForUpdate.cityName,
        townName: shipFromAddressForUpdate.townName,
        buildingName: shipFromAddressForUpdate.buildingName,
        name: shipFromAddressForUpdate.name,
        tel: shipFromAddressForUpdate.tel,
      };

      const uri = setIdPathParam(shipFromAddressForUpdate.id, routes.api.customer.shipToAddress.update.url);
      try {
        await CustomerAxios.put<ApiResponse>({
          uri: uri,
          body: Str.decamelizeKeys(body),
        });

        setIsUpdated(prevState => true);
        toast.success("登録に成功しました");
      } catch (error) {
        CustomerAxios.showErrors(error);
        const validationErrors = CustomerAxios.get422Errors(error);
        setValidationErrors(prevState => validationErrors);
        toast.error("入力内容に不備があります。");
      }
    })();
  };

  return {
    putShipToAddress,
    shipFromAddressForUpdate,
    setShipFromAddressForUpdate,
    isUpdated,
    setIsUpdated,
    validationErrors,
    setValidationErrors,
  };
};

export { useUpdate };
