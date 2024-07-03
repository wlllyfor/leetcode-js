import { ShipToAddressDbTableType } from "@/types/db/shipToAddress";
import { Dispatch, SetStateAction, useState } from "react";
import { useRecoilValue } from "recoil";
import CustomerAxios from "@/lib/axios/customer-axios";
import { CustomerState } from "@/store/Auth/CustomerState";
import { routes } from "@/routes";
import { toast } from "react-toastify";
import useAuth from "@/hooks/customer/useAuth";
import { Str } from "@/lib/Str";

interface ApiResponse {
  body: {
    shipToAddress: ShipToAddressDbTableType;
  };
}

export type ShipToAddressForPostType = {
  countryId: number | null;
  postalCode: string | null;
  prefectureName: string;
  cityName: string;
  townName: string;
  buildingName: string;
  name: string;
  tel: string;
};

const useStore = (): {
  postShipToAddress: () => void;
  shipToAddressForStore: ShipToAddressForPostType;
  setShipToAddressForStore: Dispatch<SetStateAction<ShipToAddressForPostType>>;
  isStored: boolean;
  setIsStored: Dispatch<SetStateAction<boolean>>;
  validationErrors: string[];
  setValidationErrors: Dispatch<SetStateAction<string[]>>;
} => {
  const auth = useRecoilValue(CustomerState);
  const customer = useAuth();

  const [ shipToAddressForStore, setShipToAddressForStore ] = useState<ShipToAddressForPostType>({
    countryId: null,
    postalCode: "",
    prefectureName: "",
    cityName: "",
    townName: "",
    buildingName: "",
    name: "",
    tel: "",
  });

  const [ isStored, setIsStored ] = useState<boolean>(false);

  const [ validationErrors, setValidationErrors ] = useState<string[]>([]);

  const postShipToAddress = async (): Promise<void> => {
    CustomerAxios._setToken(auth);
    setValidationErrors(prevState => []);

    const body = {
      countryId: shipToAddressForStore.countryId,
      customerId: customer?.id,
      postalCode: shipToAddressForStore.postalCode,
      prefectureName: shipToAddressForStore.prefectureName,
      cityName: shipToAddressForStore.cityName,
      townName: shipToAddressForStore.townName,
      buildingName: shipToAddressForStore.buildingName,
      name: shipToAddressForStore.name,
      tel: shipToAddressForStore.tel,
    };

    try {
      await CustomerAxios.post<ApiResponse>({
        uri: routes.api.customer.shipToAddress.store.url,
        body: Str.decamelizeKeys(body),
      });

      setIsStored(prevState => true);
      toast.success("登録に成功しました");
    } catch (error) {
      CustomerAxios.showErrors(error);
      const validationErrors = CustomerAxios.get422Errors(error);
      setValidationErrors(prevState => validationErrors);
      toast.error("入力内容に不備があります。");
    }
  };

  return {
    postShipToAddress,
    shipToAddressForStore,
    setShipToAddressForStore,
    isStored,
    setIsStored,
    validationErrors,
    setValidationErrors,
  };
};

export { useStore };
